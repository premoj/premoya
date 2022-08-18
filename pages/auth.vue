<template>
  <div class="min-h-full flex">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-teal-700.svg" alt="Workflow" />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Or
            {{ " " }}
            <a href="#" class="font-medium text-teal-700 hover:text-teal-500"> start your 14-day free trial </a>
          </p>
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
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200"> Email address </label>
                <div class="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200"> Password </label>
                <div class="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded" />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-200"> Remember me </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-medium text-teal-700 hover:text-teal-500"> Forgot your password? </a>
                </div>
              </div>

              <div>
                <AppButton @click="signUp"> Sign in </AppButton>
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
import { getMaxListeners } from "process"
const signUp = async () => {
  const data = {
    email: "chovpr@gmail.com",
    password: "testtest",
    firstname: "Prema",
    surname: "Ocas",
  }
  const post = await axios.put("/auth/signup", data)
}
</script>

<style></style>
