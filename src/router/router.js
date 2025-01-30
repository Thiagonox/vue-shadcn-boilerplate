import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import path from 'path';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cadastrar-cliente',
    name: 'CadastrarCliente',
    component: () => import('@/pages/Example.vue'),
  },
  {
    path: '/cadastrar-usina',
    name: 'CadastrarUsina',
    component: () => import('@/pages/CadastroUsina.vue'),
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
