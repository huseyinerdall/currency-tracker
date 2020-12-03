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
          <v-btn
              color="blue-grey"
              class="white--text mx-auto"
              @click="login"
          >
            GİRİŞ
            <v-icon
                right
                dark
            >
              mdi-login
            </v-icon>
          </v-btn>
          <v-btn
              style="background:#de5246;"
              class="white--text float-right"
          >
            Google
            <v-icon
                right
                dark
            >
              mdi-google
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        components: {},
        data() {
            return {
                email: '',
                password: '',
                show1: false,
            }
        },
        methods: {
            login() {
                axios.post(`http://${this.$store.state.addr}:${this.$store.state.port}/login`, {
                        email: this.email,
                        passwd: this.password
                    })
                    .then((response) => {
                        if(response.data == "ERROR"){
                          alert("Kullanıcı bulunamadı");
                          return;
                        }
                        localStorage.setItem('user', JSON.stringify(response.data.user))
                        localStorage.setItem('jwt', response.data.token)

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
                        console.log(err.response);
                    })
            }
        }
    };
</script>
<style scoped>

</style>