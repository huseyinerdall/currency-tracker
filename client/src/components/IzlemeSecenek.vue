<template>
  <v-container fluid>
    <v-select
      v-model="value"
      :items="items"
      label="İzlemek istediklerinizi seçin."
      multiple
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption">
          (+{{ value.length - 1 }} seçildi)
        </span>
      </template>
    </v-select>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz", "fizzbuzz", "foobar"],
    value: ["foo", "bar", "fizz"]
  })
};
</script>
