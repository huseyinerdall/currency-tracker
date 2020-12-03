<template>
  <v-card
      style="border-radius: 0;"
      class="mt-8"
  >
    <v-toolbar
        color="#101449"
        dark
    >

      <v-toolbar-title class="yellow--text darken-1">Varlıklarım</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-wallet-plus</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list
        subheader
        two-line
    >

      <v-list-item
          v-for="wallet in wallet"
          :key="wallet.title"
      >
        <v-list-item-avatar class="d-none d-md-flex">
          <v-icon
              class="grey lighten-1"
              dark
          >
            mdi-folder
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-row>
            <v-col cols="4" sm="4">
              <v-text-field
                  label="Miktar"
                  value="10.00"
                  prefix="$"
              ></v-text-field>
            </v-col>
            <v-col
                class="d-flex"
                cols="5"
                sm="4"
            >
              <v-select
                  :items="items"
                  item-text="name"
                  label="Birim"
                  color="black"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
                cols="3"
                sm="3"
            >
              <v-text-field
                  value="0.0"
                  label="TL"
                  readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-credit-card-remove</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5" sm="5" class="font-weight-bold">
              Toplam değer : {{toplam}} ₺
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" sm="4" class="font-weight-bold" :class="[kazanc>=0 ? 'green--text' : 'red--text']">
              Kar / Zarar : {{kazanc | signint}} ₺
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-card>
</template>
<script>
    import currencies from '../assets/currencies.js';

    export default {
        data: () => ({
            wallet: [{
                color: 'blue',
                icon: 'mdi-clipboard-text',
                subtitle: 'Jan 20, 2014',
                title: 'Vacation itinerary',
            }, ],
            items: currencies,
            toplam: 123.456,
            kazanc: -100.232
        }),
    }
</script>

<style scoped>
    .theme--light.v-input input,
    .theme--light.v-input textarea,
    .theme--light.v-select .v-select__selection--comma {
        color: #000 !important;
    }
</style>