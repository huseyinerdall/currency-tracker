<template>
  <div class="login">
    <v-container >
      <v-row>
        <v-col class="mx-auto col-sm-10 col-xs-12 col-lg-5" >
          <v-text-field
              color="white"
              dark
              label="E-posta"
              append-outer-icon="mdi-account"
              v-model="email"
          ></v-text-field>
          <v-text-field
              type="password"
              color="white"
              dark
              label="Parola"
              append-outer-icon="mdi-key-variant"
              v-model="password"
          ></v-text-field>
          <v-row>
            <v-col cols="4">
              <v-btn
                  color="blue-grey"
                  class="white--text"
                  @click="login"
                  small
              >
                GİRİŞ
                <v-icon
                    right
                    dark
                >
                  mdi-login
                </v-icon>
              </v-btn>

            </v-col>
            <v-col cols="4">
              <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
            </v-col>
            <v-col cols="4">
              <v-btn
                  color="blue-grey"
                  class="white--text"
                  href="/register"
                  small
              >
                KAYDOL
                <v-icon
                    right
                    dark
                >
                  mdi-login
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
    import axios from "axios";
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                show1: false,
                client_id: "948525970652-fuuplq2bgdd7q24kvetlet4il9b66p1g.apps.googleusercontent.com"
            }
        },
        methods: {
            login() {
              if (!this.email && !this.password){
                alert("Alanlar boş bırakılamaz!");
                return;
              }
                axios.post(`${this.$store.state.api}/login`, {
                        email: this.email,
                        passwd: this.password
                    })
                    .then((response) => {
                        if(response.data == "ERROR") {
                          alert("Kullanıcı bulunamadı");
                          return;
                        }else{
                          localStorage.setItem('user', JSON.stringify(response.data.user))
                          localStorage.setItem('wallet', JSON.stringify(JSON.parse(localStorage.getItem('user')).wallet))
                          localStorage.setItem('jwt', response.data.token)
                        }


                        if (localStorage.getItem('jwt') != null) {
                            this.$emit('loggedIn')
                            if (this.$route.params.nextUrl != null) {
                                this.$router.push(this.$route.params.nextUrl)
                            } else {
                                this.$router.push({
                                    name: 'Home'
                                })
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    };
</script>
<style scoped>
</style>