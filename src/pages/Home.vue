<template>
    <Header />
    <main class="px-8">
        <UserGreeting />
        <CurrentTime />
        <CurrentPoints />
        <div class="flex justify-between mb-12">
            <Registers />
            <Configs />
        </div>
        <RegisterButton />
    </main>
</template>

<script>
import Header from '@/components/Header.vue'
import UserGreeting from '@/components/UserGreeting.vue'
import CurrentTime from '@/components/CurrentTime.vue'
import CurrentPoints from '@/components/CurrentPoints.vue'
import Registers from '@/components/Registers.vue';
import Configs from '@/components/Configs.vue';
import RegisterButton from '@/components/RegisterButton.vue';

export default {
    components: {
        Header,
        UserGreeting,
        CurrentTime,
        CurrentPoints,
        Registers,
        Configs,
        RegisterButton
    }
}
</script>
