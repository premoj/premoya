<template>
  <div class="min-h-full flex">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
        </div>

        <div class="mt-8">
          <div>
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-200">Sign in with</p>

              <div class="mt-1 grid grid-cols-2 gap-3">
                <div>
                  <AppButton class="w-full">Facebook</AppButton>
                </div>

                <div><AppButton class="w-full">Google</AppButton></div>
              </div>
            </div>

            <div class="mt-6 relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true"></div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 text-gray-500 dark:text-gray-200"> Or continue with </span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6">
              <div>
                <div class="mt-1">
                  <FormKit type="email" label="Student email address" validation="required|email" validation-visibility="dirty" />
                </div>
              </div>

              <div class="space-y-1">
                <div class="mt-1">
                  <FormKit type="password" name="password" label="Password" validation="required" validation-visibility="dirty" />
                </div>
              </div>

              <div v-if="register" class="space-y-1">
                <div class="mt-1">
                  <FormKit type="password" name="passwordConfirm" label="Confirm password" validation="required" validation-visibility="dirty" />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded" />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-200"> Remember me </label>
                </div>

                <div v-if="!register" class="text-sm">
                  <a href="#" class="font-medium text-teal-700 hover:text-teal-500"> Forgot your password? </a>
                </div>
              </div>

              <div class="flex" v-if="register">
                <AppButton class="mr-2" @click="signUp"> Sign up</AppButton>
                <AppButton :type="ButtonType.BORDER" @click="register = !register"> Sign in </AppButton>
              </div>
              <div class="flex" v-else>
                <AppButton class="mr-2" @click="signIn"> Sign in </AppButton>
                <AppButton :type="ButtonType.BORDER" @click="register = !register"> Sign up</AppButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { ref } from "vue"
import { useUserStore } from "@/store/user"
import { ButtonVariant, ButtonType } from "~/types/Button.utils"

const userStore = useUserStore()

const register = ref(false)
const signUp = () => {
  const data = {
    email: "chovpr@gmail.com",
    password: "testtest",
    firstname: "Prema",
    surname: "Ocas",
  }
  userStore.signUp(data)
}

const signIn = () => {
  const data = {
    email: "chovpr@gmail.com",
    password: "testtest",
  }
  userStore.signIn(data)
}
</script>

<style></style>
