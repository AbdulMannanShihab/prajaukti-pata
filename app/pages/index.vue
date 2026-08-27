<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden gradient-hero text-white py-24 md:py-32 px-6">
      <!-- decorative depth layers -->
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.06]"
        style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 28px 28px;"
      />
      <div class="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-yellow-300/20 rounded-full blur-3xl" />
      <div class="pointer-events-none absolute -bottom-32 -left-16 w-[24rem] h-[24rem] bg-blue-400/20 rounded-full blur-3xl" />

      <div class="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <!-- Text column -->
        <div class="text-center lg:text-left">
          <p class="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/10">
            <Icon name="heroicons:sparkles" class="w-4 h-4 text-yellow-300" />
            প্রযুক্তি পাতা
          </p>

          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-[1.1] font-bangla-serif">
            রিসোর্স খুঁজুন
          </h1>

          <p class="text-lg md:text-xl text-blue-100 mb-4 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            ব্লগ, টিউটোরিয়াল, ইউটিউব চ্যানেল ও কমিউনিটি রিসোর্স বাংলা ও ইংরেজি দুই ভাষাতেই।
          </p>

          <div class="flex flex-wrap justify-center lg:justify-start gap-4">
            <NuxtLink
              to="/resources"
              class="group bg-white text-brand-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition shadow-xl inline-flex items-center gap-2"
            >
              রিসোর্স দেখুন
              <Icon name="heroicons:arrow-right" class="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-1" />
            </NuxtLink>
            <button
              aria-label="রিসোর্স শেয়ার করুন"
              class="bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition border border-white/20 backdrop-blur"
              @click="checkAuthThenUpload"
            >
              রিসোর্স শেয়ার করুন
            </button>
          </div>
        </div>

        <!-- Signature element: bilingual resource card stack -->
        <div class="relative hidden lg:block h-[22rem]" aria-hidden="true">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative w-72">
              <div
                v-for="(card, i) in heroCardPreview"
                :key="card.title"
                class="absolute inset-x-0 bg-white/95 text-slate-900 rounded-2xl p-5 shadow-2xl border border-white/40 backdrop-blur transition-transform duration-500 motion-safe:hover:-translate-y-1"
                :style="{ top: `${i * 34}px`, transform: `rotate(${card.tilt}deg)`, zIndex: heroCardPreview.length - i }"
              >
                <div class="flex items-center justify-between mb-3">
                  <span
                    class="inline-flex items-center text-[11px] font-mono font-bold px-2 py-0.5 rounded-full"
                    :class="card.lang === 'BN' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'"
                  >
                    {{ card.lang }}
                  </span>
                  <Icon :name="card.icon" class="w-4 h-4 text-slate-400" />
                </div>
                <p class="font-bangla-serif font-bold text-sm mb-1 leading-snug">{{ card.title }}</p>
                <p class="text-xs text-slate-500">{{ card.type }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end Hero -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'হোম',
  description: 'বাংলাদেশের সেরা টেক রিসোর্স, টিউটোরিয়াল ও কমিউনিটি প্ল্যাটফর্ম — প্রযুক্তি পাতা।',
})

const authModalOpen = useState('authModalOpen', () => false)
const uploadModalOpen = useState('uploadModalOpen', () => false)

async function checkAuthThenUpload() {
  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { authModalOpen.value = true; return }
  uploadModalOpen.value = true
}

// Sample cards for the hero's bilingual proof-stack — swap for real featured resources when available
const heroCardPreview = [
  { title: 'Frontend Masters – Advanced React', type: 'ইউটিউব চ্যানেল', lang: 'EN', tilt: -6, icon: 'heroicons:play-circle' },
  { title: 'জাভাস্ক্রিপ্ট শেখার সহজ গাইড', type: 'ব্লগ পোস্ট', lang: 'BN', tilt: 3, icon: 'heroicons:document-text' },
  { title: 'System Design Interview Prep', type: 'কোর্স', lang: 'EN', tilt: -2, icon: 'heroicons:academic-cap' },
]
</script>