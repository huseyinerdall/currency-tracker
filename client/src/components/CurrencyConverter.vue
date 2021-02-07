<template>
  <v-card style="border: 1px solid #ddd;border-radius:0;color:#fff;" class="mb-6 pa-0"
          :style="$store.state.isLight ? 'background-color:rgba(255,255,255,.3);' : 'background-color:rgba(0,0,0,.3);'">
    <v-row>
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-col cols="6" lg="2" class="pb-0 pt-0">
        <v-text-field
            v-model="amount"
            :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
            style="padding: 0 16px !important;"
            class="centered-input ml-6"
            :dark="!$store.state.isLight"
            @change="convert"
            @input="convert"
            :color="$store.state.isLight ? 'black' : 'white'"
        ></v-text-field>
      </v-col>
      <v-col cols="5" lg="1" class="pb-0 pt-0">
        <v-select
            :items="items"
            item-text="symbol"
            v-model="source"
            item-value="name"
            :color="$store.state.isLight ? 'black' : 'white'"
            @change="convert"
            style="padding: 0 !important;"
            :dark="!$store.state.isLight"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="1" class="text-center pb-0 pt-0 ma-0">
        <v-icon size="40" :color="$store.state.isLight ? '#ff3366' : '#ffbf00'" class="mt-1" :class="$vuetify.breakpoint.smAndDown ? 'mdi-rotate-90' : ''">
          mdi-arrow-right
        </v-icon>
      </v-col>
      <v-col cols="6" lg="2" class="pb-0 pt-0">
        <v-text-field
            v-model="result"
            :color="$store.state.isLight ? 'black' : 'white'"
            class="ml-6 centered-input"
            :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
            style="padding: 0 16px !important;"
            :dark="!$store.state.isLight"
            readonly
        ></v-text-field>
      </v-col>
      <v-col cols="5" lg="1" class="pb-0 pt-0">
        <v-select
            :items="items"
            item-text="symbol"
            item-value="name"
            v-model="target"
            @change="convert"
            :color="$store.state.isLight ? 'black' : 'white'"
            style="padding: 0 !important;"
            :dark="!$store.state.isLight"
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>

<script>
    import axios from 'axios';
    import currencies from '../assets/currencies.js';
    export default {
        name: "CurrencyConverter",
        data: () => ({
            isLoading: false,
            items: currencies,
            search: null,
            tab: null,
            source: currencies[0]["name"],
            target: currencies[2]["name"],
            amount: 1,
            resulted: false,
            result: '',
        }),
        created() {
            this.convert();
        },
        methods: {
            convert() {
                this.amount = this.amount.toString().replace(",",".");
              this.amount = this.amount || "1";
                if (!(this.amount && this.source && this.target)) return;
                axios.post(`${this.$store.state.api}/converter`, {
                        source: this.source,
                        target: this.target,
                        amount: this.amount,
                    })
                    .then(response => {
                        this.resulted = true;
                        this.result = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 4 }).format(response.data.result);
                    })
            }
        }
    };
</script>
<style scoped>
    .v-text-field__details {
        display: none;
    }
    
    .theme--light.v-text-field>.v-input__control>.v-input__slot:before {
        border-color: white !important;
    }
    
    .theme--light.v-icon {
        color: white !important;
    }
    
    .theme--light.v-input input,
    .theme--light.v-input textarea,
    .theme--light.v-select .v-select__selection--comma {
        text-align: center;
        font-size: 20px;
        color: white;
    }
    
    .theme--light.v-input input,
    .theme--light.v-input textarea,
    .theme--light.v-select .v-select__selection--comma {
        font-size: 14px;
    }
    
    .theme--light.v-select .v-select__selection--comma {
        padding-left: 4px;
    }
    
    .theme--light.v-text-field>.v-input__control>.v-input__slot:before,
    .theme--light.v-text-field:not(.v-input--has-state):hover>.v-input__control>.v-input__slot:before {
        border-color: #fff !important;
    }
    .v-text-field__slot > input{
      text-align: center !important;
      color: #fff !important;
    }
    .theme--light.v-text-field > .v-input__control > .v-input__slot:before{
      border-color: #fff !important;
    }
    .v-select__selection{
      color:#fff !important;
      margin-left:10px !important;
    }
    input{
      text-align: center !important;
    }
    .v-text-field__slot input{
      text-align: center !important;
    }
    .v-text-field input{
      text-align: center !important;
    }
    .centered-input >>> input {
      text-align: center !important;
    }
    .v-icon.v-icon{
      color: rgb(255, 191, 0) !important;
      caret-color: rgb(255, 191, 0) !important;
    }
</style>