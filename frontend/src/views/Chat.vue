<template>
    <div class="w3-container chat-main">
        <!--<ChatUserProfile />-->
        <ChatConversationList />
		<ChatTextPane />
        
		
    </div>
</template>

<script>
import ChatTextPane from '../components/ChatTextPane'
import ChatConversationList from '../components/ChatConversationList'
import LoginFooter from '../components/LoginFooter'
import ChatUserProfile from '../components/ChatUserProfile'
export default {
    name:       'Chat',
    components: {
        ChatTextPane,
        ChatConversationList,
        LoginFooter,
        ChatUserProfile
    }
}
</script>