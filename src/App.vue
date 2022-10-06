<template>
  <div class="app">
    <div>
      <h3>Countries</h3>
      <div v-if="countries && countries.value && countries.value.length">
        <ul v-for="(country, index) in countries.value" :key="country.id">
          <li>{{ index + 1 }}. {{ country.name }}</li>
        </ul>
      </div>
    </div>

    <div>
      <h3>Cities</h3>
      <SearchCountry />
      <div v-if="countries && cities.length">
        <ul v-for="(city, index) in cities" :key="city.id">
          <li>{{ index + 1 }}. {{ city.name }}</li>
        </ul>
      </div>
    </div>

    <div>
      <div v-for="item in items" :key="item.id">
        {{ item.name }}
      </div>
      <button @click="pushItem">Push</button>
      <button @click="clearItems">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref} from "vue";
import { useCountries } from './stores/countries.js'
import SearchCountry from "./components/SearchCountry.vue";

const countriesStore = useCountries()
const countries = countriesStore.countries
const cities = countriesStore.cities

const items: Ref<any> = ref([])

onMounted(() => {
  countriesStore.getCountries()
  countriesStore.getCities()
})

function pushItem() {
  items.value.push({ name: 'Test', id: 1 })
}

function clearItems() {
  items.value = []
}
</script>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-column-gap: 10px;
  grid-row-gap: 1em;

  max-width: 1200px;
  padding: 16px;
  margin: auto;

  background: lightgrey;
}

</style>
