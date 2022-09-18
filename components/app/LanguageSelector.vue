<template>
  <Listbox as="div" v-model="$i18n.locale">
    <div class="relative mt-1">
      <ListboxButton class="relative w-full cursor-pointer bg-gray-100 md:bg-white flex rounded-md border-gray-300 bg-white py-2 text-center px-5 sm:text-sm">
        <span class="flex items-center">
          <img :src="getImage($i18n.locale)" alt="" class="h-8 w-8 rounded-full object-cover flex-shrink-0" />
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <font-awesome-icon class="text-black" icon="fa-regular fa-chevron-up" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            @click="changeLanguage(lang.name)"
            as="template"
            v-for="lang in languages"
            :key="lang.name"
            :value="lang.name"
            v-slot="{ active, selected }"
          >
            <li :class="[active ? 'text-white bg-gradient-to-r from-teal-700 to-teal-900' : 'text-gray-900', 'relative cursor-pointer select-none py-2  px-5']">
              <div class="flex items-center justify-center">
                <img :src="lang.img" alt="" class="h-6 w-6 flex-shrink-0 object-cover rounded-full" />
              </div>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-teal-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"> </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref } from "vue"
import cze from "@/assets/cz.svg"
import en from "@/assets/us.svg"
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue"
const languages = [
  {
    name: "cs",
    img: cze,
  },
  {
    name: "en",
    img: en,
  },
]

const getImage = locale => {
  return locale === "cs" ? languages[0].img : languages[1].img
}

const changeLanguage = lang => {
  localStorage.setItem("lang", lang)
}
</script>

<style lang="scss" scoped>
.language {
  height: 100%;
  font-weight: bold;
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(3px);
  opacity: 0.8;
  transition: 1s;
}

.language:hover {
  transition: 1s;
  background-color: Black;
  opacity: 1;
}

.language-wrapper {
  background: black;
  height: 50px;
}
</style>
