<template>
  <div class="bg-white" ref="client">
    <div class="z-50 bottom-10 fixed -right-[350px] w-full md:w-auto md:min-w-[350px]">
      <transition-group name="list-complete">
        <div class="list-complete-item" v-for="notification in NM.notifications" :key="notification.id">
          <AppNotification :width="client.clientWidth" :notification="notification" />
        </div>
      </transition-group>
    </div>

    <div>
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </TransitionChild>

          <div class="fixed inset-0 flex z-40">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-300"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-300"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="absolute top-0 right-0 pt-2">
                    <button
                      type="button"
                      class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      @click="sidebarOpen = false"
                    >
                      <span class="sr-only">Close sidebar</span>
                      <font-awesome-icon class="text-black" icon="fa-solid fa-xmark" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex-shrink-0 flex items-center px-4">
                  <img class="h-8 w-auto" :src="logo" alt="Workflow" />
                </div>
                <div class="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav class="px-2 space-y-1">
                    <NuxtLink
                      @click="selectOption(item)"
                      v-for="item in navigation"
                      :key="item.name"
                      :to="item.path"
                      :class="[
                        item.current
                          ? 'bg-gradient-to-r from-teal-700 to-teal-900 text-white  hover:brightness-125 transition-all duration-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group navigation flex items-center px-3 py-3 text-base font-medium rounded-lg',
                      ]"
                    >
                      <font-awesome-icon class="mr-2" :icon="item.icon" />
                      {{ item.name }}
                    </NuxtLink>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
            <div class="flex-shrink-0 w-14" aria-hidden="true">
              <!-- Dummy element to force sidebar to shrink to fit close icon -->
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Static sidebar for desktop -->
      <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div class="flex flex-col flex-grow my-shadow pt-5 bg-white overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <img class="h-8 w-auto" :src="logo" alt="Workflow" />
          </div>
          <div class="mt-5 flex-grow flex flex-col">
            <nav class="flex-1 px-2 pb-4 space-y-1">
              <NuxtLink
                :to="item.path"
                class="cursor-pointer"
                @click="selectOption(item)"
                v-for="item in navigation"
                :key="item.name"
                :class="[
                  item.current
                    ? 'bg-gradient-to-r  from-teal-700 to-teal-900 text-white hover:brightness-125 transition-all duration-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex navigation items-center px-3 py-3 text-sm font-medium rounded-lg',
                ]"
              >
                <font-awesome-icon class="mr-2" :icon="item.icon" />
                <font-awesome-icon class="text-black" icon="fa-solid fa-xmark" />

                {{ $t(item.name) }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
      <div class="md:pl-64 flex flex-col flex-1">
        <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white my-shadow">
          <button type="button" class="px-4 border-gray-200 text-gray-500 md:hidden" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <font-awesome-icon icon="fa-solid fa-bars" />
          </button>
          <div class="flex-1 px-4 flex justify-between">
            <div class="flex-1 flex">
              <form class="w-full flex md:ml-0" action="#" method="GET">
                <label for="search-field" class="sr-only">Search</label>
                <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div class="flex items-center">
                  <MenuButton v-if="loggedIn" class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
                    <span class="sr-only">Open user menu</span>

                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </MenuButton>

                  <NuxtLink v-else to="/auth">
                    <font-awesome-icon class="text-xl hover:text-teal-900 transition-all text-black" icon="fa-regular fa-user" />
                  </NuxtLink>
                  <AppLanguageSelector class="ml-2" />
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem @click="navigateUser(item)" v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm cursor-pointer text-gray-700']">{{ item.name }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>

        <main class="flex-1">
          <NuxtPage />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.svg"
import { onMounted, ref, reactive, watch } from "vue"
import { Notification, Variant } from "~/types/Notification.types"
import { NotificationManager } from "@/types/NotificationManager.types"
import { useRoute, useRouter } from "#app"

import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from "@headlessui/vue"

const selectOption = item => {
  navigation.forEach(item => {
    item.current = false
  })
  sidebarOpen.value = false
  item.current = true
}
const navigation = reactive([
  { name: "Home", icon: "fa-user", path: "/", current: true },
  { name: "Collections", icon: ["fa-regular", "fa-user"], path: "/collections", current: false },
  { name: "Sales", icon: ["far", "fa-xmark"], path: "/sales", current: false },
  { name: "About", iicon: ["fa-regular", "fa-user"], path: "/about", current: false },
  { name: "Events", icon: ["fa-regular", "fa-user"], path: "/events", current: false },
  { name: "Contacts", icon: ["fa-regular", "copy"], path: "/contacts", current: false },
  { name: "Blog", icon: ["fa-regular", "copy"], path: "/blog", current: false },
])

const userNavigation = [
  { name: "Your Profile", path: "/profile" },
  { name: "Payments", href: "#", path: "/payments" },
  { name: "Sign out", href: "#" },
]

const router = useRouter()

const sidebarOpen = ref(false)

const loggedIn = computed(() => {
  return true
})

const navigateUser = item => {
  if (item.name === "Sign out") {
  }

  router.push(item.path)
}

const currentRoute = useRoute()

const client = ref(null)
const NM = NotificationManager.getInstance()

onMounted(() => {
  NM.create({ message: "test", variant: Variant.SUCCESS, title: "Ahoj", closable: true })
})
</script>

<style lang="css">
#app {
  @apply min-h-screen font-sans;
}

.navigation {
  font-family: "Raleway";
  font-weight: 600;
}

body {
  background: white;
}
</style>
