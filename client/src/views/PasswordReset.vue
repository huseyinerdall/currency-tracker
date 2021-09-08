<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col class="mx-auto col-sm-10 col-xs-12 col-lg-5">
          <v-text-field
              color="white"
              type="email"
              dark
              label="E-posta"
              append-outer-icon="mdi-account"
              v-model="email"
          ></v-text-field>
          <v-btn block tile @click="sendPasswd" :loading="$store.state.isEmailSending">GEÇİCİ PAROLA GÖNDER</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="passwordChangeModal" max-width="500" style="background:red;">
      <v-container
          style="border: 1px solid #ddd;border-radius:0;position:relative;"
          :style="
          $store.state.isLight
            ? 'background-color:#f9f9f9;'
            : 'background-color:rgba(11,14,63,0.98);'
        "
          class="buyandsellmodal"
      >
        <div style="width: 50%;" class="mx-auto">
          <v-text-field
              type="password"
              dark
              v-model="pin"
              label="Geçici şifre"
          >
          </v-text-field>
          <v-text-field
              type="text"
              dark
              v-model="passwd1"
              label="Parola"
          >
          </v-text-field>
          <v-text-field
              type="password"
              dark
              v-model="passwd2"
              label="Parola onay"
          >
          </v-text-field>
          <v-btn
            @click="changePasswd"
            :loading="changing"
          >
            Parola Değiştir
          </v-btn>
        </div>
      </v-container>
    </v-dialog>
    <IsEmailSendingModal />
  </div>
</template>
<script>
import axios from "axios";
import IsEmailSendingModal from "@/components/common/EmailSending";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      passwordChangeModal: false,
      pin: '',
      passwd1: '',
      passwd2: '',
      changing: false
    };
  },
  components: {
    IsEmailSendingModal
  },
  created() {
    var keyInput = document.getElementById('key');
    let keyArr = []
    let key, keyLength, i;
    /*let showKey = document.getElementById('show-key')
    let keyDots = document.getElementById('key-dots')*/
    let dots = document.getElementsByClassName('dot')
    //let viewPass = false;

    function _updateKey()
    {
      keyArr = [];
      key = keyInput.val();
      keyLength = key.length;

      if( keyLength > 0 )
      {
        for(i = 0; i < keyLength; i++)
        {
          keyArr[i] = key[i];
        }
      }

      if( keyArr.length == 6 )
        dots.forEach((el)=>{
          el.classList.add('white');
        })
      else
        dots.forEach((el)=>{
          el.classList.remove('white');
        })
    }
    keyInput.on('keyup',_updateKey);
  },
  methods: {
    sendPasswd(){
      this.$store.commit('isEmailSending',true);
      if(this.email == ''){
        this.$toasted.error(`Alan boş bırakılamaz!`,{fullWidth:true,icon:'error',duration:2000});
      }
      axios
          .post(`${this.$store.state.api}/sendpasswd`, {
            email: this.email
          })
          .then(response => {
            if(response.data == 'GOOGLEUSER'){
              this.$toasted.error('Google ile giriş yapanlar parola değiştiremez!',{fullWidth:true,icon:'error',duration:2000});
              this.$store.commit('isEmailSending',false)
              return;
            }
            if(response.data == 'THEREISNOUSER'){
              this.$toasted.error('Böyle bir kullanıcı yok!',{fullWidth:true,icon:'error',duration:2000});
              this.$store.commit('isEmailSending',false)
              return;
            }
            if(response.data == 'MAILOK'){
              this.$store.commit('isEmailSending',false)
              this.$toasted.success(`Mail adresinize geçici parola gönderildi.`,{fullWidth:true,icon:'success',duration:2000});
              this.passwordChangeModal = true;
            }
            this.passwordChangeModal = true;
          })
          .catch(err => {
            this.$toasted.error(err,{fullWidth:true,icon:'error',duration:2000})
            this.passwordChangeModal = true;
            this.$store.commit('isEmailSending',false)
          });
    },
    resetFields(){
      this.pin = '';
      this.passwd1 = '';
      this.passwd2 = '';
      this.changing = false;
    },
    changePasswd(){
      this.changing = true;
      if(this.pin == '' || this.passwd1 == '' || this.passwd2 == ''){
        this.$toasted.error('Alanlar boş bırakılamaz!',{fullWidth:true,icon:'error',duration:2000});
        return;
      }
      axios
          .post(`${this.$store.state.api}/changepasswd`, {
            pin: this.pin,
            passwd1: this.passwd1,
            passwd2: this.passwd2,
            email: this.email
          })
          .then(response => {
            if(response.data == 'PINERROR'){
              this.$toasted.error('Geçici şifre hatalı!',{fullWidth:true,icon:'error',duration:2000});
              this.resetFields();
              return;
            }
            if(response.data == 'SHORT'){
              this.$toasted.error('En az 8 karakter veya rakam gerekli!',{fullWidth:true,icon:'error',duration:2000});
              this.resetFields();
              return;
            }
            if(response.data == 'NOTSAME'){
              this.$toasted.error('Parolalar uyuşmuyor!',{fullWidth:true,icon:'error',duration:2000});
              this.resetFields();
              return;
            }
            if(response.data == 'CHANGE'){
              this.$store.commit('isEmailSending',false)
              this.$toasted.success(`Parolanız başarılı bir şekilde değiştirildi.`,{fullWidth:true,icon:'check',duration:2000});
              this.resetFields();
              this.passwordChangeModal = false;
              this.$router.push({name:'Login'})
            }
          })
          .catch(err => {
            this.$toasted.error(err,{fullWidth:true,icon:'error',duration:2000});
          });
    }
  }
};
</script>
<style>
#cover
{
  position: relative;
  height: 80px;
  background-color: #25bf2b;
  border-radius: 120px;
  box-shadow: 0 10px 40px #208a23;
  overflow: hidden;
}

#key-icon, #key-cover, #key-dots, #show-key
{
  position: absolute;
  top: 0;
  bottom: 0;
}

#key-icon
{
  display: block;
  left: 0;
  width: 23px;
  height: 26px;
  color: #fff;
  font-size: 26px;
  text-align: center;
  line-height: 1;
  padding: 27px 28.63px;
}

#key-cover, #key-dots
{
  left: 80px;
  right: 80px;
}

#key-cover
{
  z-index: 2;
}

#key
{
  position: relative;
  display: block;
  left: 6px;
  top: 1px;
  height: 80px;
  font-size: 80px;
  color: #fff;
  padding: 0;
  border: 0;
  line-height: 1;
  letter-spacing: 12px;
  background-color: transparent;
}

#key-dots
{
  overflow: hidden;
  z-index: 1;
}

#dots
{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 20px;
  height: 80px;
}

#key, #dots
{
  width: 160px;
  margin: 0 auto;
}

.dot
{
  position: relative;
  top: 50%;
  width: 20px;
  height: 20px;
  float: left;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  line-height: 1.7;
  margin-right: 20px;
  margin-top: -10px;
  background-color:#1b841f;
  border-radius: 50%;
  transform: scale(1);
  transition: 0.2s ease transform;
  overflow: hidden;
}

.dot:last-child
{
  margin-right: 0;
}

.dot span
{
  display: block;
  opacity: 0;
  transition: 0.4s ease opacity;
}

#key-dots.active
{
  z-index: 3;
}

#key-dots.active .dot
{
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  font-family: Nunito, Arial, Helvetica, sans-serif;
  text-align: center;
  background-color: #1b841f;
  transform: scale(1.7);
}

#key-dots .dot.white
{
  color: #1b841f;
  background-color: #fff;
}

#key-dots .dot.white span.show
{
  opacity: 1;
}

#show-key
{
  right: 0;
}

#show-key i.fas
{
  display: block;
  width: 26px;
  height: 27px;
  color: #fff;
  font-size: 23px;
  padding: 28.5px 27.07px;
}
</style>
