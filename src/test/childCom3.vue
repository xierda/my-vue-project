<template>
  <div class="border">
    <p>coo: {{ coo }}</p>
    <p>title: {{ title }}</p>
    <p>childCom3: {{ $attrs }}</p>
  </div>
</template>
<script>
export default {
  props: {
    coo: String,
    title: String
  }
};
</script>