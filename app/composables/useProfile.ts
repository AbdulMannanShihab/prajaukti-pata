import type { Profile } from '~/types'

export function useProfile() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  async function getProfile(userId?: string) {
    const id = userId ?? user.value?.id
    if (!id) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data as Profile
  }

  async function updateProfile(payload: Partial<Profile>) {
    if (!user.value) throw new Error('লগইন করুন')

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.value.id, ...payload })
      .select()
      .single()

    if (error) throw error
    return data as Profile
  }

  async function getProfileByUsername(username: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (error) return null
    return data as Profile
  }

  return { getProfile, updateProfile, getProfileByUsername }
}
