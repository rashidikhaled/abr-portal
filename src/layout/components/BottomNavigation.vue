<template>
  <nav class="bottom-nav">
    <RouterLink to="/">خانه</RouterLink>
    <RouterLink to="/insurance">بیمه</RouterLink>
    <RouterLink to="/profile">پروفایل</RouterLink>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;

  background: white;
  border-top: 1px solid #eee;

  display: flex;
  justify-content: space-around;
  align-items: center;

  z-index: 1000;
}
</style>
