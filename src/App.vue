<template>
  <div class="window">
    <div class="app-header">
        <div class="logo">
            <div class="logo-text" id="logo-text-top">ММИС</div>
            <div class="logo-text" id="logo-text-bottom">ЛАБОРОТОРИЯ</div>
        </div>
        <div class="nav">
            <router-link to="/">Главная</router-link>
            <router-link v-if="uuid == null" to="/auth">Вход</router-link>
            <router-link v-if="uuid == null" to="/reg">Регистрация</router-link>
            <router-link v-if="uuid != null" to="/mess">Сообщения</router-link>
            <a v-if="uuid != null" v-on:click="clearMemberData()">Выход</a>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uuid:localStorage.getItem('uuid')
    }
  },
  methods:{
    clearMemberData: () => {
      localStorage.clear();
      window.location.reload();
      window.location.replace("/");
    }
  }
}
</script>

<style>
.window {
  display:flex;
}

.app-header {
    display:inline-block;
    padding-left: 4vh;
    padding-top: 4vh;
}

.logo {
  display: block;
  justify-content: center;
}

.logo-text {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}

#logo-text-top {
  font-size: 6em;
  width: 3em;
}

#logo-text-bottom {
  background-color: #5cb85c;
  border-radius: 10px;
  padding: 5px;
  color: white;
  font-size: 3em;
  width: 7.5em;
  padding-left: 2vh;
  padding-right: 2vh;
}

.nav {
  display: grid;
  justify-content: center;
}

.nav a {
  text-decoration: none;
  padding-left: 50px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 2em;
  margin: 1em;
  color: aliceblue;
  background-color: #53a753;
  border-radius: 1em;
  padding-right: 1em;
  transition: color 0.3s linear;
  white-space: nowrap;
}

.nav a:hover {
    color: rgb(251, 255, 0);
}
</style>
