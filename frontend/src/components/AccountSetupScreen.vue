<template>
    <div>
        <h1> {{message}} </h1>
        <div
            v-for='(obj, index) in allColors'
            v-bind:key='obj.index'
            v-bind:class='"w3-container w3-btn w3-circle w3-border w3-border-" + obj.color + " " + circleColor(index, obj.color)'
            v-on:click='elementClickHandler(index)'
        >
            {{obj.element}}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:  'AccountSetupScreen',
    props: { 
        elementType: String,
        message:     String
    },
    data: () => ({
        colorArray: ['red','pink','purple','indigo','blue','aqua','teal','green','lime','khaki','amber','orange','deep-orange','grey','black']
    }),
    methods: {
        ...mapMutations('accountSetup', ['elementAdd', 'elementRemove']),
        circleColor(index, color) {
            if(Object.keys(this.known).includes(index)) {
                return 'w3-light-grey'
            }
            else {
                return 'w3-' + color
            }
        },
        elementClickHandler(index) {
            if(Object.keys(this.known).includes(index)) {
                this.elementRemove({ index, elementType: this.elementType })
            }
            else {
                this.elementAdd({ index, elementType: this.elementType })
            }
        }
    },
    computed: {
        ...mapState('accountSetup', {
            all: function(state) {
                return state[this.elementType + 'All']
            },
            known: function(state) {
                return state[this.elementType + 'Known']
            }
        }),
        allColors(){
            const retObj = {}
            for( const key in this.all) {
                retObj[key] = {
                    element: this.all[key],
                    color:   this.colorArray[Math.floor(Math.random()*this.colorArray.length)]
                }
            }
            return retObj
        }
    }
}
</script>