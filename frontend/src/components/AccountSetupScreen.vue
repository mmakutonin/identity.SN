<template>
  <div
    class="w3-container w3-animate-opacity w3-flat-clouds acc-set-up-container"
  >
    <h2 class="w3-margin">{{ message }}</h2>
    <p class="w3-margin w3-italics">
      If the identity you identity with or of interests is not on
      the list, please choose OTHER.
    </p>
    <div class="w3-row-padding buttons-section">
      <div
        v-for="(obj, index) in allColors"
        v-bind:key="obj.index"
        v-bind:class="
          'option-buttons w3-col s2 w3-btn w3-round w3-border w3-border-' +
            obj.color +
            ' ' +
            circleColor(index, obj.color)
        "
        v-on:click="elementClickHandler(index)"
      >
        {{ obj.element }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AccountSetupScreen",
  props: {
    elementType: String,
    message: String,
  },
  data: () => ({
    colorArray: [
      "red",
      "pink",
      "purple",
      "indigo",
      "blue",
      "aqua",
      "teal",
      "green",
      "lime",
      "khaki",
      "amber",
      "orange",
      "deep-orange",
      "grey",
      "black",
    ],
  }),
  methods: {
    ...mapActions("accountSetup", ["addItem", "rmItem"]),
    circleColor(index, color) {
      if (Object.keys(this.known).includes(index)) {
        return "w3-light-grey";
      } else {
        return "w3-" + color;
      }
    },
    elementClickHandler(item) {
      if (Object.keys(this.known).includes(item)) {
        this.rmItem({ item, elementType: this.elementType });
      } else {
        this.addItem({ item, elementType: this.elementType });
      }
    },
  },
  computed: {
    ...mapState("accountSetup", {
      all: function(state) {
        return state[this.elementType + "All"];
      },
      known: function(state) {
        return state[this.elementType + "Known"];
      },
    }),
    allColors() {
      const retObj = {};
      for (const key in { ...this.all, ...this.known }) {
        retObj[key] = {
          element: this.all[key],
          color: this.colorArray[
            Math.floor(Math.random() * this.colorArray.length)
          ],
        };
      }
      return retObj;
    },
  },
};
</script>
