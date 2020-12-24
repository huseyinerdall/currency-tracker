<template>
  <div>
    <v-list style="border: 1px solid #5e6593;">
      <v-subheader style="border-bottom: 1px solid #5e6593;">
        <v-row class="justify-space-between">
          <div>
            <v-btn class="yellow--text darken-1" text>1000 TL Ne Oldu?</v-btn>
          </div>
          <div class="d-flex flex-row">
            <v-btn small color="#71402c">Dün</v-btn>
            <v-btn small color="#720e60" class="ml-4 mr-4">Geçen Hafta</v-btn>
            <v-btn small color="#0b4e82">Geçen Ay</v-btn>
          </div>
        </v-row>
      </v-subheader>

      <v-list-item v-for="(value,name) in data" :key="name">
        <v-list-item-content>
          <v-row>
            <v-col cols="2">
              <span class="white--text">{{ name }}</span>
            </v-col>
            <v-col cols="10">

              <v-progress-linear
                  color="yellow darken-1"
                  height="20"
                  :value="value/10"
              >
                <template v-slot:default="{}">
                  <strong>{{value | tofixedfour}}</strong>
                </template>
              </v-progress-linear>
            </v-col>
          </v-row>
        </v-list-item-content>

        <v-list-item-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "BinTLTable",
  data: () => ({
    data :[],
  }),
  created() {
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on("bintl", fetchedData => {
      app.data = fetchedData
    })
  }
};
</script>


<style scoped>
.v-list.v-sheet.theme--light{
  background-color: rgba(0,0,0,.3) !important;
}
.theme--light.v-btn{
  color: #fff !important;
}
.v-list-item__content{
  padding: 0 !important;
}
</style>