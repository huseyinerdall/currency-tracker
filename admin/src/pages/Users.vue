<template>
  <div class="row">
    <div class="col-12">
      <card title="Users">
        <div>
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

            </b-input-group>
          </b-form-group>
          <b-table striped hover :items="users" :fields="fields" sort-by="id" :filter="filter">
            <template #cell(id)="data">
              <span v-html="data.value"></span>
            </template>
            <template #cell(actions)="data">
              <b-btn
                @click="removeUser(data.item.id)"
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
      filter: null
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
