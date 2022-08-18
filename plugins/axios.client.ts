import axios from "axios"

import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
  axios.defaults.baseURL = "http://localhost:8080"
  axios.defaults.headers.common["Content-Type"] = "application/json; charset=UTF-8"

  axios.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
      if (error.response || error.request) {
        return Promise.reject(error.response)
      }
    }
  )
})
