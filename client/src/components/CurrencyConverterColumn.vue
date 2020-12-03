<template>
  <v-card class="col-lg-4">
    <v-card-title>
      Döviz Dönüştürücü
    </v-card-title>
    <v-row>
      <v-col sm="12" lg="12" class="pb-0 mb-0">
        <v-text-field
            label="Miktar"
            solo
            dark
        ></v-text-field>
      </v-col>
      <v-col class="pt-0" sm="10" lg="12">
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
            item-value="symbol"
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
      <v-col sm="10" lg="12">
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
            item-value="symbol"
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
      <v-col sm="2" lg="12">
        <v-btn height="48" block color="indigo" class="white--text">
          Dönüştür
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
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
  }),
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: rgba(192, 0, 250, 0.986) !important;
}
</style>