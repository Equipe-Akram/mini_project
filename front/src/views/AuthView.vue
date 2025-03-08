<template>
  <div class="auth-container">
    <h2>Bienvenue sur l'authentification</h2>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.auth-container {
  text-align: center;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.auth-container a {
  text-decoration: none;
  color: #007bff;
}

.auth-container a:hover {
  text-decoration: underline;
}
</style>