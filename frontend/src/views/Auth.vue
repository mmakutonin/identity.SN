<template>
    <h1> You were Authenticated! Let's get you redirected...</h1>
</template>

<script>
export default {
    name: 'Auth',
    created() {
        this.$store.commit({
            type: 'setUser',
            id: this.$route.query.id,
            token: this.$route.query.token
        })
        if(this.$route.query.newuser) {
            this.$router.push('/fill-info')
        }
        else {
            this.$router.push('/chat')
        }
    }
}
</script>