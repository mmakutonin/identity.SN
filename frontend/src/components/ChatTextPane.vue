<template>
  <div class="w3-container w3-cell w3-theme2 chat-text-pane-main">
    <div class="w3-container w3-border-bottom w3-mobile chat-text-pane-header">
      <button type="button" class="w3-button w3-hover-none w3-hover-text-theme" v-on:click="toggleNav()">
        <font-awesome-icon icon="bars" />
      </button>
      <h2>Your Match</h2>
      <!--<h2>{{ currentContact.name }}</h2>-->
      <input
        type="button"
        class="meet-face-btn w3-button w3-orange w3-hover-theme w3-round-xlarge w3-margin-left"
        value="Meet Face-to-Face"
        v-on:click="videoChat"
      />
      <input
        type="button"
        class="meet-face-btn w3-button w3-blue w3-hover-theme w3-round-xlarge"
        value="Get Icebreaker Question"
        v-on:click="iceBreaker"
      />
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
          v-bind:class="'w3-round-xlarge bubble ' + color(chatMessage.sender) + ' ' + toneColor(chatMessage.tone)"
        >
          <div class="bubble-text">
            <p class="w3-padding msg-content">
              {{ chatMessage.message }}
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
import { mapGetters, mapActions, mapState } from "vuex";
import VueChatScroll from "vue-chat-scroll";
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faBars);
Vue.use(VueChatScroll);
export default {
  name: "ChatTextPane",
  components: {
    ChatTextPaneInput,
    FontAwesomeIcon,
  },
  methods: {
    sender(sender) {
      if (sender) {
        return "bubble-sender";
      } else {
        return "bubble-income";
      }
    },
    toneColor(tone) {
      tone = tone.toLowerCase()
      if(tone === 'anger' || tone === 'disgust' || tone === 'fear') {
        return 'w3-bottombar w3-leftbar w3-rightbar w3-topbar w3-border-red'
      }
      else if (tone === 'joy') {
        return 'w3-bottombar w3-leftbar w3-rightbar w3-topbar w3-border-green'
      }
      else {
        return ''
      }
    },
    color(sender) {
      if (sender) {
        return "w3-theme-d4";
      } else {
        return "w3-theme2-l4";
      }
    },
    toggleNav() {
      this.$parent.$emit("toggleNav");
    },
    ...mapActions("chat", ["videoChat", 'iceBreaker']),
  },
  computed: {
    ...mapGetters("chat", ["currentChat", "currentRoom"]),
    ...mapState(['token'])
  },
};
</script>
