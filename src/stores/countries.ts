import { defineStore } from "pinia";
import gql from "graphql-tag";
import { ref } from "vue";
import type { Ref } from "vue";
import { apolloClient } from "@/plugins/apollo.js";
import { GET_CITIES } from "@/gql/city";

interface ICountry {
  name: string;
  id: string;
}

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
        Object.assign(this.countries, result.data.countries);
      });
  }

  function getCities() {
    apolloClient.query({ query: GET_CITIES }).then((result) => {
      console.log(result);
      Object.assign(this.cities, result.data.cities);
    });
  }

  return { countries, cities, getCountries, getCities };
});
