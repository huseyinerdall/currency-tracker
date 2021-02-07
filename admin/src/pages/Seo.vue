<template>
    <div class="row">
      <div class="col-12">
        <card title="Seo">
          <div>
            <label>Seç</label>
            <b-form-select v-model="selected" :options="options"
                           style="background:#27293d;color:#fff;"
            ></b-form-select>
            <label class="mt-4">Seo Title</label>
            <b-form-input v-model="seotitle"
                           style="background:#27293d;color:#fff;"
            ></b-form-input>
            <label class="mt-4">Seo Keywords</label>
            <b-form-input v-model="seokeywords"
                          style="background:#27293d;color:#fff;"
            ></b-form-input>
            <label class="mt-4">Seo Description</label>
            <b-form-input v-model="seodescription"
                          style="background:#27293d;color:#fff;"
            ></b-form-input>
            <label class="mt-4">Paragraph of Coin</label>
            <vue-editor
              class="mt-0"
              placeholder="Kripto para açıklaması"
              :value="description"
              v-model="description"
            ></vue-editor>
            <b-btn class="float-right" @click="addNew">Kaydet</b-btn>
          </div>
        </card>
      </div>
    </div>
</template>
<script>
import axios from "axios";
import {VueEditor} from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      selected: null,
      isLight:true,
      options: [],
      description: "",
      data: "",
      seotitle: "",
      seodescription : "",
      seokeywords: ""
    };
  },
  created() {
    axios.get(`${this.$store.state.admin}/cryptocoindescriptions`)
      .then((response) => {
        this.data = response.data;
        for (const responseElement in response.data) {
          this.options.push({value:responseElement,text:responseElement});
        }
      })
  },
  watch: {
    selected(){
      this.description = this.data[this.selected];
    }
  },
  methods: {
    addNew: function() {
      axios.post(`${this.$store.state.admin}/addnewdescription`,{
        yeni: this.selected,
        description: this.description,
        seotitle: this.seotitle,
        seodescription: this.seodescription,
        keywords: this.seokeywords
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
.quillWrapper .ql-snow .ql-stroke{
  stroke: #fff !important;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label{
  color:#fff !important;
}
</style>
