<template>
    <div>
        <h1 class="font-space-grotesk text-4xl">
            Olá, {{ name }}!
        </h1>
        <p class="font-plus-jakarta font-bold mt-4">{{ currentDate }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'Thiago', // Substitua isso com o valor que desejar ou passe como prop
            currentDate: this.formatDate(new Date())
        }
    },
    methods: {
        formatDate(date) {
            const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
            const months = [
                'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
            ]
            const dayName = days[date.getDay()]
            const day = date.getDate()
            const monthName = months[date.getMonth()]
            const year = date.getFullYear()

            return `${dayName}, ${day} de ${monthName} de ${year}`
        }
    }
}
</script>
