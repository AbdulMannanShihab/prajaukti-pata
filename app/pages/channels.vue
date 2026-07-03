<template>
  <div>
    <section class="bg-slate-900 text-white py-16 px-6 text-center">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">ইউটিউব চ্যানেল</h1>
        <p class="text-slate-300 text-lg">বাংলায় বিনামূল্যে সেরা প্রযুক্তি শিক্ষা</p>
      </div>
    </section>

    <div class="container mx-auto px-4 md:px-6 py-12">

      <!-- Channels (live from Supabase) -->
      <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span class="w-2 h-6 bg-brand-600 rounded-full inline-block" />
        ইউটিউব চ্যানেল
      </h2>

      <div v-if="pending" class="text-slate-400 text-sm">লোড হচ্ছে...</div>

      <div v-else-if="channels && channels.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="r in channels"
          :key="r.id"
          :href="r.url"
          target="_blank"
          rel="noopener"
          class="card p-6 flex flex-col group"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0"
              :style="`background:${styleFor(r.title).hex}`"
            >
              {{ abbrFor(r.title) }}
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-slate-800 group-hover:text-brand-600 transition truncate">{{ r.title }}</h3>
            </div>
          </div>
          <p v-if="r.description" class="text-slate-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{{ r.description }}</p>
          <div v-if="r.tags?.length" class="flex flex-wrap gap-1.5 mb-4">
            <span v-for="t in r.tags" :key="t" class="tag">{{ t }}</span>
          </div>
          <div class="flex items-center gap-2 text-red-500 font-bold text-sm mt-auto">
            <Icon name="mdi:youtube" class="w-5 h-5" />
            চ্যানেল ভিজিট করুন
          </div>
        </a>
      </div>

      <p v-else class="text-slate-400 text-sm">এখনো কোনো চ্যানেল যোগ করা হয়নি।</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'ইউটিউব চ্যানেল' })

const supabase = useSupabaseClient()
const { styleFor, abbrFor } = useResourceCard()

const { data: channels, pending } = await useAsyncData('resources-channels', async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, url, tags, thumbnail_url, created_at')
    .eq('type', 'ভিডিও')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('resources fetch error:', error)
    return []
  }
  return data
})
</script>