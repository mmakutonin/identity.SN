<template>
  <div class="w3-container chat-text-pane-input-section">
    <input
      type="text"
      class="w3-input w3-round-xlarge"
      v-model="messageText"
    />
    <div class="chat-input-send-btn-section">
      <input
        type="button"
        value="Send"
        class="w3-button w3-round-xlarge w3-green send-btn"
        v-on:click="send(messageText)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ChatTextPaneInput",
  data: () => ({
    messageText: "",
  }),
  watch: {
    currentContactIndex() {
      this.messageText = "";
    },
  },
  methods: {
    ...mapActions("chat", ["sendMessage"]),
    send(messageText) {
      this.sendMessage({ messageText });
      this.messageText = "";
    },
  },
  computed: {
    ...mapState("chat", ["currentContactIndex"]),
  },
};
</script>
