import { defineStore } from "pinia";
import gql from "graphql-tag";
import { ref } from "vue";
import type { Ref } from "vue";
import { apolloClient } from "@/plugins/apollo.js";
import { GET_CITIES, SEARCH_COUNTRIES } from "@/gql/city";

interface ICountry {
  name: string;
  id: string;
}

let timer = null;

export const useCountries = defineStore("countries", () => {
  const countries: Ref<ICountry[]> = ref([]);
  const cities: Ref<ICountry[]> = ref([]);

  function getCountries() {
    apolloClient
      .query({
        query: gql`
          query countries {
            countries {
              id
              name
            }
          }
        `,
      })
      .then((result) => {
        this.countries = [...result.data.countries]
        // Object.assign(this.countries, result.data.countries);
        console.log(this.countries)
      });
  }

  function getCities() {
    apolloClient.query({ query: GET_CITIES }).then((result) => {
      console.log(result);
      Object.assign(this.cities, result.data.cities);
    });
  }

  function searchCity(slug: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      apolloClient
        .query({
          query: SEARCH_COUNTRIES,
          variables: {
            slug,
          },
        })
        .then((result) => {
          this.cities.push(result.data.city)
          console.log(this.cities);
        });
    }, 400);
  }

  return { countries, cities, getCountries, getCities, searchCity };
});
