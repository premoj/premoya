import { defineStore } from "pinia"
import axios from "axios"

export const useUserStore = defineStore({
  id: "dao",
  state: () => ({
    loggedIn: false,
    token: String,
  }),
  actions: {
    async signIn(data: any) {
      try {
        const resp = await axios.put("/auth/signup", data)
        this.lgogedIn = true
      } catch (e: any) {
        console.log(e)
      }
    },
    async signUp(data: any) {
      const resp = await axios.put("/auth/signup", data)
    },
  },
})
