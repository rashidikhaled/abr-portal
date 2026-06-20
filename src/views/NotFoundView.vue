<template>
    <div class="nf">
        <h1>404</h1>
        <p>صفحه پیدا نشد</p>

        <router-link to="/auth">برگشت</router-link>
    </div>
</template>

<style scoped>
.nf {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    font-size: 70px;
}

a {
    margin-top: 10px;
    color: #2563eb;
}
</style>
