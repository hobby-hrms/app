<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap align-center>
        <v-flex xs6>
          <h2>Welcome back, {{ nickname }}</h2>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <span>{{ time }}</span>
        </v-flex>
        <v-flex xs12>
          <v-container class="px-0 py-4" grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs10>
                <h3>Leave Applications</h3>
              </v-flex>
              <!-- <v-flex xs2 class="text-xs-right">
                <v-btn icon flat color="primary" @click="updateEmployeeList" :loading="loading">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </v-flex> -->
              <v-flex xs12>
                <v-card>
                  <v-data-table :headers="leaveHeaders" :items="leaveItems" :loading="leaveLoading">
                    <template slot="items" slot-scope="props">
                      <!-- Admin View -->
                      <td v-if="role === 'superuser' || role === 'administrator'">{{ props.item.user.employeeId }}</td>
                      <td v-if="role === 'superuser' || role === 'administrator'">{{ props.item.user.name }}</td>
                      <td v-if="role === 'superuser' || role === 'administrator'" class="fc-text-capitalize">{{ props.item.leave }}</td>
                      <td v-if="role === 'superuser' || role === 'administrator'">{{ parseInt(props.item.totalDays).toString() + ' day(s)' }}</td>
                      <td v-if="role === 'superuser' || role === 'administrator'" :class="determineStatus(props.item.status)">{{ props.item.status }}</td>
                      <td v-if="role === 'superuser' || role === 'administrator'" class="text-xs-left">
                        <v-btn icon class="mx-0" @click="viewLeave(props.item)">
                          <v-icon color="primary">info_outline</v-icon>
                        </v-btn>
                      </td>
                      <!-- Employee View -->
                      <td v-if="role === 'employee'" class="fc-text-capitalize">{{ props.item.leave }}</td>
                      <td v-if="role === 'employee'">{{ new Date(props.item.startDate).toDateString() }}</td>
                      <td v-if="role === 'employee'">{{ new Date(props.item.endDate).toDateString() }}</td>
                      <td v-if="role === 'employee'">{{ parseInt(props.item.totalDays).toString() + ' day(s)' }}</td>
                      <td v-if="role === 'employee'" :class="determineStatus(props.item.status)">{{ props.item.status }}</td>
                      <td v-if="role === 'employee'" class="text-xs-left">
                        <v-btn icon class="mx-0" @click="viewLeave(props.item)">
                          <v-icon color="primary">info_outline</v-icon>
                        </v-btn>
                      </td>
                    </template>
                  </v-data-table>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="py-4">
              <v-flex xs12>
                <h3>Claims Applications</h3>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-data-table :headers="claimHeaders" :items="claimItems" :loading="claimLoading">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.employeeId }}</td>
                      <td>{{ props.item.name }}</td>
                      <td>{{ props.item.claimType }}</td>
                      <td>{{ props.item.amount }}</td>
                    </template>
                  </v-data-table>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-content>
    <v-dialog v-model="dialog" max-width="800px">
      <v-container class="fc-dialog-background" grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <h2>
              {{ vDialogHeader }}
            </h2>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <span class="fc-text-bold">Leave Type</span>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <span class="fc-text-capitalize">{{ vDialogContent.leave }}</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span class="fc-text-bold">Application Date</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span>{{ new Date(vDialogContent.createdOn).toDateString() }}</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span class="fc-text-bold">Start Date</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span>{{ new Date(vDialogContent.startDate).toDateString() }}</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span class="fc-text-bold">End Date</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span>{{ new Date(vDialogContent.endDate).toDateString() }}</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span class="fc-text-bold">Total Days</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span>{{ parseInt(vDialogContent.totalDays).toString() + ' day(s)' }}</span>
          </v-flex>
          <v-flex xs12 sm6 class="py-4">
            <span class="fc-text-bold">Purpose</span>
          </v-flex>
          <v-flex xs12 sm6 class="py-4">
            <span>{{ vDialogContent.purpose }}</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span class="fc-text-bold">Class Replacements</span>
          </v-flex>
          <v-flex xs12 sm6>
            <span>{{ vDialogContent.classReplacements.length === 0 ? 'No' : 'Yes' }}</span>
          </v-flex>
          <v-flex xs12 sm6 v-if="vDialogContent.classReplacements.length === 0">
            <span class="fc-text-bold">Reason</span>
          </v-flex>
          <v-flex xs12 sm6 v-if="vDialogContent.classReplacements.length === 0">
            <span>{{ vDialogContent.noClassReason }}</span>
          </v-flex>
          <v-flex xs12 v-if="vDialogContent.classReplacements.length > 0">
            <v-layout row wrap>
              <v-flex xs3>
                <span class="fc-text-bold">Date</span>
              </v-flex>
              <v-flex xs3>
                <span class="fc-text-bold">Time</span>
              </v-flex>
              <v-flex xs3>
                <span class="fc-text-bold">Class Code</span>
              </v-flex>
              <v-flex xs3>
                <span class="fc-text-bold">Lecture Room</span>
              </v-flex>
              <template v-for="classes in vDialogContent.classReplacements">
                <v-flex xs3 :key="classes.index">
                  {{ classes.classDate }}
                </v-flex>
                <v-flex xs3 :key="classes.index">
                  {{ classes.classTime }}
                </v-flex>
                <v-flex xs3 :key="classes.index">
                  {{ classes.classCode }}
                </v-flex>
                <v-flex xs3 :key="classes.index">
                  {{ classes.classRoom }}
                </v-flex>
              </template>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <span class="fc-text-bold">Attachments</span>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <span v-if="!vDialogContent.attachmentLink">None</span>
            <span v-if="vDialogContent.attachmentLink">
              <a target="__blank" :href="vDialogContent.attachmentLink">Image</a>
            </span>
          </v-flex>
          <v-flex xs12 sm6>
            <span class="fc-text-bold">Status</span>
          </v-flex>
          <v-flex xs12 sm6 :class="determineStatus(vDialogContent.status)">
            <span>{{ vDialogContent.status }}</span>
          </v-flex>
          <v-flex xs12 sm6 v-if="vDialogContent.rejectReason">
            <span class="fc-text-bold">Reject Reason</span>
          </v-flex>
          <v-flex xs12 sm6 v-if="vDialogContent.rejectReason">
            <span>{{ vDialogContent.rejectReason }}</span>
          </v-flex>
          <v-flex class="text-xs-right py-2">
            <v-btn color="primary" flat @click="dialog = false" v-if="role === 'employee'">Ok</v-btn>
            <v-btn color="success" flat @click="approveLeave" v-if="role === 'administrator' || role === 'superuser'" :disabled="disabled">Approve</v-btn>
            <v-btn color="error" flat @click="rejectLeave" v-if="role === 'administrator' || role === 'superuser'" :disabled="disabled">Reject</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
import { server } from '@/store/helpers/axios.helper'
import { employeeHome } from '@/helper/employee.dashboard'
import { adminHome } from '@/helper/admin.dashboard'
import { store } from '@/store/index'

export default {
  data() {
    return {
      // Dialog data binding ------------
      dialog: false,
      vDialogHeader: null,
      vDialogContent: {
        employeeId: null,
        employeeName: null,
        leave: null,
        createdOn: null,
        startDate: null,
        endDate: null,
        totalDays: null,
        purpose: null,
        classReplacements: [],
        noClassReason: null,
        attachmentLink: null,
        status: null,
        rejectReason: null
      },
      disabled: false,
      // -----------------------------

      // Header data bindings --------------
      nickname: 'Default User',
      role: null,
      time: new Date().toLocaleString(),
      // --------------------------------------

      // Leave Data Bindings ---------------
      leaveLoading: false,
      leaveHeaders: [],
      leaveItems: [],
      // ------------------------------------

      claimLoading: false,
      claimHeaders: [
        { text: 'Employee ID', value: 'employeeId' },
        { text: 'Employee Name', value: 'name' },
        { text: 'Claim Type', value: 'claimType' },
        { text: 'Amount', value: 'amount' }
      ],
      claimItems: []
    }
  },
  methods: {
    async approveLeave() {
      // const payload = {
      //   id: {
      //     leaveId: this.vDialogContent._id,
      //     userId: this.vDialogContent.user._id
      //   },
      //   leave: this.vDialogContent.leave,
      //   totalDays: this.vDialogHeader.totalDays,
      //   status: 'approved'
      // }
      // const res = await server.post('/api/leave/validate', payload, {
      //   headers: {
      //     Authorization: this.$store.getters['auth/getToken']
      //   }
      // })
      // const result = res.data.result
      // console.log(result)
    },
    rejectLeave() {
      // const payload = {
      //   id: {
      //     leaveId: this.vDialogContent._id,
      //     userId: this.vDialogContent.user._id
      //   },
      //   status: 'rejected',
      //   rejectReason: this.vDialogContent.rejectReason
      // }
    },
    determineStatus(status) {
      const baseClass = 'fc-text-capitalize'
      switch (status) {
        case 'pending':
          return baseClass + ' warning--text'
          break
        case 'approved':
          return baseClass + ' success--text'
          break
        case 'rejected':
          return baseClass + ' error--text'
          break
      }
    },
    viewLeave(data) {
      this.vDialogHeader = 'Leave Details'
      this.vDialogContent = data
      this.dialog = true
    },
    async getLeaveData() {
      return await server.get('/api/leave/apply', {
        headers: {
          Authorization: this.$store.getters['auth/getToken']
        }
      })
    }
  },
  created() {
    setInterval(() => {
      this.time = new Date().toLocaleString()
    }, 1000)
  },
  async mounted() {
    this.leaveLoading = true
    const res = await this.getLeaveData()
    const result = res.data.result
    if (this.role === 'employee') {
      result.leave.forEach(element => {
        this.leaveItems.push(element)
      })
    }

    if (this.role === 'administrator' || this.role === 'superuser') {
      result.forEach(element => {
        this.leaveItems.push(element)
      })
    }
    this.leaveLoading = false
  },
  beforeRouteEnter(to, from, next) {
    const user = store.getters['auth/getUser']
    return next(vm => {
      if (user.role === 'administrator' || user.role === 'superuser') {
        vm.leaveHeaders = [...adminHome]
      } else {
        vm.leaveHeaders = [...employeeHome]
      }
      vm.nickname = user.nickname
      vm.role = user.role
    })
  }
}
</script>
