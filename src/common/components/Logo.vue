<script setup lang="ts">
import { Banana } from "lucide-vue-next";
import Button from "./ui/button/Button.vue";
import { NavLink, useNav } from "@/common/composables/useNav";
import { computed } from "vue";
const { navLinks } = useNav()

const homeLink = computed(() => navLinks.value?.[NavLink.Home]);
</script>

<template>
    <Button variant="ghost" class="cursor-pointer group" as-child>
        <a class="flex items-center gap-2" :href="homeLink?.path">
            <Banana
                class="transition-colors group-hover:text-yellow-400 dark:text-yellow-400 dark:group-hover:text-yellow-600" />
            <h1 class="text-balance text-xl font-semibold tracking-tight md:text-2xl uppercase">
                Carby
            </h1>
        </a>
    </Button>
</template>
