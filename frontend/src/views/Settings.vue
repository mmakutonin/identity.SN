<template>
    <div v-bind:class='"w3-container " + bgColor '>
        <input
            type='checkbox'
            class='w3-check'
            v-model='darkBgColor'
        />
        <label> Light Mode </label>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
    name: 'Settings',
    computed: {
        ...mapGetters(['darkMode']),
        ...mapState(['bgColor']),
        darkBgColor: {
            get() {
                return this.darkMode
            },
            set(newVal) {
                this.$store.commit({
                    type: 'darkMode',
                    darkMode: newVal
                })
            }
        }
    }
}
</script>