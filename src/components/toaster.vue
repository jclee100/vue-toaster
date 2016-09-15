<template>
    <div class="toaster">
        <div class="toast ui floating message"
             v-for="toast in toasts"
             transition="expand"
             v-bind:class="classes(toast)"
             @click="close(toast)"
                >
            <div class="content">
                {{toast.message}}
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    let selfDestruct = 3500;
    export default {
        props: {
            toasts: {
                default() {
                    return []
                },
                type: Array
            }
        },
        methods: {
            classes(toast) {
                let classes = [];
                if(!Array.isArray(toast.classes) && toast.classes){
                    classes = [toast.classes]
                } else {
                    classes = toast.classes;
                }
                return classes;
            },
            close(toast) {
                this.toasts.splice(this.toasts.findIndex(i => i.id == toast.id), 1);
            }
        },
        watch: {
            toasts(val) {
                let self = this;
                // For evey new toast, set a dismiss timer
                val.forEach((elem, index) => {
                    console.log(index);
                    if(!elem.id) {
                        self.toasts[index].id = Date.now() + self.toasts.length;
                        setTimeout(function(){
                            self.toasts.splice(index, 1);
                        }, selfDestruct);
                    }
                });
            }
        }
    }
</script>
<style>
    .toaster {
        bottom: 10px;
        right: 10px;
        position: fixed;
        width: 260px;
    }
    .toaster .toast {
        height: 80px;
        margin-bottom: 10px;
        background-color: #eee;
        padding: 10px;
        cursor: pointer;
    }
    /* always present */
    .expand-transition {
        transition: all .5s ease;
        overflow: hidden;
    }
    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter, .expand-leave {
        height: 0;
        padding: 0 10px;
        opacity: 0;
    }
</style>