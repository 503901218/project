<template>
  <!-- <img class="logo" alt="Vue logo" src="./assets/logo.png">
  <HelloWorld :msg="msg"/>
  <div class="btn">
    <el-button type="primary" @click="startHacking">
      Get Started
    </el-button>
   
  </div> -->
  <div>
    <tran/>
  </div> 
</template>

<script>
import { ref } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import tran from './view/muen/transif'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    tran
  },
  setup() {
    const msg = ref("Welcome to Element Plus, a Vue 3.0 based component library")
    const startHacking = () => {
      msg.value = "Start coding with Element Plus with 💖"
    }
    return {
      msg,
      startHacking
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.logo {
  width: 50%;
}
.btn {
  margin-top: 100px;
}
</style>
