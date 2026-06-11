<template>
  <div class="container mx-auto px-4 md:px-6 py-10">
    <div class="flex items-center justify-between mb-8">
      <div>
        <NuxtLink to="/profile" class="text-sm text-slate-400 hover:text-slate-600 transition flex items-center gap-1 mb-1">
          <Icon name="heroicons:arrow-left" class="w-4 h-4" /> প্রোফাইলে ফিরুন
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-800">আমার রিসোর্স</h1>
      </div>
      <button class="btn-primary" @click="uploadModalOpen = true">
        <Icon name="heroicons:plus" class="w-4 h-4" /> নতুন যোগ করুন
      </button>
    </div>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <ResourceSkeleton v-for="i in 8" :key="i" />
    </div>

    <div v-else-if="resources?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <ResourceCard v-for="r in resources" :key="r.id" :resource="r" />
    </div>

    <div v-else class="text-center py-24 text-slate-400">
      <p class="text-5xl mb-4">📭</p>
      <p class="text-lg font-semibold">এখনো কোনো রিসোর্স শেয়ার করেননি</p>
      <button class="btn-primary mt-5" @click="uploadModalOpen = true">প্রথম রিসোর্স যোগ করুন</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useSeoMeta({ title: 'আমার রিসোর্স' })

const { user } = useAuth()
const { fetchResources } = useResources()
const uploadModalOpen = useState('uploadModalOpen', () => false)

const { data: resources, pending } = useAsyncData(
  'my-resources',
  () => fetchResources({ userId: user.value?.id }),
  { watch: [() => user.value?.id] }
)
</script>
