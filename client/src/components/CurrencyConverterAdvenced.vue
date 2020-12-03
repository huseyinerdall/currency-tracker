<template>
  <v-card>
    <v-card-title>Döviz Dönüştürücü</v-card-title>
    <v-row>
      <v-col sm="12" lg="2" class="ml-lg-6">
        <v-text-field
            v-model="amount"
            label="Miktar"
            solo
            dark
        ></v-text-field>
      </v-col>
      <v-col sm="10" lg="3">
        <v-autocomplete
            v-model="model1"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            chips
            clearable
            hide-details
            hide-selected
            item-text="name"
            item-value="name"
            label="Para Birimi Ara"
            solo
            dark
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Kaynak
                <strong>Para Birimi</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                label
                v-on="on"
            >
              <v-icon left>
                mdi-cash-multiple
              </v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
            >
              <!--{{ item.name.charAt(0) }}-->
              <img
                  :src="item.image"
                  :alt="item.image"
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col sm="2" lg="1">
        <v-icon size="40" color="indigo" class="mt-1">
          mdi-arrow-right-bold
        </v-icon>
      </v-col>
      <v-col sm="10" lg="3">
        <v-autocomplete
            v-model="model2"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            chips
            clearable
            hide-details
            hide-selected
            item-text="name"
            item-value="name"
            label="Para Birimi Ara"
            solo
            dark
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Hedef
                <strong>Para Birimi</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                label
                v-on="on"
            >
              <v-icon left>
                mdi-cash-multiple
              </v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
            >
              <!--{{ item.name.charAt(0) }}-->
              <img
                  :src="item.image"
                  :alt="item.image"
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col sm="2" lg="2" class="ml-lg-2">
        <v-btn height="48" color="indigo" class="white--text" @click="convert">
          Dönüştür
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-alert
        v-if="resulted"
        color="primary"
        dark
        icon="mdi-cash-check"
        border="left"
        prominent
        dismissible
        transition="slide-y-transition"
    >
      {{amount}} {{model1}} = {{result}} {{model2}}
    </v-alert>
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
    model1: null,
    model2: null,
    search: null,
    tab: null,
    source: '',
    target: '',
    amount: '',
    resulted: false,
    result: '',
  }),
  methods: {
    convert(){
      if(!(this.model1 && this.model2 && this.amount))return;
      axios.post(`http://${this.$store.state.addr}:${this.$store.state.port}/converter`,{
        source: this.model1,
        target: this.model2,
        amount: this.amount,
      })
          .then(response => {
            this.resulted = true;
            console.log(response.data.result)
            this.result = response.data.result;
          })
    }
  }
};
</script>