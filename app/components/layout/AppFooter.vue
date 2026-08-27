<template>
  <footer class="bg-slate-900 text-white border-t border-slate-800">
    <div class="container mx-auto px-6 py-14">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <!-- Brand -->
        <div>
          <p class="text-2xl font-black tracking-tight mb-3">
            প্রযুক্তি<span class="text-brand-400">.পাতা</span>
          </p>
          <p class="text-slate-400 text-sm leading-relaxed">
            টেক রিসোর্স, টিউটোরিয়াল ও কমিউনিটি প্ল্যাটফর্ম এক ঠিকানায়।
          </p>
        </div>

        <!-- Links -->
        <div>
          <p class="font-bold text-slate-300 mb-4">দ্রুত লিংক</p>
          <ul class="space-y-2 text-sm text-slate-400">
            <li><NuxtLink to="/learning" class="hover:text-white transition">লার্নিং প্ল্যাটফর্ম</NuxtLink></li>
            <li><NuxtLink to="/channels" class="hover:text-white transition">ইউটিউব চ্যানেল</NuxtLink></li>
            <li><NuxtLink to="/blogs" class="hover:text-white transition">ব্লগ ও নিউজ</NuxtLink></li>
          </ul>
        </div>

        <!-- Resource types -->
        <div>
          <p class="font-bold text-slate-300 mb-4">রিসোর্স ধরন</p>
          <ul class="space-y-2 text-sm text-slate-400">
            <li v-for="type in RESOURCE_TYPES" :key="type">
              <NuxtLink :to="`/resources?type=${type}`" class="hover:text-white transition">{{ type }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 text-xs">
        <p>© ২০২৬ প্রযুক্তি পাতা — সর্বস্বত্ব সংরক্ষিত।</p>
        <p>
          হোস্ট করা হয়েছে
          <a href="https://ready.bd/" target="_blank" class="text-brand-400 hover:underline">ready.bd</a>-এ
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RESOURCE_TYPES } from '~/types'
</script>
