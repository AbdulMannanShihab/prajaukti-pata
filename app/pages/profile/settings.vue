<template>
  <div class="min-h-[60vh] flex items-center justify-center px-6 py-12">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-slate-800 mb-2">পাসওয়ার্ড পরিবর্তন করুন</h1>
      <p class="text-sm text-slate-500 mb-6">আপনার অ্যাকাউন্টের নতুন পাসওয়ার্ড সেট করুন</p>

      <form class="space-y-5" @submit.prevent="submit">
        <div>
          <label class="label">নতুন পাসওয়ার্ড</label>
          <input v-model="password" type="password" class="input" placeholder="কমপক্ষে ৬ অক্ষর" required minlength="6" />
        </div>
        <div>
          <label class="label">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input v-model="confirm" type="password" class="input" placeholder="আবার লিখুন" required />
        </div>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-sm">পাসওয়ার্ড সফলভাবে আপডেট হয়েছে।</p>
        <button type="submit" class="btn-primary w-full" :disabled="loading">
          <span v-if="loading" class="spinner" />
          <span v-else>পাসওয়ার্ড আপডেট করুন</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

useSeoMeta({ title: 'পাসওয়ার্ড সেটিংস' })

const supabase = useSupabaseClient()
const toast = useToast()

const password = ref('')
const confirm = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

async function submit() {
  error.value = ''
  success.value = false

  if (password.value !== confirm.value) {
    error.value = 'পাসওয়ার্ড মিলছে না।'
    return
  }
  if (password.value.length < 6) {
    error.value = 'কমপক্ষে ৬ অক্ষর হতে হবে।'
    return
  }

  loading.value = true
  const { error: err } = await supabase.auth.updateUser({ password: password.value })
  loading.value = false

  if (err) {
    error.value = 'সমস্যা হয়েছে। আবার চেষ্টা করুন।'
    return
  }

  success.value = true
  password.value = ''
  confirm.value = ''
  toast.success('পাসওয়ার্ড আপডেট হয়েছে!')
}
</script>