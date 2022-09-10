<template>
  <div class="overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
    <div class="relative mx-auto max-w-xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.
        </p>
      </div>
      <div class="mt-12">
        <form action="#" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <div class="mt-1">
              <FormKit type="text" autocomplete="given-name" label="First name" validation="required" validation-visibility="dirty" />
            </div>
          </div>
          <div>
            <div class="mt-1">
              <FormKit type="text" autocomplete="family-name" label="Family name" validation="required" validation-visibility="dirty" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="mt-1">
              <FormKit type="text" autocomplete="company" label="Company" validation="required" validation-visibility="dirty" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="mt-1">
              <div class="mt-1">
                <FormKit type="email" autocomplete="email" label="Email address" validation="required|email" validation-visibility="dirty" />
              </div>
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="relative mt-1 rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 flex items-center">
                <label for="country" class="sr-only">Country</label>
                <select
                  id="country"
                  name="country"
                  class="h-full rounded-md border-transparent bg-transparent py-0 pl-4 pr-8 text-gray-500 focus:border-teal-500 focus:ring-teal-500"
                >
                  <option>US</option>
                  <option>EU</option>
                  <option>CZE</option>
                </select>
              </div>

              <FormKit type="text" autocomplete="phone" label="Phone number" validation="required" validation-visibility="dirty" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="mt-1">
              <FormKit type="textarea" rows="4" autocomplete="given-name" label="Message" validation="required" validation-visibility="dirty" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Switch
                  v-model="agreed"
                  :class="[
                    agreed ? 'bg-gradient-to-r from-teal-700 to-teal-900' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2',
                  ]"
                >
                  <span class="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    :class="[
                      agreed ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    ]"
                  />
                </Switch>
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-500">
                  By selecting this, you agree to the
                  {{ " " }}
                  <a href="#" class="font-medium text-gray-700 underline">Privacy Policy</a>
                  {{ " " }}
                  and
                  {{ " " }}
                  <a href="#" class="font-medium text-gray-700 underline">Cookie Policy</a>.
                </p>
              </div>
            </div>
          </div>
          <div class="sm:col-span-2">
            <AppButton
              type="submit"
              class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Let's talk
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Switch } from "@headlessui/vue"

const agreed = ref(false)
</script>

<style></style>
