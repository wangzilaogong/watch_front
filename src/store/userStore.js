import { defineStore } from 'pinia';
export const userStore = defineStore('userStore', {
    state: () => ({
        title: '',
        account:''
    }),
    getters: {
    },
    actions: {
        changeTitle(val) {
            this.title = val
        },
        changeAccount(val) {
            this.account= val
        },
    }
})
