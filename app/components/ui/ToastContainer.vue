<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[200] space-y-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold min-w-[220px] max-w-sm',
            colorMap[toast.type]
          ]"
        >
          <Icon :name="iconMap[toast.type]" class="w-4 h-4 flex-shrink-0" />
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts } = useToast()

const colorMap = {
  success: 'bg-green-600 text-white',
  error:   'bg-red-600 text-white',
  info:    'bg-brand-600 text-white',
  warning: 'bg-amber-500 text-white',
}

const iconMap = {
  success: 'heroicons:check-circle',
  error:   'heroicons:x-circle',
  info:    'heroicons:information-circle',
  warning: 'heroicons:exclamation-triangle',
}
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s ease; }
.toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from { transform: translateY(12px); opacity: 0; }
.toast-leave-to  { transform: translateX(100%); opacity: 0; }
</style>
