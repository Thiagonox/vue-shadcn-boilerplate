<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from '../components/columns'
import DataTable from '../components/DataTable.vue'
import UserNav from '../components/UserNav.vue'

// Definindo o tipo de dados para as empresas
type Company = {
  cnpj: string;
  email: string;
  nome_fantasia: string;
  telefone: string; // Incluindo telefone
}

const companies = ref<Company[]>([])

// Função para buscar os dados das empresas da API
const fetchCompanies = async () => {
  try {
    const response = await fetch('https://scraping-cnpjs.onrender.com/empresas', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar empresas')
    }

    const data = await response.json();
    companies.value = data; // Armazena os dados no estado local
  } catch (error) {
    console.error(error)
  }
}

// Chama a função ao montar o componente
onMounted(() => {
  fetchCompanies()
})
</script>

<template>
  <div class="md:hidden">
    <VPImage
      alt="Tasks"
      width="1280"
      height="1214"
      class="block"
      :image="{
        dark: '/examples/tasks-dark.png',
        light: '/examples/tasks-light.png',
      }"
    />
  </div>

  <div class="hidden h-full md:w-11/12 m-auto mt-6 flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Bem Vindo!
        </h2>
        <p class="text-muted-foreground">
          Aqui está uma lista de fornecedores que pode ser útil a você.
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
    <DataTable :data="companies" :columns="columns" />
  </div>
</template>