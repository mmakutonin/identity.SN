<template>
  <div class="w3-container w3-cell chat-text-pane-main">
    <div class="w3-container w3-mobile chat-text-pane-header">
      <h2>{{ currentContact.name }}</h2>
      <div class="chat-text-pane-btn-section w3-container">
        <input
          type="button"
          class="meet-face-btn w3-button w3-round-xlarge"
          value="Meet Face-to-Face"
          v-on:click="this.videoChat"
        />
      </div>
    </div>
    <div
      v-for="chatMessage in currentChat"
      v-bind:key="chatMessage.timestamp"
      v-bind:class="
        'w3-card w3-round-xlarge w3-section ' + color(chatMessage.sender)
      "
    >
      {{ chatMessage.content }}
      {{ new Date(chatMessage.timestamp) }}
    </div>
    <ChatTextPaneInput />
  </div>
</template>

<script>
import ChatTextPaneInput from "./ChatTextPaneInput";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ChatTextPane",
  components: {
    ChatTextPaneInput,
  },
  methods: {
    color(sender) {
      if (sender) {
        return "w3-indigo";
      } else {
        return "w3-grey";
      }
    },
    ...mapActions("chat", ["videoChat"]),
  },
  computed: {
    ...mapGetters("chat", ["currentChat", "currentContact"]),
  },
};
</script>
