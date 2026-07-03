<template>
  <div>
    <section class="gradient-hero text-white py-16 px-6 text-center">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">ব্লগ ও নিউজ</h1>
        <p class="text-blue-100 text-lg">প্রযুক্তির বিশ্বের আপডেট ও গভীর আলোচনা</p>
      </div>
    </section>

    <div class="container mx-auto px-4 md:px-6 py-12 max-w-5xl">

      <!-- Featured -->
      <div class="bg-gradient-to-r from-brand-600 to-indigo-700 p-8 rounded-3xl text-white shadow-lg mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span class="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Featured</span>
          <h2 class="text-3xl font-bold mt-3 mb-3 italic">SliceTech Blog</h2>
          <p class="text-blue-100 max-w-md leading-relaxed">আধুনিক প্রযুক্তি, ওয়েব ডেভেলপমেন্ট ও টেকনিক্যাল টিপস নিয়ে চমৎকার বাংলা ব্লগ প্ল্যাটফর্ম।</p>
        </div>
        <a href="https://slicetech.hashnode.dev/" target="_blank" rel="noopener"
          class="bg-white text-brand-700 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition whitespace-nowrap flex-shrink-0">
          ব্লগটি পড়ুন →
        </a>
      </div>

      <!-- Blogs (live from Supabase) -->
      <h2 class="text-2xl font-bold text-slate-800 mb-5">টেক ব্লগ ও নিউজ</h2>

      <div v-if="pending" class="text-slate-400 text-sm">লোড হচ্ছে...</div>

      <div v-else-if="blogs && blogs.length" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <a
          v-for="r in blogs"
          :key="r.id"
          :href="r.url"
          target="_blank"
          rel="noopener"
          class="card p-6 flex items-start gap-4 group hover:border-brand-300 transition"
        >
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0 transition"
            :class="`${styleFor(r.title).bg} ${styleFor(r.title).text} group-hover:opacity-90`"
          >{{ abbrFor(r.title) }}</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-slate-800 group-hover:text-brand-600 transition mb-1">{{ r.title }}</h3>
            <p v-if="r.description" class="text-sm text-slate-500 leading-relaxed line-clamp-2">{{ r.description }}</p>
            <div v-if="r.tags?.length" class="flex flex-wrap gap-1.5 mt-2">
              <span v-for="t in r.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </a>
      </div>

      <p v-else class="text-slate-400 text-sm">এখনো কোনো ব্লগ যোগ করা হয়নি।</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'ব্লগ ও নিউজ' })

const supabase = useSupabaseClient()
const { styleFor, abbrFor } = useResourceCard()

const { data: blogs, pending } = await useAsyncData('resources-blogs', async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, url, tags, thumbnail_url, created_at')
    .eq('type', 'ব্লগ')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('resources fetch error:', error)
    return []
  }
  return data
})
</script>