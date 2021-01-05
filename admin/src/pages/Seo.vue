<template>
    <div class="row">
      <div class="col-12">
        <card title="Seo">
          <div>
            <label>Seç</label>
            <b-form-select v-model="selected" :options="options"
                           style="background:#27293d;color:#fff;"
            ></b-form-select>
            <label class="mt-4">Yaz</label>
            <b-input v-model="yeni"></b-input>
            <b-form-textarea
              class="mt-4"
              style="height: 200px !important;max-height: 200px !important;border: 1px solid #fff;border-radius:4px;padding:4px;"
              id="textarea-small"
              placeholder="Kripto para açıklaması"
              :value="description"
              v-model="description"
            ></b-form-textarea>
            <b-btn class="float-right" @click="addNew">Kaydet</b-btn>
          </div>
        </card>
      </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  components: {
  },
  data() {
    return {
      selected: null,
      isLight:true,
      options: [],
      description: "",
      data: "",
      yeni: "",
    };
  },
  created() {
    axios.get(`http://localhost:4000/admin/cryptocoindescriptions`)
      .then((response) => {
        this.data = response.data;
        for (const responseElement in response.data) {
          this.options.push({value:responseElement,text:responseElement});
        }
      })
  },
  watch: {
    selected(){
      this.yeni = "";
      this.description = this.data[this.selected];
    }
  },
  methods: {
    addNew: function() {
      axios.post(`http://localhost:4000/admin/addnewdescription`,{
        yeni: this.yeni || this.selected,
        description: this.description,
      })
        .then((response) => {
          if(response.data == "OK"){
            alert("Yeni coin eklendi.");
          }
          if(response.data == "NO"){
            alert("Bir sorun var!");
          }
        })
    }
  },
};
</script>
<style>
</style>
