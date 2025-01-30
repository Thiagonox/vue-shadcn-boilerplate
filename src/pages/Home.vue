<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DateRangePicker from '@/components/DateRangePicker.vue'
import MainNav from '@/components/MainNav.vue'
import Search from '@/components/Search.vue'
import UserNav from '@/components/UserNav.vue'
import OverviewTab from '@/components/OverviewTab.vue'
import ReportsTab from '@/components/ReportsTab.vue'
import AnalyticsTab from '@/components/AnalyticsTab.vue'
</script>

<template>
  <div class="md:hidden">
    <VPImage
      alt="Dashboard"
      width="1280"
      height="1214"
      class="block"
      :image="{
        dark: '/examples/dashboard-dark.png',
        light: '/examples/dashboard-light.png',
      }"
    />
  </div>

  <div class="hidden flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div class="flex items-center space-x-2">
          <DateRangePicker />
          <Button>Consultar</Button>
        </div>
      </div>
      <Tabs default-value="overview" class="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Lista de Relatorios</TabsTrigger>
          <TabsTrigger value="reports">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" class="space-y-4">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="analytics" class="space-y-4">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="reports" class="space-y-4">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>