<template>
  <div class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <h2 class="sr-only">Checkout</h2>

    <div id="card" class="border border-gray-300 py-3 px-2 rounded-md"></div>

    <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      <div class="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
        <div class="col-span-4">
          <label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label>
          <div class="mt-1">
            <input
              type="text"
              id="card-number"
              name="card-number"
              autocomplete="cc-number"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="col-span-4">
          <label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label>
          <div class="mt-1">
            <input
              type="text"
              id="name-on-card"
              name="name-on-card"
              autocomplete="cc-name"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="col-span-3">
          <label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
          <div class="mt-1">
            <input
              type="text"
              name="expiration-date"
              id="expiration-date"
              autocomplete="cc-exp"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
          <div class="mt-1">
            <input
              type="text"
              name="cvc"
              id="cvc"
              autocomplete="csc"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <AppButton @click="send">Ssend</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "#app"

const router = useRouter()

let stripe = null
let elements = null
let loading = ref(true)
const style = {
  style: {
    base: {
      iconColor: "#000",
      color: "#374151",
      fontWeight: "inherit",
      fontSize: "16px",
      fontFamily: "inherit",

      ":-webkit-autofill": {
        color: "#374151",
      },
      "::placeholder": {
        color: "#374151",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "red",
    },
  },
}

onMounted(async () => {
  let data = { price: 200 }
  const { price } = data
  console.log(price)
  const ELEMENT_TYPE = "card"
  console.log(import.meta.env.VITE_PUBLISHABLE_KEY)
  stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
  elements = stripe.elements()
  const element = elements.create(ELEMENT_TYPE, { hidePostalCode: true, style })
  element.mount("#card")
  loading.value = false
})

const send = async () => {
  if (!loading.value) {
    loading.value = true
    const data = {
      price: "1999",
    }

    const cardElement = elements.getElement("card")

    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API}/stripe`,
        { amount: 2000 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const { secret } = await resp.data
      console.log(secret)

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      })

      const { error } = await stripe.confirmCardPayment(secret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })

      loading.value = false
      router.push("/contacts")
    } catch (e: any) {
      loading.value = false
    }
  }
}
</script>

<style></style>
