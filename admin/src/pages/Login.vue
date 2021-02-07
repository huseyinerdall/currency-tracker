<template>
  <div class="full-screen">
    <b-card style="width:400px;margin:0 auto;">
        <b-card-title class="text-center">para.guru</b-card-title>
        <b-form-group
          label-for="username"
          label="username"
        >
          <b-form-input v-model="username" @keyup.enter="login"></b-form-input>
        </b-form-group>

        <b-form-group
          label-for="pwd"
          label="password"
        >
          <b-form-input v-model="pwd" type="password" @keyup.enter="login"></b-form-input>
        </b-form-group>
        <b-btn block @click="login">Giriş</b-btn>
    </b-card>
  </div>
</template>

<script>
export default {

  data() {
    return {
      username:'',
      pwd:''
    }
  },
  methods: {
    login(){
      if(this.username && this.pwd){
        if(this.username == 'admin' && this.pwd == 'Qazxsw21.'){
          localStorage.setItem('admin',1);
          this.$router.push({name:'dashboard'});
        }else{
          alert("Kullanıcı adı ya da parola yanlış!");
        }
      }else{
        alert("Lütfen boş alanları doldurun!");
        return;
      }
    }
  }
};
</script>

<style scoped>
.main-panel > .content {
  padding-left: 0 !important;
}
</style>
