<template>
  <!-- adding a click event listener to our button -->
  <!-- Running the onClick function in case of a click -->
  <!-- Making the style a vue style so we can give it custom background color -->
  <button @click="onClick()" :style="{background: color}" class="btn"> <!-- rendering the text of the button -->{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  // defnining props
  props: {
    text: String,
    color: String
  },
  // we are creating our own function so we have to create the methods object
  methods: {
    // creating onClick event
    onClick() {
        // emmiting an event called btn-click
        this.$emit("btn-click");
    }
  }
};
</script>