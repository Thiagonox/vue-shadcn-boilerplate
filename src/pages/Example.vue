<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { Cross1Icon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { FieldArray, useForm } from 'vee-validate'
import { h, ref } from 'vue'
import * as z from 'zod'

import MainNav from '@/components/MainNav.vue'
import UserNav from '@/components/UserNav.vue'

const verifiedEmails = ref(['m@example.com', 'm@google.com', 'm@support.com'])

const profileFormSchema = toTypedSchema(z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160, { message: 'Bio must not be longer than 160 characters.' }).min(4, { message: 'Bio must be at least 2 characters.' }),
  cpfCnpj: z.string().min(11, { message: 'CPF/CNPJ must be at least 11 characters.' }).max(14, { message: 'CPF/CNPJ must not be longer than 14 characters.' }),
  address: z.object({
    cep: z.string().min(8, { message: 'CEP must be at least 8 characters.' }),
    logradouro: z.string().min(2, { message: 'Logradouro must be at least 2 characters.' }),
    numero: z.string().min(1, { message: 'Number is required.' }),
    complemento: z.string().optional(),
    bairro: z.string().min(2, { message: 'Bairro must be at least 2 characters.' }),
    cidade: z.string().min(2, { message: 'Cidade must be at least 2 characters.' }),
    estado: z.string().min(2, { message: 'Estado must be at least 2 characters.' }),
    pais: z.string().default('Brasil'),
    referencia: z.string().optional(),
  }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 characters.' }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    bio: 'I own a computer.',
    urls: [
      { value: 'https://shadcn.com' },
      { value: 'http://twitter.com/shadcn' },
    ],
    address: {
      pais: 'Brasil',
    },
  },
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
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
        <h3 class="text-lg font-medium">
          Cadastro de Cliente
        </h3>
        <p class="text-sm text-muted-foreground">
          Por favor, preencha os campos abaixo para cadastrar um novo cliente na plataforma.
        </p>
      </div>
      <Separator />
      <form class="space-y-8" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Nome / Razão Social do cliente</FormLabel>
            <FormControl>
              <Input type="text" placeholder="João da Silva" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              Nome completo ou razão social do cliente.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="cpfCnpj">
          <FormItem>
            <FormLabel>CPF/CNPJ</FormLabel>
            <FormControl>
              <Input type="text" placeholder="000.000.000-00" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Separator />

        <div>
          <h3 class="text-lg font-medium">
            Endereço
          </h3>
          <p class="text-sm text-muted-foreground">
            Por favor, preencha os campos abaixo com o endereço completo do cliente.
          </p>
        </div>

        <!-- CEP, Logradouro e Número na mesma linha -->
        <div class="grid grid-cols-3 gap-4">
          <FormField v-slot="{ componentField }" name="address.cep">
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input type="text" placeholder="00000-000" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="address.logradouro">
            <FormItem>
              <FormLabel>Logradouro</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Rua das Flores" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="address.numero">
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input type="text" placeholder="123" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Complemento e Bairro na mesma linha -->
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="address.complemento">
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Apartamento 101, Bloco B" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="address.bairro">
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Centro" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Cidade e Estado na mesma linha -->
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="address.cidade">
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input type="text" placeholder="São Paulo" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="address.estado">
            <FormItem>
              <FormLabel>Estado (UF)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="SP" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- País e Referência na mesma linha -->
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="address.pais">
            <FormItem>
              <FormLabel>País</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Brasil" v-bind="componentField" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="address.referencia">
            <FormItem>
              <FormLabel>Ponto de Referência</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Próximo ao shopping" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Separator />

        <!-- Telefone e Email na mesma linha -->
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Telefone de contato</FormLabel>
              <FormControl>
                <Input type="text" placeholder="(00) 00000-0000" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email do cliente</FormLabel>
              <FormControl>
                <Input type="text" placeholder="exemplo@gmail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="flex gap-2 justify-start">
          <Button type="submit">
            Salvar
          </Button>

          <Button
            type="button"
            variant="outline"
            @click="resetForm"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>