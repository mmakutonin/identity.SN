<template>
  <div class="w3-container w3-theme2 set-up-background">
    <a class="nav-logo2" v-on:click="$router.push({ path: '/' })">identity.SN</a>
    <div v-if="!loaded">
      <div class="w3-container w3-center w3-theme-d5 loading">
        <h1>Hold on tight...</h1>
        <h3>Getting ready to create your profile!</h3>
      </div>
    </div>

    <div
      v-else
      class="w3-container w3-mobile w3-light-gray w3-display-middle w3-shadow w3-border w3-round-xlarge set-up-main"
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
          class="w3-button w3-theme-d4 w3-round-large w3-hover-theme2"
          value="Previous"
          v-bind:disabled="screenCounter === 0"
          v-on:click="screenCounter--"
        />

        <input
          type="button"
          v-bind:class="
            'w3-button w3-theme-d4 w3-round-large w3-hover-theme2' +
              (screenCounter === 1 ? 'w3-theme-d4 w3-hover-theme2' : '')
          "
          v-bind:value="screenCounter === 1 ? 'Lets Chat!' : 'Next Page'"
          v-on:click="screenCounter++"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AccountSetupScreen from "../components/AccountSetupScreen";
import LoginFooter from "../components/LoginFooter";
import { mapState, mapActions } from "vuex";
import MainNavBar from "../components/MainNavBar";
export default {
  name: "AccountSetup",
  components: { MainNavBar, AccountSetupScreen, LoginFooter },
  data: () => ({
    screenCounter: 0,
  }),
  created() {
    this.getUserMetadata({ id: this.userId });
  },
  watch: {
    screenCounter(newVal) {
      if (newVal > 1) {
        this.initChats({
          userId: this.userId
        })
        .then(res => this.findMatch()
        .then(res => this.$router.push("chat")))
      }
    },
  },
  methods: {
    ...mapActions("accountSetup", ["getUserMetadata"]),
    ...mapActions('chat', ['initChats', 'findMatch'])
  },
  computed: {
    ...mapState(["userId"]),
    ...mapState("accountSetup", {
      loaded: (state) => !!state.userId,
    }),
  },
};
</script>
