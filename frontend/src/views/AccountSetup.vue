<template>
    <div>
        Hi from Account Setup
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:     'AccountSetup',
    computed: {
        ...mapState([
            'interestsAll',
            'interestsKnown',
            'identitiesAll',
            'identitiesKnown'
        ])
    }
}
</script>