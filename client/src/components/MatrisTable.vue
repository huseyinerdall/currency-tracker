<template>
  <v-container>
      <table class="mt-6">
          <thead>
            <tr>
                <th style="border-left: 0 !important;width:160px;">
                    <v-select
                        :items="items"
                        item-text="name"
                        v-model="source"
                        @change="convert"
                        multiple
                        style="width: 100px;"
                        class="mx-auto"
                    >
                    <template v-slot:selection="{ item, index }">
                        <span
                        style="color: white;text-align: center;font-size:12px;"
                        class="ml-4"
                        v-if="index === 0">
                            {{ source.length }} adet 
                        </span>
                    </template>
</v-select>
</th>
<th>lorem</th>
<th>lorem</th>
<th>lorem</th>
</tr>
</thead>
<tbody>
    <tr>
        <th style="border-left: 0 !important;">lorem</th>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
    </tr>
    <tr>
        <th style="border-left: 0 !important;">lorem</th>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
    </tr>
    <tr>
        <th style="border-left: 0 !important;">lorem</th>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
    </tr>
</tbody>
</table>
</v-container>
</template>

<script>
    import currencies from '../assets/currencies.js';
    export default {
        name: "MatrisTable",
        data: () => ({
            items: currencies,
        }),
        created() {},
        methods: {

        }
    };
</script>

<style scoped>
    table {
        width: 100% !important;
        background-color: rgba(0, 0, 0, .3);
        color: #fff !important;
    }
    
    tr {
        height: 50px;
        text-align: center;
    }
    
    td {
        padding: 10px;
        border-bottom: thin solid rgba(255, 255, 255, .4)!important;
        border-left: thin solid rgba(255, 255, 255, .4)!important;
    }
    
    th {
        padding: 10px;
        border-bottom: thin solid rgba(255, 255, 255, .4)!important;
        border-left: thin solid rgba(255, 255, 255, .4)!important;
    }
    
    tbody tr:last-child td,
    tbody tr:last-child th {
        border-bottom: 0 !important;
    }

</style>