<script setup lang="ts">
  import Footer from '@/common/components/footer/Footer.vue';
  import Header from '@/common/components/header/Header.vue';
  import Page from '@/common/layouts/page/Page.vue';
  import HomePage from '@/pages/HomePage.vue';
</script>

<template>
  <Page>
    <template #header>
      <Header />
    </template>

    <template #main>
      <HomePage />
    </template>

    <template #footer>
      <Footer />
    </template>
  </Page>
</template>
