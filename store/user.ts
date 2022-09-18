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
        const resp = await axios.post(`${import.meta.env.VITE_API}/auth/login`, data)
        this.loggedIn = true
        console.log(resp)
      } catch (e: any) {
        console.log(e)
      }
    },
    async signUp(data: any) {
      console.log(`${import.meta.env.VITE_API}/auth/signup`)
      const resp = await axios.put(`${import.meta.env.VITE_API}/auth/signup`, data)
    },
  },
})
