let Vue = require('vue');

// Components
let Toaster = require('./components/toaster.vue');

// Vue instance
let vm = new Vue({
    el: '#app',
    data: {
        toasts: []
    },
    methods: {
        addToast(){
            this.toasts.push({
                message: `Test toast ${Date.now()}. Click to dismiss.`, // Customize message
                classes: '' // Add custom classes
            });
        }
    },
    components: {
        Toaster
    }
});

// Global addToast function
global.addToast = function(message, classes){
    vm.toasts.push({message, classes});
};