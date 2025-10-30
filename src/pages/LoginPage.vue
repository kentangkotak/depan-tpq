<template>
  <q-page class="flex flex-center bg-login">
    <!-- 🌌 Elemen Partikel -->
    <div class="floating-bg">
      <div v-for="n in 40" :key="n" class="particle"></div>
    </div>

    <!-- 💎 Card Login -->
    <q-card class="q-pa-lg shadow-10 text-white login-card">
      <div class="text-center q-mb-md">
        <q-icon name="fingerprint" size="50px" color="white" class="floating-icon" />
        <div class="text-h6 q-mt-sm fade-in">Selamat Datang di <br />TPQ حُبُّ الْوَطَنِ</div>
      </div>

      <q-form @submit.prevent="onSubmit" class="fade-up">
        <q-input
          filled
          dark
          v-model="username"
          label="Email Address"
          class="q-mb-md"
          color="white"
          bg-color="rgba(255,255,255,0.1)"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input
          filled
          dark
          v-model="password"
          label="Password"
          :type="showPwd ? 'text' : 'password'"
          class="q-mb-lg"
          color="white"
          bg-color="rgba(255,255,255,0.1)"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>

        <q-btn
          label="Sign In"
          type="submit"
          color="white"
          text-color="primary"
          unelevated
          rounded
          class="full-width q-mb-sm glow-btn"
          :loading="loading"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
// import router from 'src/router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const username = ref('')
const password = ref('')
const showPwd = ref(false)
const loading = ref(false)
const router = useRouter()

async function onSubmit() {
  loading.value = true

  try {
    // const response = await axios.post('http://localhost:8000/api/login', {
    //   username: username.value,
    //   password: pass.value,
    // })
    const response = await api.post('/login', {
      username: username.value,
      password: password.value,
    })

    // ✅ misal API mengembalikan token
    const token = response.data.token
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('menus', JSON.stringify(response.data.menu))

    $q.notify({
      type: 'positive',
      message: 'Login berhasil!',
    })

    router.push('/')
    console.log('response', response)
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Username atau password salah',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 🌆 Background gradasi + gerakan lembut */
.bg-login {
  background: radial-gradient(circle at 30% 30%, #1e3c72, #2a5298 80%);
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}

/* 💫 Partikel terbang */
.floating-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 5px;
  height: 5px;
  animation: fly 10s linear infinite;
  opacity: 0.8;
}

/* random posisi awal partikel */
.particle:nth-child(odd) {
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.4);
}
.particle:nth-child(3n) {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.9);
}

/* Gerakan partikel */
@keyframes fly {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(-10vh) translateX(20vw);
    opacity: 0;
  }
}

/* Variasi waktu tiap partikel */
.particle:nth-child(1) {
  left: 5%;
  animation-delay: 0s;
  animation-duration: 12s;
}
.particle:nth-child(2) {
  left: 15%;
  animation-delay: 2s;
  animation-duration: 14s;
}
.particle:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
  animation-duration: 10s;
}
.particle:nth-child(4) {
  left: 35%;
  animation-delay: 1s;
  animation-duration: 16s;
}
.particle:nth-child(5) {
  left: 45%;
  animation-delay: 3s;
  animation-duration: 13s;
}
.particle:nth-child(6) {
  left: 55%;
  animation-delay: 5s;
  animation-duration: 15s;
}
.particle:nth-child(7) {
  left: 65%;
  animation-delay: 6s;
  animation-duration: 12s;
}
.particle:nth-child(8) {
  left: 75%;
  animation-delay: 7s;
  animation-duration: 18s;
}
.particle:nth-child(9) {
  left: 85%;
  animation-delay: 2s;
  animation-duration: 11s;
}
.particle:nth-child(10) {
  left: 95%;
  animation-delay: 8s;
  animation-duration: 19s;
}

/* 💎 Card transparan kaca */
.login-card {
  width: 380px;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  animation: slideIn 1.2s ease-out;
  z-index: 1;
}

/* ✨ Tombol bercahaya */
.glow-btn {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: 0.3s;
}
.glow-btn:hover {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
  transform: scale(1.03);
}

/* 💨 Card animasi masuk */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 🪶 Ikon fingerprint melayang */
.floating-icon {
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Fade animasi */
.fade-in {
  animation: fadeIn 1.5s ease forwards;
}
.fade-up {
  animation: fadeUp 1.8s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
