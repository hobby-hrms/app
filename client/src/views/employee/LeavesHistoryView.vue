<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>Leave History</h2>
        </v-flex>
        <v-flex xs12>
          <v-container class="px-0 py-4" grid-list-md>
            <v-layout row wrap>

            </v-layout>
            <v-layout row wrap>
              // layout 2
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-content>
  </v-container>
</template>

<script>
import { server } from '@/store/helpers/axios.helper'
import { store } from '@/store/index'

export default {
  data() {
    return {

    }
  },
  methods: {
    async fetchData() {
      return await server.get('/api/leave/apply', {
        headers: {
          Authorization: store.getters['auth/getToken']
        }
      })
    }
  },
  async created() {
    const res = await this.fetchData()
    const result = res.data.result
    console.log(result)
  }
}
</script>
