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

      <!-- Bangla blogs -->
      <h2 class="text-2xl font-bold text-slate-800 mb-5">বাংলা টেক ব্লগ</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        <a
          v-for="b in banglaBLogs"
          :key="b.name"
          :href="b.url"
          target="_blank"
          rel="noopener"
          class="card p-6 flex items-start gap-4 group hover:border-brand-300 transition"
        >
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0 transition"
            :class="`${b.bg} ${b.text} group-hover:opacity-90`"
          >{{ b.abbr }}</div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-slate-800 group-hover:text-brand-600 transition mb-1">{{ b.name }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed line-clamp-2">{{ b.desc }}</p>
            <span class="text-xs font-semibold text-brand-500 mt-2 inline-block">{{ b.cta }} →</span>
          </div>
        </a>
      </div>

      <!-- International -->
      <h2 class="text-2xl font-bold text-slate-800 mb-5">আন্তর্জাতিক টেক নিউজ</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <a
          v-for="n in intlNews"
          :key="n.name"
          :href="n.url"
          target="_blank"
          rel="noopener"
          class="card p-5 flex flex-col items-center text-center group hover:border-brand-300 transition"
        >
          <div class="w-10 h-10 rounded-lg mb-3 flex items-center justify-center font-black text-white text-xs" :style="`background:${n.color}`">
            {{ n.abbr }}
          </div>
          <p class="font-bold text-sm text-slate-800 group-hover:text-brand-600 transition">{{ n.name }}</p>
          <p class="text-xs text-slate-400 mt-1">{{ n.tag }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'ব্লগ ও নিউজ' })

const banglaBLogs = [
  { name: 'টেকটিউনস', url: 'https://www.techtunes.co', abbr: 'TT', bg: 'bg-blue-100', text: 'text-blue-700', desc: 'বাংলাদেশের বৃহত্তম টেকনোলজি কমিউনিটি ব্লগ প্ল্যাটফর্ম।', cta: 'কমিউনিটি দেখুন' },
  { name: 'টেকসহর', url: 'https://techshohor.com', abbr: 'TS', bg: 'bg-red-100', text: 'text-red-700', desc: 'বাংলাদেশের প্রযুক্তি, স্টার্টআপ ও উদ্যোক্তা বিষয়ক সংবাদ।', cta: 'সর্বশেষ খবর' },
  { name: 'প্রথম আলো টেক', url: 'https://www.prothomalo.com/technology', abbr: 'PA', bg: 'bg-green-100', text: 'text-green-700', desc: 'প্রথম আলোর প্রযুক্তি বিভাগ — দেশ-বিদেশের টেক সংবাদ।', cta: 'পড়ুন' },
  { name: 'বিডি টেক নিউজ', url: 'https://bdtechnews.com', abbr: 'BD', bg: 'bg-orange-100', text: 'text-orange-700', desc: 'বাংলাদেশ ও বিশ্বের প্রযুক্তি বিষয়ক সর্বশেষ খবরাখবর।', cta: 'খবর দেখুন' },
]

const intlNews = [
  { name: 'Hacker News', url: 'https://news.ycombinator.com', color: '#ff6600', abbr: 'HN', tag: 'টেক আলোচনা' },
  { name: 'Dev.to', url: 'https://dev.to', color: '#0a0a0a', abbr: 'DV', tag: 'ডেভেলপার ব্লগ' },
  { name: 'CSS-Tricks', url: 'https://css-tricks.com', color: '#248aaa', abbr: 'CT', tag: 'CSS & Web' },
  { name: 'Smashing Magazine', url: 'https://smashingmagazine.com', color: '#e9320e', abbr: 'SM', tag: 'ওয়েব ডিজাইন' },
  { name: 'The Verge', url: 'https://theverge.com', color: '#ff3b30', abbr: 'TV', tag: 'টেক নিউজ' },
  { name: 'TechCrunch', url: 'https://techcrunch.com', color: '#0a9d58', abbr: 'TC', tag: 'স্টার্টআপ' },
]
</script>
