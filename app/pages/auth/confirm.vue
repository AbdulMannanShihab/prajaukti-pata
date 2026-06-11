<template>
  <div class="min-h-[60vh] flex items-center justify-center px-6">
    <div class="text-center max-w-sm">
      <div v-if="verifying" class="space-y-4">
        <div class="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto">
          <span class="spinner !w-7 !h-7 !border-[3px] text-brand-600" />
        </div>
        <p class="text-lg font-semibold text-slate-700">যাচাই করা হচ্ছে...</p>
      </div>
      <div v-else-if="success" class="space-y-4">
        <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Icon name="heroicons:check-circle" class="w-8 h-8 text-green-600" />
        </div>
        <h1 class="text-2xl font-bold text-slate-800">ইমেইল যাচাই সম্পন্ন!</h1>
        <p class="text-slate-500">আপনার অ্যাকাউন্ট সক্রিয় হয়েছে।</p>
        <NuxtLink to="/" class="btn-primary inline-flex">হোমে যান</NuxtLink>
      </div>
      <div v-else class="space-y-4">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <Icon name="heroicons:x-circle" class="w-8 h-8 text-red-500" />
        </div>
        <h1 class="text-2xl font-bold text-slate-800">সমস্যা হয়েছে</h1>
        <p class="text-slate-500">লিংকটি মেয়াদোত্তীর্ণ বা অকার্যকর।</p>
        <NuxtLink to="/" class="btn-secondary inline-flex">হোমে ফিরুন</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'ইমেইল যাচাই' })

const supabase = useSupabaseClient()
const toast = useToast()
const verifying = ref(true)
const success = ref(false)

onMounted(async () => {
  const { error } = await supabase.auth.getSession()
  if (!error) {
    success.value = true
    toast.success('ইমেইল যাচাই সফল হয়েছে!')
  }
  verifying.value = false
})
</script>
