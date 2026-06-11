<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
        @click.self="close"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

          <!-- Tabs -->
          <div class="flex border-b border-slate-200">
            <button
              :class="['flex-1 py-4 font-bold text-sm transition', tab === 'signin' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-400 hover:text-slate-600']"
              @click="tab = 'signin'"
            >সাইন ইন</button>
            <button
              :class="['flex-1 py-4 font-bold text-sm transition', tab === 'signup' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-400 hover:text-slate-600']"
              @click="tab = 'signup'"
            >নতুন অ্যাকাউন্ট</button>
          </div>

          <!-- Sign In -->
          <form v-if="tab === 'signin'" class="p-8 space-y-4" @submit.prevent="doSignIn">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">স্বাগতম!</h2>
            <div>
              <label class="label">ইমেইল</label>
              <input v-model="siEmail" type="email" placeholder="আপনার ইমেইল" class="input" required />
            </div>
            <div>
              <label class="label">পাসওয়ার্ড</label>
              <input v-model="siPassword" type="password" placeholder="পাসওয়ার্ড" class="input" required />
            </div>
            <p v-if="siError" class="text-red-500 text-sm">{{ siError }}</p>
            <button type="submit" class="btn-primary w-full" :disabled="loading">
              <span v-if="loading" class="spinner" />
              <span v-else>সাইন ইন করুন</span>
            </button>
            <p class="text-center text-sm text-slate-500">
              পাসওয়ার্ড ভুলে গেছেন?
              <button type="button" class="text-brand-600 font-semibold hover:underline" @click="tab = 'reset'">রিসেট করুন</button>
            </p>
          </form>

          <!-- Sign Up -->
          <form v-else-if="tab === 'signup'" class="p-8 space-y-4" @submit.prevent="doSignUp">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">যোগ দিন</h2>
            <div>
              <label class="label">পুরো নাম</label>
              <input v-model="suName" type="text" placeholder="আপনার নাম" class="input" required />
            </div>
            <div>
              <label class="label">ইমেইল</label>
              <input v-model="suEmail" type="email" placeholder="আপনার ইমেইল" class="input" required />
            </div>
            <div>
              <label class="label">পাসওয়ার্ড</label>
              <input v-model="suPassword" type="password" placeholder="কমপক্ষে ৬ অক্ষর" class="input" required minlength="6" />
            </div>
            <p v-if="suError" class="text-red-500 text-sm">{{ suError }}</p>
            <button type="submit" class="btn-primary w-full" :disabled="loading">
              <span v-if="loading" class="spinner" />
              <span v-else>অ্যাকাউন্ট তৈরি করুন</span>
            </button>
          </form>

          <!-- Reset Password -->
          <form v-else-if="tab === 'reset'" class="p-8 space-y-4" @submit.prevent="doReset">
            <h2 class="text-2xl font-bold text-slate-800 mb-2">পাসওয়ার্ড রিসেট</h2>
            <div>
              <label class="label">ইমেইল</label>
              <input v-model="resetEmail" type="email" placeholder="আপনার ইমেইল" class="input" required />
            </div>
            <button type="submit" class="btn-primary w-full" :disabled="loading">
              <span v-if="loading" class="spinner" />
              <span v-else>লিংক পাঠান</span>
            </button>
            <button type="button" class="btn-ghost w-full" @click="tab = 'signin'">← ফিরে যান</button>
          </form>

          <!-- Close button -->
          <button
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            @click="close"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const open = useState('authModalOpen', () => false)
const tab = ref<'signin' | 'signup' | 'reset'>('signin')

const { loading, signIn, signUp, resetPassword } = useAuth()

// Sign in state
const siEmail = ref(''); const siPassword = ref(''); const siError = ref('')
// Sign up state
const suName = ref(''); const suEmail = ref(''); const suPassword = ref(''); const suError = ref('')
// Reset state
const resetEmail = ref('')

function close() { open.value = false; siError.value = ''; suError.value = '' }

async function doSignIn() {
  siError.value = ''
  const ok = await signIn(siEmail.value, siPassword.value)
  if (ok) close()
  else siError.value = 'ইমেইল বা পাসওয়ার্ড ভুল।'
}

async function doSignUp() {
  suError.value = ''
  if (suPassword.value.length < 6) { suError.value = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে।'; return }
  const ok = await signUp(suEmail.value, suPassword.value, suName.value)
  if (ok) { close(); tab.value = 'signin' }
}

async function doReset() {
  const ok = await resetPassword(resetEmail.value)
  if (ok) { close(); tab.value = 'signin' }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .bg-white, .modal-leave-active .bg-white { transition: transform 0.2s ease; }
.modal-enter-from .bg-white { transform: scale(0.95); }
.modal-leave-to .bg-white { transform: scale(0.95); }
</style>
