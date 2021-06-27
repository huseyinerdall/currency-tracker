<template>
  <div class="404">
    <v-container>
      <v-row>
        <div class="mainbox d-flex flex-row">
          <div class="err">4</div>
          <v-icon
            size="170"
            color="white"
            style="position: absolute;top:15%;left:39%;"
            >mdi-spin mdi-progress-question</v-icon
          >
          <div class="err2">4</div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "404Page",
  components: {}
};
</script>
<style>
.mainbox {
  background-color: transparent;
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}

.err {
  color: #ffffff;
  font-size: 11rem;
  position: absolute;
  left: 20%;
  top: 8%;
}

.far {
  position: absolute;
  font-size: 8.5rem;
  left: 42%;
  top: 15%;
  color: #ffffff;
}

.err2 {
  color: #ffffff;
  font-size: 11rem;
  position: absolute;
  left: 68%;
  top: 8%;
}

.msg {
  text-align: center;
  font-size: 1.6rem;
  position: absolute;
  left: 16%;
  top: 45%;
  width: 75%;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: underline;
}
</style>
