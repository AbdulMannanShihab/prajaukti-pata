<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6 text-center">
    <div class="max-w-md">
      <p class="text-8xl font-black text-slate-200 mb-4">৪০৪</p>
      <h1 class="text-2xl font-bold text-slate-800 mb-3">পৃষ্ঠা পাওয়া যায়নি</h1>
      <p class="text-slate-500 mb-8 leading-relaxed">
        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি স্থানান্তরিত হয়েছে, মুছে ফেলা হয়েছে বা কখনো ছিল না।
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink to="/" class="btn-primary">হোমে যান</NuxtLink>
        <NuxtLink to="/resources" class="btn-secondary">রিসোর্স দেখুন</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: '৪০৪ — পৃষ্ঠা নেই' })
</script>
