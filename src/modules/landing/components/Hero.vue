<template>
  <div class="pointer-events-none absolute inset-0 -z-10">
    <picture>
      <source
        srcset="
          /assets/images/landing_1800.webp 1800w,
          /assets/images/landing_1200.webp 1200w,
          /assets/images/landing_800.webp   800w
        "
        type="image/webp" />
      <img
        src="/assets/images/landing_1200.jpg"
        sizes="100vw"
        alt="Marathon runners from the Toronto Waterfront Marathon, taken by Marie Foussette"
        class="h-full w-full object-cover" />
    </picture>

    <div class="absolute inset-0 bg-black/70 sm:bg-black/60 lg:bg-black/50"></div>
  </div>
</template>
