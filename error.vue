<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
      This example requires updating your template:
  
      ```
      <html class="h-full">
      <body class="h-full">
      ```
    -->
  <main
    class="h-full fixed w-full bg-cover bg-top sm:bg-top"
    style="
      background-image: url('https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75');
    "
  >
    <div class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
      <p class="text-base font-semibold text-black text-opacity-50">404</p>
      <h1 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">{{ $t("Lost") }}</h1>
      <p class="mt-2 text-base font-medium text-black text-opacity-50">{{ $t("LostDescription") }}</p>
      <div class="mt-6">
        <a
          @click="$router.push('/')"
          href="#"
          class="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
          >{{ $t("Go back home") }}</a
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
