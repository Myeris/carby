<script setup lang="ts">
  import Credits from '@/common/components/footer/credits/Credits.vue';
  import Button from '@/common/components/ui/button/Button.vue';

  const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-border bg-background text-foreground">
    <div
      class="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:flex-wrap sm:justify-center">
      <p class="text-sm leading-relaxed">© {{ year }} Carby. All rights reserved.</p>

      <span class="hidden text-sm sm:inline" aria-hidden="true">|</span>

      <Button variant="link" class="p-0" as-child>
        <a href="https://github.com/Myeris" target="_blank" rel="noreferrer noopener">
          Developed by Marie Foussette
        </a>
      </Button>

      <span class="hidden text-sm sm:inline" aria-hidden="true">|</span>

      <Credits />
    </div>
  </footer>
</template>
