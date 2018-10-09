<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap align-center>
        <v-flex xs10 class="text-xs-left">
          <h2>Employee Management</h2>
        </v-flex>
        <v-flex xs2 class="text-xs-right">
          <v-btn icon flat color="primary" @click="updateEmployeeList" :loading="loading">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-container class="px-0 py-4" grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search" />
                  </v-card-title>
                  <v-data-table :headers="headers" :items="items" :search="search" :loading="loading">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.employeeId }}</td>
                      <td>{{ props.item.name }}</td>
                      <td>{{ new Date(props.item.employmentDate).toDateString() }}</td>
                      <td>{{ props.item.email }}</td>
                      <td>{{ !props.item.position ? '-' : props.item.position }}</td>
                      <td class="fc-text-capitalize">{{ props.item.role }}</td>
                      <td :class="props.item.status === 'new' ? 'warning--text fc-text-capitalize' : 'success--text fc-text-capitalize' ">
                        {{ props.item.status === 'new' ? 'Pending' : props.item.status }}
                      </td>
                    </template>
                  </v-data-table>
                </v-card>
              </v-flex>
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
      loading: false,
      search: '',
      headers: [
        { text: 'Employee ID', value: 'employeeId' },
        { text: 'Employee Name', value: 'name' },
        { text: 'Employment Date', value: 'employmentDate' },
        { text: 'Email', value: 'email' },
        { text: 'Position', value: 'position' },
        { text: 'Role', value: 'role' },
        { text: 'Status', value: 'status' }
      ],
      items: []
    }
  },
  methods: {
    async fetchData() {
      return await server.get('/api/user/employee', {
        headers: {
          Authorization: store.getters['auth/getToken']
        }
      })
    },
    async updateEmployeeList() {
      this.loading = true
      const res = await this.fetchData()
      const result = res.data.result
      this.items = []
      result.forEach(element => {
        this.items.push(element)
      })
      this.loading = false
    }
  },
  async created() {
    this.loading = true
    const res = await this.fetchData()
    const result = res.data.result
    result.forEach(element => {
      this.items.push(element)
    })
    this.loading = false
  }
}
</script>

