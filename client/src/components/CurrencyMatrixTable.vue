<template>
  <v-card class="mt-2">
    <v-card-title>Döviz Matrix Tablo</v-card-title>
    <v-container fluid>
      <v-select
          v-model="value"
          :items="items"
          label="Döviz Seçin"
          multiple
          dark
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0">
            <span>{{ item }}</span>
          </v-chip>
          <span
              v-if="index === 1"
              class="grey--text caption"
          >
          (+{{ value.length - 1 }} diğerleri)
        </span>
        </template>
      </v-select>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
    value: ['foo', 'bar', 'fizz'],
  }),
}
</script>