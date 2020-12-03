<template>
  <div class="coins">
    <SinglePageGraphGold />
    <Description />
  </div>
</template>

<script>
    import SinglePageGraphGold from "@/components/SinglePageGraphGold.vue";
    import Description from "@/components/Description.vue";
    export default {
        name: "Coins",
        components: {
            SinglePageGraphGold,
            Description,
        },
        created() {},
    };
</script>