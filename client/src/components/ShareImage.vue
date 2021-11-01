<template>
  <div id="shareImage">
    <vc-donut
        :sections="sections"
        background="white" foreground="grey"
    >Basic donut</vc-donut>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sections: [{ value: 25 }, { value: 25 }]
    };
  }
};
</script>