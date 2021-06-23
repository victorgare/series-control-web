<template>
    <div>
        {{ error }}
        <h1 v-if="error.statusCode === 404">Página não encontrada</h1>
        <h1 v-else>Aconteceu um erro</h1>
        <NuxtLink to="/">Inicio</NuxtLink>
    </div>
</template>

<script>
export default {
    layout: 'error',
    props: ['error'], // you can set a custom layout for the error page
}
</script>
