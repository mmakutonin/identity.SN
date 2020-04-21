<template>
  <div class="w3-container set-up-background">
    <div v-if='!loaded'>
      Getting ready to create your account
    </div>
    <div
      v-else
      class="w3-container w3-light-gray w3-shadow w3-display-middle w3-border w3-round-xlarge set-up-main"
    >
      <AccountSetupScreen
        v-if="screenCounter === 0"
        message="What do you identify with?"
        elementType="identities"
      />

      <AccountSetupScreen
        v-if="screenCounter === 1"
        message="What are your interests?"
        elementType="interests"
      />

      <div class="w3-bar set-up-nav">
        <input
          type="button"
          class="w3-button w3-black w3-round-large w3-hover-indigo"
          value="Previous"
          v-bind:disabled="screenCounter === 0"
          v-on:click="screenCounter--"
        />

        <input
          type="button"
          v-bind:class="
            'w3-button w3-black w3-round-large w3-hover-indigo' +
              (screenCounter === 1 ? 'w3-green w3-hover-green' : '')
          "
          v-bind:value="screenCounter === 1 ? 'Lets Chat!' : 'Next Page'"
          v-on:click="screenCounter++"
        />
      </div>
    </div>

    <LoginFooter />
  </div>
</template>
<script>
import AccountSetupScreen from "../components/AccountSetupScreen";
import LoginFooter from "../components/LoginFooter";
import { mapState, mapActions } from 'vuex';
export default {
  name: "AccountSetup",
  components: { AccountSetupScreen, LoginFooter },
  data: () => ({
    screenCounter: 0,
  }),
  created() {
    this.getUserMetadata({id: this.userId})
  },
  watch: {
    screenCounter(newVal) {
      if (newVal > 1) {
        this.$router.push("chat");
      }
    },
  },
  methods: {
    ...mapActions('accountSetup', ['getUserMetadata'])
  },
  computed: {
    ...mapState(['userId']),
    ...mapState("accountSetup", {
      loaded: (state) => !!state.userId
    })
  }
};
</script>
