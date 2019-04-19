<template>
  <div>
    <nav-bar/>
    <galleries-section/>
  </div>
</template>

<script>
import GalleriesSection from "../components/GalleriesSection";

export default {
  name: "Galleries",

  components: {
    GalleriesSection
  }
};
</script>