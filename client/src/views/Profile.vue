<template>
  <div id="app">
        <v-flex xs12 sm12 mt-5>
          <v-card transparent style="background:rgba(0,0,0,.3);color:#ffffff;">
            <v-container text-xs-center>
              <v-avatar
                  size="100"
                  color="red"
              >
                <img v-if="userInfo.profileImage" :src="'http://'+$store.state.addr+':'+$store.state.port+'/uploads/'+userInfo.profileImage" alt="avatar">
                <span v-else class="white--text headline">{{userInfo.fullName | nameAvatar}}</span>
              </v-avatar>
              <v-btn
                  color="primary"
                  class="text-none ml-6"
                  rounded
                  depressed
                  :loading="isSelecting"
                  @click="onButtonClick"
              >
                <v-icon left>
                  mdi-camera
                </v-icon>
                {{ buttonText }}
              </v-btn>
              <input
                  ref="file"
                  class="d-none"
                  type="file"
                  id="file"
                  accept="image/*"
                  @change="onFileChanged"
              >
            </v-container>

            <v-card-title primary-title>
              <h3 class="headline mb-0">{{userInfo.fullName}}</h3>
            </v-card-title>


            <v-card-text color="white" class="white--text">

              <table>
                <tr style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);">
                  <td style="font-weight: 600;width:120px;">ID</td>
                  <td>: {{userInfo.id}}</td>
                </tr>
                <tr style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);">
                  <td style="font-weight: 600;width:120px;">Eposta</td>
                  <td>: {{userInfo.email}}</td>
                </tr>
                <tr style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);">
                  <td style="font-weight: 600;width:120px;">Üyelik tarihi</td>
                  <td>: {{userInfo.createdAt | dateStandartFormat}}</td>
                </tr>
                <tr style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);">
                  <td style="font-weight: 600;width:120px;">Parola(Şifreli)</td>
                  <td>: {{userInfo.passwd}}</td>
                </tr>
              </table>
            </v-card-text>
            <v-btn @click="save">KAYDET</v-btn>
          </v-card>
        </v-flex>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Profile",
        data() {
            return {
                selectedFile: null,
                isSelecting: false,
                file: '',
            }
        },
        computed: {
            userInfo() {
                return JSON.parse(localStorage.getItem('user'));
            },
            defaultButtonText() {
                let a = this.userInfo.profileImage == '' ? 'Görsel Yükle' : 'Görsel Değiştir';
                return (a);
            },
            buttonText() {
                return this.selectedFile ? this.selectedFile.name : this.defaultButtonText;
            }
        },
        methods: {
            onButtonClick() {
                this.isSelecting = true
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {
                    once: true
                })

                this.$refs.file.click()
            },
            onFileChanged() {
                this.file = this.$refs.file.files[0];
                const formData = new FormData();
                formData.append('file', this.file);
                axios.post(`${this.$store.state.api}/avatar`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    console.log(res)

                })
            },
            save() {

            }
        }
    };
</script>