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

      <!-- Featured -->
      <h2 class="text-2xl font-bold text-slate-800 mb-6">জনপ্রিয় প্ল্যাটফর্ম</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        <a
          v-for="p in platforms"
          :key="p.name"
          :href="p.url"
          target="_blank"
          rel="noopener"
          class="card p-7 flex flex-col border-t-4 group"
          :style="`border-top-color:${p.color}`"
        >
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-bold group-hover:underline" :style="`color:${p.color}`">{{ p.name }}</h3>
            <span class="badge text-xs" :style="`background:${p.color}20;color:${p.color}`">{{ p.tag }}</span>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed flex-1 mb-5">{{ p.desc }}</p>
          <div class="flex flex-wrap gap-2 mb-5">
            <span v-for="s in p.skills" :key="s" class="tag">{{ s }}</span>
          </div>
          <span class="font-bold text-sm mt-auto flex items-center gap-1" :style="`color:${p.color}`">
            ভিজিট করুন <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
          </span>
        </a>
      </div>

      <!-- International Platforms -->
      <h2 class="text-2xl font-bold text-slate-800 mb-6">আন্তর্জাতিক প্ল্যাটফর্ম</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          v-for="p in international"
          :key="p.name"
          :href="p.url"
          target="_blank"
          rel="noopener"
          class="card p-5 flex items-center gap-4 group hover:border-brand-300 transition"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0" :style="`background:${p.color}`">
            {{ p.abbr }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-slate-800 group-hover:text-brand-600 transition">{{ p.name }}</p>
            <p class="text-sm text-slate-500 truncate">{{ p.desc }}</p>
          </div>
          <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-slate-400 flex-shrink-0" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'লার্নিং প্ল্যাটফর্ম' })

const platforms = [
  {
    name: 'Polash Mahmud',
    url: 'https://polashmahmud.com/courses',
    color: '#4f46e5',
    tag: 'বাংলা',
    desc: 'পলাশ মাহমুদের প্রিমিয়াম ও ফ্রি কোর্স — ওয়েব ডেভেলপমেন্ট থেকে ফ্রিল্যান্সিং।',
    skills: ['PHP', 'Laravel', 'JavaScript', 'Vue'],
  },
  {
    name: 'Innovative Skills BD',
    url: 'https://innovativeskillsbd.com/',
    color: '#2563eb',
    tag: 'বাংলা',
    desc: 'আইটি স্কিল ডেভেলপমেন্ট ও প্রফেশনাল আইটি ট্রেনিংয়ের আধুনিক প্ল্যাটফর্ম।',
    skills: ['Web Dev', 'Design', 'Marketing'],
  },
  {
    name: 'শিখুন.নেট',
    url: 'https://shikhun.net',
    color: '#ea580c',
    tag: 'বাংলা',
    desc: 'সহজ বাংলায় ফ্রিল্যান্সিং ও ক্যারিয়ার ফোকাসড ভিডিও লার্নিং সাইট।',
    skills: ['Freelancing', 'SEO', 'Graphics'],
  },
]

const international = [
  { name: 'freeCodeCamp', url: 'https://freecodecamp.org', color: '#0a0a23', abbr: 'fCC', desc: 'সম্পূর্ণ বিনামূল্যে ওয়েব ডেভেলপমেন্ট সার্টিফিকেশন' },
  { name: 'The Odin Project', url: 'https://theodinproject.com', color: '#cc4b00', abbr: 'TOP', desc: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্টের ওপেন সোর্স কারিকুলাম' },
  { name: 'CS50 – Harvard', url: 'https://cs50.harvard.edu', color: '#a51c30', abbr: 'CS', desc: 'বিশ্বের সেরা কম্পিউটার সায়েন্স ইন্ট্রো কোর্স, বিনামূল্যে' },
  { name: 'Coursera', url: 'https://coursera.org', color: '#0056d2', abbr: 'Co', desc: 'বিশ্বের শীর্ষ বিশ্ববিদ্যালয়ের কোর্স ও সার্টিফিকেট' },
  { name: 'Udemy', url: 'https://udemy.com', color: '#a435f0', abbr: 'Ud', desc: 'হাজারো বিষয়ে সাশ্রয়ী কোর্স' },
  { name: 'roadmap.sh', url: 'https://roadmap.sh', color: '#000000', abbr: 'RM', desc: 'ডেভেলপারদের জন্য স্টেপ-বাই-স্টেপ রোডম্যাপ' },
]
</script>
