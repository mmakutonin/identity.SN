<template>
    <div>
        Hi from Chat
		<ChatTextPane />
		<ChatConversationList />
    </div>
</template>

<script>
import ChatTextPane from '../components/ChatTextPane'
import ChatConversationList from '../components/ChatConversationList'
export default {
    name:       'Chat',
    components: {
        ChatTextPane,
        ChatConversationList
    }
}
</script>