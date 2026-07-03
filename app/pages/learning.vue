<template>
  <div>
    <!-- Hero -->
    <section class="gradient-hero text-white py-16 px-6 text-center">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">লার্নিং প্ল্যাটফর্ম</h1>
        <p class="text-blue-100 text-lg">বাংলাদেশের সেরা অনলাইন কোর্স ও ট্রেনিং সেন্টার</p>
      </div>
    </section>

    <div class="container mx-auto px-4 md:px-6 py-12">

      <!-- Courses & tutorials (live from Supabase) -->
      <h2 class="text-2xl font-bold text-slate-800 mb-6">কোর্স ও টিউটোরিয়াল</h2>

      <div v-if="pending" class="text-slate-400 text-sm">লোড হচ্ছে...</div>

      <div v-else-if="courses && courses.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="r in courses"
          :key="r.id"
          :href="r.url"
          target="_blank"
          rel="noopener"
          class="card p-7 flex flex-col border-t-4 group"
          :style="`border-top-color:${styleFor(r.title).hex}`"
        >
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-bold group-hover:underline" :style="`color:${styleFor(r.title).hex}`">{{ r.title }}</h3>
            <span class="badge text-xs" :style="`background:${styleFor(r.title).hex}20;color:${styleFor(r.title).hex}`">{{ r.type }}</span>
          </div>
          <p v-if="r.description" class="text-slate-600 text-sm leading-relaxed flex-1 mb-5">{{ r.description }}</p>
          <div v-if="r.tags?.length" class="flex flex-wrap gap-2 mb-5">
            <span v-for="t in r.tags" :key="t" class="tag">{{ t }}</span>
          </div>
          <span class="font-bold text-sm mt-auto flex items-center gap-1" :style="`color:${styleFor(r.title).hex}`">
            ভিজিট করুন <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
          </span>
        </a>
      </div>

      <p v-else class="text-slate-400 text-sm">এখনো কোনো কোর্স/টিউটোরিয়াল যোগ করা হয়নি।</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'লার্নিং প্ল্যাটফর্ম' })

const supabase = useSupabaseClient()
const { styleFor, abbrFor } = useResourceCard()

const { data: courses, pending } = await useAsyncData('resources-courses', async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, url, type, tags, thumbnail_url, created_at')
    .in('type', ['কোর্স', 'টিউটোরিয়াল'])
    .order('created_at', { ascending: false })

  if (error) {
    console.error('resources fetch error:', error)
    return []
  }
  return data
})
</script>