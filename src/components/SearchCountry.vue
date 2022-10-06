<template>
  <div>
    <input type="url" placeholder="Search by slug!" v-model="search" @input="searchCity" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useCountries } from "@/stores/countries.js";

const countriesStore = useCountries();
const search: Ref<string> = ref("");

function searchCity() {
  search.value
    ? countriesStore.searchCity(search.value)
    : countriesStore.getCities();
}
</script>
