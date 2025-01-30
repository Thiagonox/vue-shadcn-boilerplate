<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Defina a interface para os dados do usuário
interface User {
  id: number
  name: string
  avatar: string
  fallback: string
  usinas: number
  status: 'Concluído' | 'Pendente' | 'Em Análise'
}

// Lista de usuários
const users: User[] = [
  {
    id: 1,
    name: 'João Silva',
    avatar: '/avatars/01.png',
    fallback: 'JS',
    usinas: 3,
    status: 'Concluído'
  },
  {
    id: 2,
    name: 'Maria Costa',
    avatar: '/avatars/02.png',
    fallback: 'MC',
    usinas: 2,
    status: 'Pendente'
  },
  {
    id: 3,
    name: 'Ana Ferreira',
    avatar: '/avatars/03.png',
    fallback: 'AF',
    usinas: 4,
    status: 'Em Análise'
  },
  {
    id: 4,
    name: 'Lucas Carvalho',
    avatar: '/avatars/04.png',
    fallback: 'LC',
    usinas: 1,
    status: 'Concluído'
  },
  {
    id: 5,
    name: 'Sofia Rodrigues',
    avatar: '/avatars/05.png',
    fallback: 'SR',
    usinas: 5,
    status: 'Pendente'
  }
]
</script>

<template>
  <div class="space-y-8">
    <div v-for="user in users" :key="user.id" class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage :src="user.avatar" alt="Avatar" />
        <AvatarFallback>{{ user.fallback }}</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          {{ user.name }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ user.usinas }} usina{{ user.usinas !== 1 ? 's' : '' }}
        </p>
      </div>
      <Badge 
        class="ml-auto font-medium" 
        :variant="user.status === 'Concluído' ? 'default' : user.status === 'Pendente' ? 'destructive' : 'secondary'"
      >
        {{ user.status }}
      </Badge>
    </div>
  </div>
</template>