<template>
  <div class="space-y-6">
    <Card class="shadow-lg">
      <CardHeader class="border-b">
        <CardTitle class="text-2xl font-semibold">Lista de Relatórios</CardTitle>
        <CardDescription class="text-gray-600">
          Informações básicas dos clientes cadastrados.
        </CardDescription>
      </CardHeader>
      <CardContent class="p-6">
        <!-- Seção de Filtros -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Filtro por nome -->
          <div>
            <label for="nameFilter" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por nome</label>
            <input
              id="nameFilter"
              v-model="nameFilter"
              type="text"
              placeholder="Digite o nome"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <!-- Filtro por quantidade de usinas (intervalo) -->
          <div>
            <label for="plantsFilter" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por usinas</label>
            <div class="flex space-x-2">
              <input
                id="plantsMin"
                v-model.number="plantsMin"
                type="number"
                placeholder="Mínimo"
                class="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              <input
                id="plantsMax"
                v-model.number="plantsMax"
                type="number"
                placeholder="Máximo"
                class="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <!-- Filtro por situação do relatório -->
          <div>
            <label for="statusFilter" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por situação</label>
            <Select v-model:modelValue="selectedStatus">
              <SelectTrigger class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                <SelectValue placeholder="Selecione a situação" />
              </SelectTrigger>
              <SelectContent class="bg-white border border-gray-300 rounded-lg shadow-lg">
                <SelectItem value="all" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Todas as situações</SelectItem>
                <SelectItem value="Concluído" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Concluído</SelectItem>
                <SelectItem value="Pendente" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pendente</SelectItem>
                <SelectItem value="Em Análise" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Em Análise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Botão de visibilidade do CPF -->
          <div class="flex items-end">
            <button
              @click="toggleCPFVisibility"
              class="w-14 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <EyeIcon v-if="!showCPF" class="h-5 w-5 text-gray-600" />
              <EyeOffIcon v-else class="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <!-- Tabela de clientes -->
        <Table class="w-full border-collapse">
          <TableHeader class="bg-gray-50">
            <TableRow>
              <!-- Cabeçalho com ordenação por nome -->
              <TableHead class="px-4 py-3 text-left text-sm font-medium text-gray-700">
                <button
                  @click="toggleNameSort"
                  class="flex items-center space-x-1 hover:text-indigo-600 transition-all"
                >
                  <span>Nome do Cliente</span>
                  <ArrowUpIcon
                    v-if="selectedNameSort === 'name-asc'"
                    class="h-4 w-4"
                  />
                  <ArrowDownIcon
                    v-else-if="selectedNameSort === 'name-desc'"
                    class="h-4 w-4"
                  />
                  <ArrowUpDownIcon
                    v-else
                    class="h-4 w-4 opacity-50"
                  />
                </button>
              </TableHead>

              <!-- Cabeçalho do CPF -->
              <TableHead class="px-4 py-3 text-left text-sm font-medium text-gray-700">CPF</TableHead>

              <!-- Cabeçalho com ordenação por quantidade de usinas -->
              <TableHead class="px-4 py-3 text-left text-sm font-medium text-gray-700">
                <button
                  @click="togglePlantsSort"
                  class="flex items-center space-x-1 hover:text-indigo-600 transition-all"
                >
                  <span>Número de Usinas</span>
                  <ArrowUpIcon
                    v-if="selectedPlantsSort === 'plants-asc'"
                    class="h-4 w-4"
                  />
                  <ArrowDownIcon
                    v-else-if="selectedPlantsSort === 'plants-desc'"
                    class="h-4 w-4"
                  />
                  <ArrowUpDownIcon
                    v-else
                    class="h-4 w-4 opacity-50"
                  />
                </button>
              </TableHead>

              <!-- Cabeçalho da situação do relatório -->
              <TableHead class="px-4 py-3 text-left text-sm font-medium text-gray-700">Situação do Relatório</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="client in sortedAndFilteredClients"
              :key="client.id"
              class="hover:bg-gray-50 transition-all"
            >
              <TableCell class="px-4 py-3 text-sm text-gray-700 font-medium">
                {{ client.name }}
              </TableCell>
              <TableCell class="px-4 py-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <span v-if="!showCPF">•••••••••••</span>
                  <span v-else>{{ client.cpf }}</span>
                </div>
              </TableCell>
              <TableCell class="px-4 py-3 text-sm text-gray-700">
                {{ client.plants }}
              </TableCell>
              <TableCell class="px-4 py-3 text-sm text-gray-700">
                <Badge :variant="getStatusVariant(client.status)" class="px-2 py-1 rounded-full text-xs">
                  {{ client.status }}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EyeIcon, EyeOffIcon, ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from 'lucide-vue-next' // Ícones

// Dados fictícios dos clientes
const clients = [
  { id: 1, name: 'Cliente A', cpf: '123.456.789-00', plants: 5, status: 'Concluído' },
  { id: 2, name: 'Cliente B', cpf: '987.654.321-00', plants: 3, status: 'Pendente' },
  { id: 3, name: 'Cliente C', cpf: '456.789.123-00', plants: 8, status: 'Em Análise' },
  { id: 4, name: 'Cliente D', cpf: '321.654.987-00', plants: 2, status: 'Concluído' },
  { id: 5, name: 'Cliente E', cpf: '654.321.987-00', plants: 6, status: 'Pendente' },
]

// Estados para os filtros
const nameFilter = ref('') // Filtro por nome
const plantsMin = ref<number | null>(null) // Filtro mínimo de usinas
const plantsMax = ref<number | null>(null) // Filtro máximo de usinas
const selectedStatus = ref('all') // Filtro por situação

// Estados para as ordenações
const selectedNameSort = ref<'none' | 'name-asc' | 'name-desc'>('none') // Ordenação por nome
const selectedPlantsSort = ref<'none' | 'plants-asc' | 'plants-desc'>('none') // Ordenação por quantidade de usinas

// Estado para controlar a visibilidade do CPF
const showCPF = ref(false)

// Função para alternar a visibilidade do CPF
const toggleCPFVisibility = () => {
  showCPF.value = !showCPF.value
}

// Função para alternar a ordenação por nome
const toggleNameSort = () => {
  if (selectedNameSort.value === 'none') {
    selectedNameSort.value = 'name-asc'
  } else if (selectedNameSort.value === 'name-asc') {
    selectedNameSort.value = 'name-desc'
  } else {
    selectedNameSort.value = 'none'
  }
  selectedPlantsSort.value = 'none' // Desmarca a ordenação por usinas
}

// Função para alternar a ordenação por quantidade de usinas
const togglePlantsSort = () => {
  if (selectedPlantsSort.value === 'none') {
    selectedPlantsSort.value = 'plants-asc'
  } else if (selectedPlantsSort.value === 'plants-asc') {
    selectedPlantsSort.value = 'plants-desc'
  } else {
    selectedPlantsSort.value = 'none'
  }
  selectedNameSort.value = 'none' // Desmarca a ordenação por nome
}

// Função para filtrar os clientes com base nos filtros selecionados
const filteredClients = computed(() => {
  return clients.filter((client) => {
    const matchesName = client.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    const matchesPlants =
      (plantsMin.value === null || client.plants >= plantsMin.value) &&
      (plantsMax.value === null || client.plants <= plantsMax.value)
    const matchesStatus = selectedStatus.value === 'all' || client.status === selectedStatus.value
    return matchesName && matchesPlants && matchesStatus
  })
})

// Função para ordenar os clientes com base nas opções selecionadas
const sortedAndFilteredClients = computed(() => {
  let clientsToSort = [...filteredClients.value]

  // Ordenação por nome
  if (selectedNameSort.value !== 'none') {
    clientsToSort.sort((a, b) => {
      if (selectedNameSort.value === 'name-asc') {
        return a.name.localeCompare(b.name)
      } else if (selectedNameSort.value === 'name-desc') {
        return b.name.localeCompare(a.name)
      }
      return 0
    })
  }

  // Ordenação por quantidade de usinas
  if (selectedPlantsSort.value !== 'none') {
    clientsToSort.sort((a, b) => {
      if (selectedPlantsSort.value === 'plants-asc') {
        return a.plants - b.plants
      } else if (selectedPlantsSort.value === 'plants-desc') {
        return b.plants - a.plants
      }
      return 0
    })
  }

  return clientsToSort
})

// Função para definir o estilo do badge com base na situação do relatório
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Concluído':
      return 'default'
    case 'Pendente':
      return 'destructive'
    case 'Em Análise':
      return 'secondary'
    default:
      return 'outline'
  }
}
</script>

<style scoped>
/* Estilos personalizados para melhorar a aparência */
.shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.rounded-lg {
  border-radius: 0.5rem;
}
.transition-all {
  transition: all 0.2s ease-in-out;
}
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>