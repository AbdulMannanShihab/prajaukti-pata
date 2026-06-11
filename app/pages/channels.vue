<template>
  <div>
    <section class="bg-slate-900 text-white py-16 px-6 text-center">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">ইউটিউব চ্যানেল</h1>
        <p class="text-slate-300 text-lg">বাংলায় বিনামূল্যে সেরা প্রযুক্তি শিক্ষা</p>
      </div>
    </section>

    <div class="container mx-auto px-4 md:px-6 py-12">

      <!-- Bangla channels -->
      <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span class="w-2 h-6 bg-brand-600 rounded-full inline-block" />
        বাংলা চ্যানেল
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        <a
          v-for="ch in banglaChannels"
          :key="ch.name"
          :href="ch.url"
          target="_blank"
          rel="noopener"
          class="card p-6 flex flex-col group"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xs flex-shrink-0" :class="ch.bg">
              {{ ch.abbr }}
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-slate-800 group-hover:text-brand-600 transition truncate">{{ ch.name }}</h3>
              <p class="text-xs text-slate-400">{{ ch.subs }}</p>
            </div>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed flex-1 mb-4">{{ ch.desc }}</p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span v-for="t in ch.topics" :key="t" class="tag">{{ t }}</span>
          </div>
          <div class="flex items-center gap-2 text-red-500 font-bold text-sm mt-auto">
            <Icon name="mdi:youtube" class="w-5 h-5" />
            চ্যানেল ভিজিট করুন
          </div>
        </a>
      </div>

      <!-- English channels -->
      <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span class="w-2 h-6 bg-red-500 rounded-full inline-block" />
        ইংরেজি চ্যানেল (সুপারিশকৃত)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          v-for="ch in englishChannels"
          :key="ch.name"
          :href="ch.url"
          target="_blank"
          rel="noopener"
          class="card p-5 flex items-center gap-4 group hover:border-red-200 transition"
        >
          <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 font-black text-sm flex items-center justify-center flex-shrink-0">
            {{ ch.abbr }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-slate-800 group-hover:text-brand-600 transition">{{ ch.name }}</p>
            <p class="text-sm text-slate-500 line-clamp-2">{{ ch.desc }}</p>
          </div>
          <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-slate-400 flex-shrink-0" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'ইউটিউব চ্যানেল' })

const banglaChannels = [
  {
    name: 'Learn with Hasin Hayder',
    url: 'https://www.youtube.com/@LearnWithHasinHayder',
    abbr: 'LH',
    bg: 'bg-red-600',
    subs: 'অ্যাডভান্সড লেভেল',
    desc: 'পিএইচপি, লারাভেল ও সফটওয়্যার আর্কিটেকচারে দেশের অন্যতম সেরা চ্যানেল।',
    topics: ['PHP', 'Laravel', 'Architecture'],
  },
  {
    name: 'Learn with Sumit',
    url: 'https://www.youtube.com/@LearnwithSumit',
    abbr: 'LS',
    bg: 'bg-yellow-500',
    subs: 'বিগিনার থেকে অ্যাডভান্সড',
    desc: 'জাভাস্ক্রিপ্ট ও আধুনিক ওয়েব ফ্রেমওয়ার্ক (MERN) শেখার জনপ্রিয় চ্যানেল।',
    topics: ['JavaScript', 'React', 'Node.js'],
  },
  {
    name: 'Stack Learner',
    url: 'https://www.youtube.com/@StackLearner',
    abbr: 'SL',
    bg: 'bg-blue-600',
    subs: 'বিগিনার ফ্রেন্ডলি',
    desc: 'প্রোগ্রামিং ফান্ডামেন্টাল ও ইন্ডাস্ট্রি স্ট্যান্ডার্ড সফটওয়্যার ডেভেলপমেন্ট।',
    topics: ['JavaScript', 'Data Structures', 'Web Dev'],
  },
  {
    name: 'Anisul Islam',
    url: 'https://www.youtube.com/@anisul_islam',
    abbr: 'AI',
    bg: 'bg-green-600',
    subs: 'সব লেভেল',
    desc: 'বিগিনারদের জন্য বাংলায় সবচেয়ে সহজ ব্যাখ্যায় প্রোগ্রামিং শেখার চ্যানেল।',
    topics: ['Python', 'C', 'Java', 'Web'],
  },
  {
    name: 'Programmer Sohel',
    url: 'https://www.youtube.com/@ProgrammerSohel',
    abbr: 'PS',
    bg: 'bg-purple-600',
    subs: 'ইন্টারমিডিয়েট',
    desc: 'ওয়েব ডেভেলপমেন্ট ও ফ্রিল্যান্সিং গাইড নিয়ে মানসম্মত বাংলা কন্টেন্ট।',
    topics: ['React', 'Next.js', 'Freelancing'],
  },
  {
    name: 'WebDevs BD',
    url: 'https://www.youtube.com/@WebDevsBD',
    abbr: 'WD',
    bg: 'bg-teal-600',
    subs: 'প্র্যাক্টিক্যাল প্রোজেক্ট',
    desc: 'প্র্যাক্টিক্যাল ওয়েব ডেভেলপমেন্ট প্রজেক্ট ও টিউটোরিয়াল বাংলায়।',
    topics: ['HTML', 'CSS', 'Bootstrap', 'JS'],
  },
]

const englishChannels = [
  { name: 'Fireship', url: 'https://www.youtube.com/@Fireship', abbr: 'Fi', desc: 'দ্রুত ও মজাদার টেক ভিডিও — ১০০ সেকেন্ডে যেকোনো ধারণা' },
  { name: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia', abbr: 'TM', desc: 'ওয়েব ডেভেলপমেন্টের সেরা ক্র্যাশ কোর্স ও প্রজেক্ট' },
  { name: 'Kevin Powell', url: 'https://www.youtube.com/@KevinPowell', abbr: 'KP', desc: 'CSS মাস্টার হওয়ার জন্য সেরা চ্যানেল' },
  { name: 'The Primeagen', url: 'https://www.youtube.com/@ThePrimeagen', abbr: 'TP', desc: 'পারফরম্যান্স, Rust, Vim — সিনিয়র ডেভেলপারদের জন্য' },
  { name: 'Web Dev Simplified', url: 'https://www.youtube.com/@WebDevSimplified', abbr: 'WS', desc: 'জটিল ওয়েব ধারণাগুলো সহজভাবে ব্যাখ্যা করা' },
  { name: 'Theo – t3.gg', url: 'https://www.youtube.com/@t3dotgg', abbr: 'T3', desc: 'TypeScript, React, Next.js ও মডার্ন স্ট্যাক নিয়ে ডিপ ডাইভ' },
]
</script>
