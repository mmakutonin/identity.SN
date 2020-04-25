<template>
  <div
    class="w3-cell w3-border-right w3-theme2 chat-convo-list"
    v-bind:class="{ active: active }"
  >
    <div class="w3-container w3-border-bottom w3-mobile chat-convo-list-header">
      <h2>Chat</h2>
      <input
        type="button"
        class="w3-button w3-round-xlarge w3-orange w3-hover-theme new-match-btn"
        value="New Match"
        v-on:click="searchForMatch()"
      />
    </div>
    <!-- <div class="w3-container contact-search-bar-section">
      <input
        class="w3-padding w3-round-xlarge search-bar"
        type="text"
        placeholder="Search..."
      />
    </div>-->
    <div class="chat-cc-section w3-mobile">
      <div
        v-for="(contact, index) in contacts"
        v-bind:key="contact.chatIndex"
        class="w3-padding w3-container w3-border-bottom w3-section chat-contact-cards "
      >
        <div class="chat-contact-thumbnail-section">
          <input
            type="button"
            v-bind:value="contact.initials"
            v-bind:class="
              'chat-contact-thumbnail-btn w3-circle w3-button ' + color(index)
            "
            v-on:click="changeCurrentContact({ index })"
          />
        </div>

        <div class="last-msg-content w3-padding">
          <p>{{ contact.lastMessage.content }}</p>
        </div>
      </div>
    </div>
    <a
      class="nav-logo3 w3-border-top w3-hover-text-theme"
      v-on:click="$router.push({ path: '/' })"
      >identity.SN</a
    >
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
export default {
  name: "ChatConversationList",
  data: () => ({
    alertDisplayed: false,
    alertMessage: "",
    active: true,
  }),
  watch: {
    alertDisplayed(val) {
      if (val) {
        setTimeout(() => {
          this.alertDisplayed = false;
          this.alertMessage = "";
        }, 10000);
      }
    },
  },
  methods: {
    ...mapMutations("chat", ["changeCurrentContact"]),
    ...mapActions("chat", ["findMatch"]),
    color(index) {
      if (index === this.currentContactIndex) {
        return "w3-blue";
      } else {
        return "w3-light-blue";
      }
    },
    searchForMatch() {
      this.findMatch();
      /*this.alertMessage =
        "Your match is being searched for. This can sometimes take a while, but we'll let you know as soon as we find them!";*/
      this.alertDisplayed = true;
      this.$alert(
        "Your match is being searched for. This can sometimes take a while, but they'll appear as soon as we find them!",
        "Please wait...",
        "success"
      );
    },
  },
  computed: {
    ...mapState("chat", {
      contacts: (state) =>
        state.rooms.map((contact) => ({
          ...contact,
          lastMessage:
            contact.messages.length > 0
              ? contact.messages[contact.messages.length - 1]
              : "",
        })),
      currentContactIndex: (state) => state.currentContactIndex,
    }),
  },

  mounted() {
    this.$parent.$on("toggleNav", () => {
      this.active = !this.active;
    });
    this.$alert(
      "Welcome to your chat room! Please keep an open mind and respect for your match. Please do not use chat to discriminate or disrespect",
      "Before you start...",
      "info"
    );
  },
};
</script>
