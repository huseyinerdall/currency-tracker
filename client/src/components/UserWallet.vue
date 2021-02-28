<template>
  <v-card
      style="border-radius: 0;background:transparent;"
      class="mt-8"
  >
    <v-toolbar
        color="#101449"
        dark
    >

      <v-toolbar-title class="yellow--text darken-1">Varlıklarım</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon size="24">mdi-wallet-plus</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon size="24">mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-simple-table dense style="background-color:transparent;">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in desserts"
            :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>
<script>
    import currencies from '../assets/currencies.js';

    export default {
        data: () => ({
          desserts: [
            {
              name: 'Frozen Yogurt',
              calories: 159,
            },
            {
              name: 'Ice cream sandwich',
              calories: 237,
            },
            {
              name: 'Eclair',
              calories: 262,
            },
            {
              name: 'Cupcake',
              calories: 305,
            },
            {
              name: 'Gingerbread',
              calories: 356,
            },
            {
              name: 'Jelly bean',
              calories: 375,
            },
            {
              name: 'Lollipop',
              calories: 392,
            },
            {
              name: 'Honeycomb',
              calories: 408,
            },
            {
              name: 'Donut',
              calories: 452,
            },
            {
              name: 'KitKat',
              calories: 518,
            },
          ],
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