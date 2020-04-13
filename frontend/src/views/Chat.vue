<template>
    <div>
        Hi from Chat
    </div>
</template>

<script>
import ChatVideo from '../components/ChatVideo'
import ChatTextPane from '../components/ChatTextPane'
import ChatConversationList from '../components/ChatConversationList'
export default {
    name: 'Chat',
    components: [
        ChatVideo,
        ChatTextPane,
        ChatConversationList
    ]
}
</script>