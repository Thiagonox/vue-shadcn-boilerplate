<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-icons/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { FieldArray, useForm } from "vee-validate";
import { h, ref } from "vue";
import * as z from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

import MainNav from "@/components/MainNav.vue";
import UserNav from "@/components/UserNav.vue";

// Schema de validação
const usinasFormSchema = toTypedSchema(
  z.object({
    usinas: z.array(
      z.object({
        nome: z.string().min(2, { message: "O nome da usina deve ter pelo menos 2 caracteres." }),
        identificador: z.string().min(1, { message: "O identificador da usina é obrigatório." }),
        dataInicioOperacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "A data deve estar no formato YYYY-MM-DD." }),
      })
    ),
  })
);

// Formulário
const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: usinasFormSchema,
  initialValues: {
    usinas: [],
  },
});

// Estado dos clientes e seleção
const clientes = ref([
  { 
    id: 1, 
    nome: "João da Silva Santos",
    cpf: "123.456.789-00",
    usinas: [
      { nome: "Usina A", identificador: "123", dataInicioOperacao: "2020-01-01" },
      { nome: "Usina B", identificador: "456", dataInicioOperacao: "2021-05-15" }
    ]
  },
  { 
    id: 2, 
    nome: "João da Silva Santos", // Nome duplicado
    cpf: "987.654.321-00", // CPF diferente
    usinas: [
      { nome: "Usina C", identificador: "789", dataInicioOperacao: "2019-03-10" }
    ]
  }
]);

const open = ref(false);
const selectedClienteId = ref<number | null>(null);
const selectedCliente = ref<{ 
  id: number, 
  nome: string,
  cpf: string,
  usinas: { 
    nome: string, 
    identificador: string, 
    dataInicioOperacao: string 
  }[] 
} | null>(null);

// Métodos
const selectCliente = (clienteId: number) => {
  const cliente = clientes.value.find(c => c.id === clienteId);
  if (cliente) {
    selectedCliente.value = cliente;
    selectedClienteId.value = clienteId;
    setValues({ usinas: cliente.usinas });
  }
};

const onSubmit = handleSubmit((values) => {
  toast({
    title: "Você enviou os seguintes valores:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
});

const addUsina = (push: (usina: { nome: string; identificador: string; dataInicioOperacao: string }) => void) => {
  push({ nome: "", identificador: "", dataInicioOperacao: "" });
};

const removeUsina = (remove: (index: number) => void, index: number) => {
  remove(index);
};
</script>

<template>
  <div class="hidden flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6 w-8/12 m-auto">
      <div>
        <h3 class="text-lg font-medium">Associar Usinas ao Cliente</h3>
        <p class="text-sm text-muted-foreground">
          Selecione um cliente para listar e gerenciar suas usinas.
        </p>
        
        <!-- Seletor de Cliente -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Selecione um Cliente</label>
          <Popover v-model:open="open">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-full justify-between mt-1"
              >
                {{ selectedCliente?.nome || 'Selecione um cliente...' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-full p-0">
              <Command>
                <CommandInput 
                  class="h-9" 
                  placeholder="Procurar cliente por nome ou CPF..." 
                />
                <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      v-for="cliente in clientes"
                      :key="cliente.id"
                      :value="cliente.id"
                      @select="(ev) => {
                        selectCliente(Number(ev.detail.value))
                        open = false
                      }"
                    >
                      <div class="flex flex-col">
                        <span>{{ cliente.nome }}</span>
                        <span class="text-xs text-muted-foreground">{{ cliente.cpf }}</span>
                      </div>
                      <Check
                        :class="cn(
                          'ml-auto h-4 w-4',
                          selectedClienteId === cliente.id ? 'opacity-100' : 'opacity-0'
                        )"
                      />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <!-- Detalhes do Cliente Selecionado -->
        <div v-if="selectedCliente" class="mt-4 p-4 bg-muted/50 rounded-lg">
          <h4 class="font-medium mb-2">Cliente Selecionado</h4>
          <dl class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <dt class="text-muted-foreground">Nome</dt>
              <dd>{{ selectedCliente.nome }}</dd>
            </div>
            <div>
              <dt class="text-muted-foreground">CPF</dt>
              <dd>{{ selectedCliente.cpf }}</dd>
            </div>
            <div class="col-span-2">
              <dt class="text-muted-foreground">Total de Usinas</dt>
              <dd>{{ selectedCliente.usinas.length }}</dd>
            </div>
          </dl>
        </div>
      </div>
      <Separator />

      <!-- Formulário de Usinas -->
      <form class="space-y-8" @submit="onSubmit" v-if="selectedCliente">
        <FieldArray name="usinas" v-slot="{ fields, push, remove }">
          <div v-for="(field, index) in fields" :key="field.key" class="space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="text-md font-medium">Usina {{ index + 1 }}</h4>
              <Button type="button" variant="ghost" @click="removeUsina(remove, index)">
                <Cross1Icon class="h-4 w-4" />
              </Button>
            </div>
            <FormField v-slot="{ componentField }" :name="`usinas[${index}].nome`">
              <FormItem>
                <FormLabel>Nome da Usina</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome da usina" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" :name="`usinas[${index}].identificador`">
              <FormItem>
                <FormLabel>Identificador da Usina</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Identificador da usina" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" :name="`usinas[${index}].dataInicioOperacao`">
              <FormItem>
                <FormLabel>Data de Início de Operação</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="YYYY-MM-DD" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Separator />
          </div>
          <Button type="button" variant="outline" @click="addUsina(push)">
            Adicionar Nova Usina
          </Button>
        </FieldArray>

        <div class="flex gap-2 justify-start">
          <Button type="submit"> Salvar </Button>
          <Button type="button" variant="outline" @click="resetForm"> Cancelar </Button>
        </div>
      </form>
    </div>
  </div>
</template>