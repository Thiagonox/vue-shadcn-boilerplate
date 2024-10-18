<template>
    <div class="border-2 border-colors-black rounded-lg mt-8 flex items-center justify-center">
        <p class="font-space-grotesk text-4xl text-colors-primary p-10">{{ currentTime }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentTime: new Date().toLocaleTimeString()
        }
    },
    mounted() {
        // Atualiza a cada segundo
        this.interval = setInterval(() => {
            this.currentTime = new Date().toLocaleTimeString()
        }, 1000)
    },
    beforeDestroy() {
        // Limpa o intervalo quando o componente for destruído
        clearInterval(this.interval)
    }
}
</script>
