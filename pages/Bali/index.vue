<template>
  <div class="text-center">
    <span class="mt-1 tracking-tight bg-gradient-to-r bg-clip-text text-transparent font-bold text-4xl from-teal-500 to-teal-900 sm:text-5xl lg:text-6xl">
      {{ $t("Bali") }}
    </span>

    <ul class="list-none text-center my-5 font-bold text-teal-700">
      <li class="flex justify-center items-center">
        <font-awesome-icon icon="fa-solid  fa-angles-down" />
        <a class="cursor-pointer ml-2 scroll text-gray-500" href="#first">{{ $t("First") }}</a>
      </li>
      <li class="flex justify-center items-center">
        <font-awesome-icon icon="fa-solid  fa-angles-down" />
        <a class="cursor-pointer ml-2 text-gray-500" href="#second">{{ $t("Second") }}</a>
      </li>
      <!--  <li class="flex justify-center items-center">
        <font-awesome-icon icon="fa-solid  fa-angles-down" />
        <a class="cursor-pointer ml-2 text-gray-500" href="#third">{{ $t("Third") }}</a>
      </li> -->
    </ul>

    <div id="first" class="scroll text-base text-justify">
      <h2 class="font-bold text-4xl mx-auto max-w-xl text-teal-700 mt-4">Post 1</h2>
      <!--       <p class="text-gray-500" v-if="en">Translated by Google</p> -->
      <p class="mx-auto mt-2 max-w-xl text-gray-500">
        {{ $t("bali.entry") }}
      </p>
      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.second") }}
      </p>
      <img class="w-full max-w-xl mx-auto mt-4" src="../../assets/1.jpg" />

      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.third") }}
      </p>
      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.fourth") }}
      </p>
      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.fifth") }}
      </p>
      <img class="w-full max-w-xl mx-auto mt-4" src="../../assets/2.jpg" />
      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.sixth") }}
      </p>
      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.seventh") }}
      </p>

      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.nineth") }}
      </p>
      <img class="w-full max-w-xl mt-4 mx-auto" src="../../assets/3.jpg" />
      <p class="mx-auto mt-5 max-w-xl text-gray-500">
        {{ $t("bali.tenth") }}
      </p>
      <div class="flex mt-5 lg:mt-10 justify-center mx-auto max-w-xl lg:h-[400px] z-1 mx-auto items-center">
        <vue3-video-player class="z-[1]" src="../assets/video.MOV"></vue3-video-player>
      </div>

      <div class="flex mt-5 lg:mt-10 justify-center mx-auto max-w-xl lg:h-[400px] z-1 mx-auto items-center">
        <vue3-video-player class="z-[1]" src="../assets/video2.MOV"></vue3-video-player>
      </div>
      <div class="flex mt-5 lg:mt-10 justify-center mx-auto max-w-xl lg:h-[400px] z-1 mx-auto items-center">
        <vue3-video-player class="z-[1]" src="../assets/video3.MOV"></vue3-video-player>
      </div>

      <img class="w-full max-w-xl mx-auto mt-4" src="../../assets/4.jpg" />
      <img class="w-full max-w-xl mx-auto mt-4" src="../../assets/5.jpg" />
      <img class="w-full max-w-xl mx-auto mt-4" src="../../assets/6.jpg" />
      <img class="w-full max-w-xl mx-auto mt-4" src="../../assets/7.jpg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
const en = computed(() => {
  return localStorage.getItem("lang") == "en" ? true : false
})
</script>

<style>
#first {
  scroll-margin-top: 200px;
}

@media screen and (min-width: 768px) {
  .play-pause-layer {
    bottom: -200px !important;
  }
}
</style>
