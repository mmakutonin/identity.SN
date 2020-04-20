<template>
  <div class="w3-container w3-cell chat-text-pane-main">
    <div class="w3-container w3-border-bottom w3-mobile chat-text-pane-header">
      <input type="button" class="w3-button" v-on:click="toggleNav()" value="+"/>
      <h2>{{ currentContact.name }}</h2>
      <div class="chat-text-pane-btn-section w3-container">
        <input
          type="button"
          class="meet-face-btn w3-button w3-green w3-round-xlarge"
          value="Meet Face-to-Face"
          v-on:click="this.videoChat"
        />
      </div>
    </div>
    <div
      class="w3-container w3-mobile w3-padding chat-text-msg-section"
      v-chat-scroll="{ smooth: true }"
    >
      <div
        v-for="chatMessage in currentChat"
        v-bind:key="chatMessage.timestamp"
        v-bind:class="'w3-section ' + sender(chatMessage.sender)"
      >
        <div
          v-bind:class="'w3-round-xlarge bubble ' + color(chatMessage.sender)"
        >
          <div class="bubble-text">
            <p class="w3-padding msg-content">
              {{ chatMessage.content }}
            </p>
            <!--<p class="w3-padding msg-date">
            {{ new Date(chatMessage.timestamp) }}
          </p>-->
          </div>
        </div>
      </div>
    </div>
    <ChatTextPaneInput />
  </div>
</template>

<script>
import ChatTextPaneInput from "./ChatTextPaneInput";
import { mapGetters, mapActions } from "vuex";
import VueChatScroll from "vue-chat-scroll";
import Vue from "vue";
Vue.use(VueChatScroll);
export default {
  name: "ChatTextPane",
  components: {
    ChatTextPaneInput,
  },
  methods: {
    sender(sender) {
      if (sender) {
        return "bubble-sender";
      } else {
        return "bubble-income";
      }
    },

    color(sender) {
      if (sender) {
        return "w3-blue";
      } else {
        return "w3-grey";
      }
    },
    toggleNav() {
      this.$parent.$emit('toggleNav')
    },
    ...mapActions("chat", ["videoChat"]),
  },
  computed: {
    ...mapGetters("chat", ["currentChat", "currentContact"]),
  },
};
</script>
