<template>
  <div class="w3-container chat-main">
    <!--<ChatUserProfile />-->
    <!--<div id="nav-icon" v-if="mobileView">
      <input type="button" class="w3-button w3-green bar-icon" value="Toggle" />
    </div>-->
    <ChatConversationList />
    <ChatTextPane />
    
  </div>
</template>

<script>
import ChatTextPane from "../components/ChatTextPane";
import ChatConversationList from "../components/ChatConversationList";
import LoginFooter from "../components/LoginFooter";
import ChatUserProfile from "../components/ChatUserProfile";
export default {
  name: "Chat",
  data: () => {
    return {
      mobileView: false,
      showNav: false,
    };
  },
  components: {
    ChatTextPane,
    ChatConversationList,
    LoginFooter,
    ChatUserProfile,
  },
  /*computed: {
    mobileView () {
      return window.innerWidth <= 990;
    }
  }*/
  /*methods: {
      handleView() {
          this.mobileView = window.innerWidth <= 990;
      }
  },
  created() {
      this.handleView();
  }*/
};
</script>