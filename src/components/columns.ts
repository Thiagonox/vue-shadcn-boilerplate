import type { ColumnDef } from '@tanstack/vue-table'
import type { Company } from '../data/schema' // Atualize o tipo para representar as empresas
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { h, ref } from 'vue'
import { labels, priorities, statuses } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'

// Estado para armazenar os dados das empresas
const companies = ref<Company[]>([]);

// Função para buscar os dados das empresas
async function fetchCompanies() {
  const response = await fetch('https://scraping-cnpjs.onrender.com/empresas', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }

  return await response.json();
}

// Use a função fetchCompanies para obter os dados e popular a tabela
fetchCompanies()
  .then(data => {
    companies.value = data; // Armazena os dados no estado local
  })
  .catch(error => {
    console.error(error);
  });

// Definição das colunas para a tabela
export const columns: ColumnDef<Company>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 
      'checked': row.getIsSelected(), 
      'onUpdate:checked': value => row.toggleSelected(!!value), 
      'ariaLabel': 'Select row', 
      'class': 'translate-y-0.5' 
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'cnpj',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'CNPJ' }),
    cell: ({ row }) => h('div', { class: 'max-w-[200px] truncate font-medium' }, row.getValue('cnpj')),
  },
  {
    accessorKey: 'nome_fantasia',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Nome Fantasia' }),
    cell: ({ row }) => h('div', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('nome_fantasia')),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'E-mail' }),
    cell: ({ row }) => h('div', { class: 'max-w-[300px] truncate' }, row.getValue('email')),
  },
  {
    accessorKey: 'telefone', // Nova coluna para telefone
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Telefone' }),
    cell: ({ row }) => h('div', { class: 'max-w-[200px] truncate' }, row.getValue('telefone')),
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];