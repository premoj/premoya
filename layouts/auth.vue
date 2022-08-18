<template>
  <div class="home bg-red-500 w-40 h-40"></div>
</template>

<style lang="scss" scoped>
.home {
  @apply h-screen flex flex-row items-center justify-center text-gray-600;
  @apply dark:bg-gray-900 dark:text-gray-100;

  .card {
    @apply my-4 p-8 rounded-2xl border border-gray-100 shadow-md;
    @apply dark:border-gray-400 dark:shadow-none;

    .title {
      @apply mb-2 text-gray-600 text-3xl font-thin;
      @apply dark:text-blue-400;
    }

    .credit {
      @apply text-xs mt-2;
    }

    a {
      @apply text-blue-600 underline;
      @apply dark:text-blue-200;
    }
  }
}
</style>
