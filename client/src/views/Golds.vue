<template>
  <div class="coins">
    <SinglePageGraphGold />
    <v-container>
      <v-row>
        <v-col
            cols="12" md="6">
          <Description />
        </v-col>
      </v-row>
    </v-container>
    <CommentSidebar />
  </div>
</template>

<script>
    import SinglePageGraphGold from "@/components/SinglePageGraphGold.vue";
    import Description from "@/components/Description.vue";
    import CommentSidebar from "@/components/common/CommentSidebar";
    export default {
        name: "Coins",
        components: {
            SinglePageGraphGold,
            Description,
            CommentSidebar,
        },
        created() {},
    };
</script>