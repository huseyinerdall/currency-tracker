<template>
  <div class="row">
    <div class="col-12">
      <card title="Users">
        <div>
          <b-table striped hover :items="users" :fields="fields" sort-by="id">
            <template #cell(id)="data">
              <span v-html="data.value"></span>
            </template>
            <template #cell(actions)="row">
              <b-btn
                @click="removeUser(4)"
              >Delete
              </b-btn>
            </template>
          </b-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
//import axios from "axios";

import axios from "axios";

export default {
  components: {
  },
  data() {
    return {
      users: null,
      fields: ['id','fullName','email','active','balanceNow','actions'],
    };
  },
  created() {
    axios.get(`${this.$store.state.admin}/getallusers`)
      .then((response) => {
        console.log(response.data)
        this.users = response.data;
      })
  },
  watch: {},
  methods: {
    removeUser: function (userId){
      axios.post(`${this.$store.state.admin}/removeuser`,{
        userId
      })
        .then((response) => {
          alert("Kullanıcı silindi.");
          axios.get(`${this.$store.state.admin}/getallusers`)
            .then((response) => {
              console.log(response.data)
              this.users = response.data;
            })
        })
      .catch((err) => {
        alert(err.toString());
      })
    }
  },
};
</script>
<style>
</style>
