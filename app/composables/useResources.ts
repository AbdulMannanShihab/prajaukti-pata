import type { Resource, ResourceType } from '~/types'

export function useResources() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  async function fetchResources(options: {
    type?: ResourceType | null
    search?: string
    userId?: string
    saved?: boolean
    limit?: number
    offset?: number
  } = {}) {
    const { type, search, userId, saved, limit = 20, offset = 0 } = options

    let query = supabase
      .from('resources')
      .select(`
        *,
        profiles:user_id ( id, username, full_name, avatar_url ),
        likes_count:likes(count),
        saves_count:saves(count)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (type) query = query.eq('type', type)
    if (search) query = query.ilike('title', `%${search}%`)
    if (userId) query = query.eq('user_id', userId)

    const { data, error } = await query

    if (error) throw error
    return (data ?? []) as Resource[]
  }

  async function fetchResource(id: string) {
    const { data, error } = await supabase
      .from('resources')
      .select(`
        *,
        profiles:user_id ( id, username, full_name, avatar_url, bio ),
        likes_count:likes(count),
        saves_count:saves(count)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Resource
  }

  async function createResource(payload: {
    title: string
    description?: string
    url: string
    type: ResourceType
    tags?: string[]
    thumbnail_url?: string
  }) {
    if (!user.value) throw new Error('লগইন করুন')

    const { data, error } = await supabase
      .from('resources')
      .insert({ ...payload, user_id: user.value.id })
      .select()
      .single()

    if (error) throw error
    return data as Resource
  }

  async function updateResource(id: string, payload: Partial<Resource>) {
    const { data, error } = await supabase
      .from('resources')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Resource
  }

  async function deleteResource(id: string) {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async function toggleLike(resourceId: string): Promise<boolean> {
    if (!user.value) throw new Error('লগইন করুন')

    const { data: existing } = await supabase
      .from('likes')
      .select('id')
      .eq('resource_id', resourceId)
      .eq('user_id', user.value.id)
      .single()

    if (existing) {
      await supabase.from('likes').delete().eq('id', existing.id)
      return false
    } else {
      await supabase.from('likes').insert({ resource_id: resourceId, user_id: user.value.id })
      return true
    }
  }

  async function toggleSave(resourceId: string): Promise<boolean> {
    if (!user.value) throw new Error('লগইন করুন')

    const { data: existing } = await supabase
      .from('saves')
      .select('id')
      .eq('resource_id', resourceId)
      .eq('user_id', user.value.id)
      .single()

    if (existing) {
      await supabase.from('saves').delete().eq('id', existing.id)
      return false
    } else {
      await supabase.from('saves').insert({ resource_id: resourceId, user_id: user.value.id })
      return true
    }
  }

  async function checkUserLike(resourceId: string) {
    if (!user.value) return false
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('resource_id', resourceId)
      .eq('user_id', user.value.id)
      .single()
    return !!data
  }

  async function checkUserSave(resourceId: string) {
    if (!user.value) return false
    const { data } = await supabase
      .from('saves')
      .select('id')
      .eq('resource_id', resourceId)
      .eq('user_id', user.value.id)
      .single()
    return !!data
  }

  return {
    fetchResources,
    fetchResource,
    createResource,
    updateResource,
    deleteResource,
    toggleLike,
    toggleSave,
    checkUserLike,
    checkUserSave,
  }
}
