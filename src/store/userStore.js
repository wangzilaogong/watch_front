import { defineStore } from 'pinia';
export const userStore = defineStore('userStore', {
    state: () => ({
        title: '',
    }),
    getters: {
    },
    actions: {
        changeTitle(val) {
            this.title = val
        },
    }
})
