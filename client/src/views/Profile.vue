<template>
  <div id="profile">
    <v-container>
      <UserGeneralSituation :situation="[balanceNow, avaibleTRY, 0]" />
      <v-row>
        <v-col class="d-flex flex-column col-md-4 col-12">
          <div
            style="height: 200px;"
            class="d-flex flex-row align-center pl-lg-8"
          >
            <v-avatar size="180" rounded>
              <img
                v-if="userinfo.profileImage"
                :src="
                  $store.state.userinfo.profileImage.indexOf('http') > -1
                    ? $store.state.userinfo.profileImage
                    : $store.state.api +
                      '/uploads/' +
                      $store.state.userinfo.profileImage +
                      '?fornocache=' +
                      Math.random()
                        .toString(36)
                        .slice(2)
                "
                alt="avatar"
              />
              <span v-else class="white&#45;&#45;text headline">{{
                $store.state.userinfo.fullName | nameAvatar
              }}</span>
            </v-avatar>

            <v-container text-xs-center>
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
                Yükle
              </v-btn>
              <input
                ref="file"
                class="d-none"
                type="file"
                id="file"
                accept="image/*"
                @change="onFileChanged"
              />
            </v-container>
          </div>
        </v-col>

        <v-col class="d-flex flex-column col-md-4 col-12 pt-6 pl-lg-6">
          <div style="height: 220px">
            <table style="color:#fff;font-size:12px;" class="userinfos">
              <tr
                style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);"
              >
                <td
                  style="font-weight: 600;width:100px;padding-bottom: 18px !important;"
                >
                  Kullanıcı Adı
                </td>
                <td>
                  <v-text-field
                    :value="userinfo.fullName"
                    v-model="fullName"
                    :readonly="userNameEditable"
                    dark
                    :append-outer-icon="
                      usernametaken ? 'mdi-times-circle' : icon
                    "
                    class="pa-0 mt-0"
                    style="font-size: 12px;"
                    @input="isUserNameTaken"
                    :error-messages="
                      usernametaken ? 'Kullanıcı adı çoktan alınmış' : ''
                    "
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
                  ></v-text-field>
                </td>
              </tr>
              <tr
                style="height: 30px;border-bottom:1px solid rgba(255,255,255,.3);padding-top: 6px;"
              >
                <td style="font-weight: 600;width:100px;">Hacim</td>
                <td>
                  <v-text-field
                    :value="userinfo.volume || 0"
                    disabled
                    dark
                    hide-details
                    class="pa-0 mt-0"
                    style="font-size: 12px;"
                  ></v-text-field>
                </td>
              </tr>
            </table>
          </div>
        </v-col>

        <v-col class="d-flex flex-column col-md-4 col-12">
          <div>
            <div class="userwalletbargraph">
              <apexchart
                style="margin-top: -30px"
                type="bar"
                height="250"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import shortToName from "@/assets/short-to-name.json";
import shortNames from "@/assets/shortname-convert";
import _ from "lodash";
import UserGeneralSituation from "@/components/UserGeneralSituation";
let options = {
  type: "success",
  icon: "check",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "green accent-3 text-center",
  className: "text-center"
};
let alertOptions = {
  type: "alert",
  icon: "error",
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
      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 250,
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: false
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: []
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function(val) {
              return val;
            }
          },
          x: {
            formatter: function(val) {
              return val;
            }
          }
        }
      },
      allPrices: JSON.parse(localStorage.getItem("allprices")),
      shortNames: shortNames,
      usernametaken: false,
      fullName: app.$store.state.userinfo.fullName,
      icon: "mdi-pencil-circle",
      balanceNow: 0,
      avaibleTRY: JSON.parse(localStorage.getItem("wallet"))["TÜRK LİRASI"][
        "amount"
      ]
    };
  },
  components: {
    UserGeneralSituation
  },
  computed: mapState({
    userinfo: state => state.userinfo,
    wallet: state => state.wallet
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
        .post(`${this.$store.state.api}/changeprofileimage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            email: this.$store.state.userinfo.email
          }
        })
        .then(res => {
          if (res.data.success) {
            this.$toasted.show(
              `Profil görseliniz başarıyla yüklendi.`,
              options
            );
            if (this.$store.state.userinfo.profileImage.indexOf("https") > -1) {
              let temp = JSON.parse(localStorage.getItem("user"));
              temp.profileImage = this.$store.state.userinfo.email + ".jpg";
              localStorage.setItem("user", JSON.stringify(temp));
            }
            location.reload();
          } else {
            this.$toasted.show(`Görsel yüklenirken hata oluştu.`, alertOptions);
          }
        });
    },
    isUserNameTaken: _.debounce(function(v) {
      axios
        .post(`${this.$store.state.api}/isusernametaken`, {
          desired: v
        })
        .then(res => {
          this.usernametaken = res.data;
        });
    }, 400),
    changeUsername(e) {
      if (e.target.classList.contains("mdi-pencil-circle")) {
        this.userNameEditable = !this.userNameEditable;
        this.icon = "mdi-check-circle";
      } else if (e.target.classList.contains("mdi-check-circle")) {
        this.icon = "mdi-loading spin";
        this.userNameEditable = true;
        axios
          .post(`${this.$store.state.api}/changeusername`, {
            desired: this.fullName,
            userId: this.$store.state.userinfo.id
          })
          .then(res => {
            if (res.data == "SHORT") {
              this.$toasted.show(`En az 5 karakter!`, alertOptions);
            }
            if (res.data == "CHANGE") {
              let temp = this.$store.state.userinfo;
              temp["fullName"] = this.fullName;
              localStorage.setItem("user", JSON.stringify(temp));
              this.$store.commit("userinfo");
              setTimeout(() => {
                this.$toasted.show(
                  `Kullanıcı adınız başarılı bir şekilde değiştirildi.`,
                  options
                );
                this.icon = "mdi-pencil-circle";
              }, 1200);
            }
          });
      }
    },
    save() {}
  },
  created() {
    let temp = Object.values(JSON.parse(localStorage.getItem("wallet"))).filter(
      current => {
        return current.amount > 0;
      }
    );
    let series = [];
    let label = [];
    this.series = [];
    this.chartOptions.labels = [];
    for (let i = 0; i < temp.length; i++) {
      series.push(
        temp[i].amount *
          (this.allPrices[temp[i].shortName] ||
            this.allPrices[shortToName[temp[i].shortName]])
      );
      try {
        label.push(temp[i].shortName.toUpperCase().replaceAll("-", " "));
      } catch (e) {
        label.push(temp[i].shortName.toUpperCase());
      }
    }
    this.series = [
      {
        data: series
      }
    ];
    this.chartOptions = {
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: label
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            return val.toFixed(2);
          }
        },
        x: {
          formatter: function(val) {
            return val.toString();
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex /*,w*/ }) {
          return (
            '<div class="arrow_box">' +
            '<span style="font-weight: 600;">' +
            "₺" +
            series[seriesIndex][dataPointIndex] +
            "</span><br>" +
            "</div>"
          );
        }
      }
    };
    axios
      .post(`${this.$store.state.api}/getuserbalancelist`, {
        id: this.userinfo.id
      })
      .then(response => {
        this.balanceNow = Object.values(response.data).pop();
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style>
.userinfos .v-text-field input {
  padding: 0 !important;
}
.userinfos .v-input__append-outer,
.v-input__prepend-outer {
  margin-top: 0 !important;
}
.userwalletbargraph .apexcharts-text {
  color: #fff !important;
  fill: #fff !important;
}
@media screen and (max-width: 768px) {
  .userwalletbargraph .apexcharts-text {
    color: #fff !important;
    fill: #fff !important;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spin {
  animation-name: spin;
  animation-duration: 400ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
