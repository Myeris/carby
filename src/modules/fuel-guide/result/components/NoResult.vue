<script setup lang="ts">
  import { BicepsFlexed } from 'lucide-vue-next';

  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from '@/common/components/ui/empty';
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <BicepsFlexed />
      </EmptyMedia>
      <EmptyTitle>You're all set!</EmptyTitle>
      <EmptyDescription> You don't need anything! Just enjoy your workout.</EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
