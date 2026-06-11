<script setup>
import AppNavbar from '~/components/layout/AppNavbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
</script>
<template>
  <div class="min-h-screen flex flex-col bg-slate-50">

    <!-- Header -->
    <ClientOnly>
      <AppNavbar />
    </ClientOnly>

    <!-- Page Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <ClientOnly>
      <AppFooter />
    </ClientOnly>

    <!-- Global UI Components -->
    <ToastContainer />
    <AuthModal />
    <UploadModal />

  </div>
</template>