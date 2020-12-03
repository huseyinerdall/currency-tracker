<template>
  <div class="coins">
    <SinglePageGraph />
    <v-container>
      <v-row>
        <v-col
        lg=8 sm=12>
        </v-col>
        <v-col
        lg=4 sm=12>
          <Description />
        </v-col>
      </v-row>
    </v-container>
    <CommentSidebar />
  </div>
</template>

<script>
import SinglePageGraph from "@/components/SinglePageGraph.vue";
import Description from "@/components/Description.vue";
import CommentSidebar from "@/components/common/CommentSidebar.vue";
export default {
  name: "Coins",
  components: {
    SinglePageGraph,
    Description,
    CommentSidebar,
  },
  created() {
  },
};
</script>
