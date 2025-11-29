<template>
  <div>
    <slot name="header" />

    <main class="flex min-h-screen flex-col bg-background p-6 text-foreground">
      <slot name="main" />
    </main>
  </div>
</template>
