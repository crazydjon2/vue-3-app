<template>
  <div v-if="countries && countries.length">
    <ul v-for="(country, index) in countries" :key="country.id">
      <li>{{ index + 1 }}. {{ country.name }}</li>
    </ul>
  </div>
  <div v-if="countries && cities.length">
    <ul v-for="(city, index) in cities" :key="city.id">
      <li>{{ index + 1 }}. {{ city.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import gql from "graphql-tag";
import { onMounted } from "vue";
import { useCountries } from './stores/countries.js'

const countriesStore = useCountries()
const countries = countriesStore.countries
const cities = countriesStore.cities

onMounted(() => {
  countriesStore.getCountries()
  countriesStore.getCities()
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
