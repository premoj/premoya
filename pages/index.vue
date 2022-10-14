<template>
  <div class="text-center text-base">
    <span class="mt-1 tracking-tight bg-gradient-to-r bg-clip-text text-transparent font-bold text-4xl from-teal-500 to-teal-900 sm:text-5xl lg:text-6xl">
      {{ $t("Home") }}
    </span>
    <p class="mx-auto mt-0 max-w-xl text-sm font-semibold uppercase text-gray-500">
      {{ $t("home.no") }}
    </p>
    <p class="mx-auto mt-5 max-w-xl text-gray-500">
      {{ $t("home.entry") }}
    </p>

    <p class="text-gray-500 max-w-xl mx-auto text-justify my-4">
      {{ $t("home.about") }}
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
