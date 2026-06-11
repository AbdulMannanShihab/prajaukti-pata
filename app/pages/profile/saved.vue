<template>
  <div class="container mx-auto px-4 md:px-6 py-10">
    <div class="mb-8">
      <NuxtLink to="/profile" class="text-sm text-slate-400 hover:text-slate-600 transition flex items-center gap-1 mb-1 w-fit">
        <Icon name="heroicons:arrow-left" class="w-4 h-4" /> প্রোফাইলে ফিরুন
      </NuxtLink>
      <h1 class="text-2xl font-bold text-slate-800">সেভ করা রিসোর্স</h1>
    </div>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <ResourceSkeleton v-for="i in 8" :key="i" />
    </div>

    <div v-else-if="resources?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <ResourceCard v-for="r in resources" :key="r.id" :resource="r" />
    </div>

    <div v-else class="text-center py-24 text-slate-400">
      <p class="text-5xl mb-4">🔖</p>
      <p class="text-lg font-semibold">কোনো রিসোর্স সেভ করা নেই</p>
      <NuxtLink to="/resources" class="btn-primary mt-5 inline-flex">রিসোর্স দেখুন</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useSeoMeta({ title: 'সেভ করা রিসোর্স' })

const { user } = useAuth()
const supabase = useSupabaseClient()

const { data: resources, pending } = useAsyncData('saved-resources', async () => {
  if (!user.value) return []
  const { data } = await supabase
    .from('saves')
    .select(`resource_id, resources(*, profiles:user_id(id, username, full_name, avatar_url), likes_count:likes(count))`)
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false })
  return (data ?? []).map((d: any) => d.resources).filter(Boolean)
})
</script>
