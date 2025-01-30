<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <a
      href="/"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      Inico
    </a>
    <a
      href="/cadastrar-cliente"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Cadastrar Cliente
    </a>
    <a
      href="/cadastrar-usina"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Cadastrar Usina
    </a>
  </nav>
</template>
