<template>
  <div>
    <v-overlay
        v-model="$store.state.isEmailSending"
        :opacity="1"
        :color="
        $store.state.isLight ? '#fff' : '#'
      "
    >
      <div class="emailsendinggif">Eposta gönderiliyor...</div>
    </v-overlay>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EmailSendingModal",
  data: () => ({

  }),
  created() {

  },
  methods: {

  },
  computed: mapState({
    isEmailSending: state => state.isEmailSending
  })
};
</script>
<style>
.emailsendinggif {
  background-image: url("../../assets/emailsending.gif") !important;
  background-attachment: fixed;
  background-position: center center;
  height: 200px;
  width: 400px;
  background-color: #fff;
  color: #585858;
  text-align: center;
}
</style>
