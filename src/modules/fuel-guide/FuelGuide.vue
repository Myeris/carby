<script setup lang="ts">
  import { NavLink, useNav } from '@/common/composables/use-nav/useNav.ts';
  import { useForm, useProvideForm } from '@/modules/fuel-guide/composables/useForm';
  import Form from '@/modules/fuel-guide/form/Form.vue';
  import Result from '@/modules/fuel-guide/result/Result.vue';

  useProvideForm();
  const { navLinks } = useNav();
  const link = navLinks[NavLink.FuelGuide];
  const { formId, resultId, hasResult } = useForm()!;
</script>

<template>
  <section
    :id="link.id"
    class="mx-auto mt-12 flex min-h-screen w-full max-w-4xl scroll-mt-28 flex-col gap-8 px-4 text-center sm:px-6">
    <h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
      {{ link.name }}
    </h2>

    <div class="grid gap-8" :class="[hasResult ? 'lg:grid-cols-2' : 'grid-cols-1']">
      <Form :id="formId" :class="[hasResult ? 'lg:border-r lg:border-border lg:pr-6' : '']" />

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-8">
        <Result :id="resultId" v-if="hasResult" :class="[hasResult ? 'lg:pl-6' : '']" />
      </Transition>
    </div>
  </section>
</template>
