<template>
  <div id="profile">
    <v-container>
      <v-row>
        <v-col class="d-flex flex-column col-md-6 col-12">
          <div style="height: 200px;">
            <v-avatar size="180" color="red" rounded>
              <img
                  v-if="userinfo.profileImage"
                  :src="userinfo.profileImage"
                  alt="avatar"
              />
              <span v-else class="white&#45;&#45;text headline">{{
                  userinfo.fullName | nameAvatar
                }}</span>
            </v-avatar>
          </div>
          <div>
            <v-card color="transparent">
              <div class="userwalletbargraph">
                <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
              </div>
            </v-card>
          </div>
        </v-col>
        <v-col class="d-flex flex-column col-md-6 col-12">
          <div style="height: 220px">
            <table style="color:#fff;font-size:12px;" class="userinfos">
              <tr
                  style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);"
              >
                <td style="font-weight: 600;width:100px;">Kullanıcı Adı</td>
                <td>
                  <v-text-field
                    :value="userinfo.fullName"
                    v-model="fullName"
                    :readonly="userNameEditable"
                    dark
                    :append-outer-icon="usernametaken ? 'mdi-times-circle' : icon"
                    class="pa-0 mt-0"
                    style="font-size: 12px;"
                    @input="isUserNameTaken"
                    :error-messages="usernametaken ? 'Kullanıcı adı çoktan alınmış' : ''"
                    @click:append-outer="changeUsername($event)"
                  ></v-text-field>
                </td>
              </tr>
              <tr
                  style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);"
              >
                <td style="font-weight: 600;width:100px;">ID</td>
                <td>
                  <v-text-field
                      :value="userinfo.id"
                      disabled
                      dark
                      hide-details
                      class="pa-0 mt-0"
                      style="font-size: 12px;"
                  ></v-text-field>
                </td>
              </tr>
              <tr
                  style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);"
              >
                <td style="font-weight: 600;width:100px;">Eposta</td>
                <td>
                  <v-text-field
                      :value="userinfo.email"
                      disabled
                      dark
                      hide-details
                      class="pa-0 mt-0"
                      style="font-size: 12px;"
                  ></v-text-field>
                </td>
              </tr>
              <tr
                  style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);padding-top: 6px;"
              >
                <td style="font-weight: 600;width:100px;">Üyelik tarihi</td>
                <td>
                  <v-text-field
                      :value="userinfo.createdAt | dateStandartFormat"
                      disabled
                      dark
                      hide-details
                      class="pa-0 mt-0"
                      style="font-size: 12px;"
                  ></v-text-field></td>
              </tr>
            </table>
          </div>
          <div>4</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
import shortToName from "@/assets/short-to-name.json";
import shortNames from "@/assets/shortname-convert";
import _ from "lodash";
let options = {
  type: "success",
  icon: "check",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "green accent-3 text-center",
  className: "text-center"
};
export default {
  name: "Profile",
  data(app) {
    return {
      selectedFile: null,
      isSelecting: false,
      file: "",
      userNameEditable: true,
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
        }
      },
      allPrices: JSON.parse(localStorage.getItem("allprices")),
      shortNames: shortNames,
      usernametaken: false,
      fullName: app.$store.state.userinfo.fullName,
      icon: 'mdi-pencil-circle'
    };
  },
  computed: mapState({
    userinfo: state => state.userinfo,
  }),
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        {
          once: true
        }
      );
      this.$refs.file.click();
    },
    onFileChanged() {
      this.file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(`${this.$store.state.api}/avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    isUserNameTaken: _.debounce(function(v) {
      axios
          .post(`${this.$store.state.api}/isusernametaken`, {
            desired: v
          })
          .then(res =>{
            this.usernametaken = res.data;
          })
    }, 400),
    changeUsername(e){
      if(e.target.classList.contains('mdi-pencil-circle')){
        this.userNameEditable = !this.userNameEditable;
        this.icon = 'mdi-check-circle';
      }else if(e.target.classList.contains('mdi-check-circle')){
        this.icon = 'mdi-loading spin';
        this.userNameEditable = true;
        axios
            .post(`${this.$store.state.api}/changeusername`, {
              desired: this.fullName,
              userId: this.$store.state.userinfo.id
            })
            .then(res =>{
              let temp = this.$store.state.userinfo;
              temp['fullName'] = this.fullName
              localStorage.setItem('user',JSON.stringify(temp));
              this.$store.commit('userinfo');
              if(res.data == "CHANGE") {
                setTimeout(() => {
                  this.$toasted.show(`Kullanıcı adınız başarılı bir şekilde diğiştirildi.`, options);
                  this.icon = 'mdi-pencil-circle';
                }, 1200)
              }
            })
      }
    },
    save() {}
  },
  created() {
    console.log(this.$store.state.userinfo.wallet);
    let temp = Object.values(this.$store.state.userinfo.wallet).filter((current)=>{
      return current.amount > 0;
    });
    let series = [];
    let label = [];
    this.series = [];
    this.chartOptions.labels = [];
    for (let i = 0; i < temp.length; i++) {
      series.push(temp[i].amount*(this.allPrices[temp[i].shortName] || this.allPrices[shortToName[temp[i].shortName]]));
      try{
        label.push(temp[i].shortName.toUpperCase().replaceAll('-',' '));
      }catch (e){
        label.push(temp[i].shortName.toUpperCase());
      }
    }
    this.series = [{
      data: series
    }];
    this.chartOptions = {
      chart: {
        type: 'bar',
            height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
              horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: label,
      }
    }
  }
};
</script>
<style>
.userinfos .v-text-field input{
  padding: 0 !important;
}
.userinfos .v-input__append-outer, .v-input__prepend-outer{
  margin-top: 0 !important;
}
.userwalletbargraph .apexcharts-text{
  color: #fff !important;
  fill: #fff !important;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
.spin {
  animation-name: spin;
  animation-duration: 400ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
