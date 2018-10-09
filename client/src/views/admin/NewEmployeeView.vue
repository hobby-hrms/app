<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>Add New Employee</h2>
        </v-flex>
        <v-flex xs12>
          <v-container class="px-0 py-4" grid-list-md>
            <v-stepper v-model="stepper" :vertical="$vuetify.breakpoint.smAndDown">
              <v-stepper-header v-if="!$vuetify.breakpoint.smAndDown">
                <v-stepper-step step="1">Personal Details</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2">Employment Info</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Leave Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">Carry Foward Leave</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="5">Review</v-stepper-step>
              </v-stepper-header>
              <v-stepper-step step="1" v-if="$vuetify.breakpoint.smAndDown">Personal Details</v-stepper-step>
              <v-stepper-content step="1">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="name" label="Full Name" type="text" required clearable />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="email" label="Email" type="text" required clearable />
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" @click="backToHome">Back to home</v-btn>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" :disabled="isStepOneValidated" @click.native="stepper = 2">Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="2" v-if="$vuetify.breakpoint.smAndDown">Employment Info</v-stepper-step>
              <v-stepper-content step="2">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="employeeId" label="Employee ID" type="text" required clearable />
                  </v-flex>
                  <v-flex xs12>
                    <v-menu ref="dateMenu" lazy v-model="dateMenu" transition="scale-transition" offset-y full-width min-width="290px" :return-value.sync="dateMenu">
                      <v-text-field slot="activator" label="Employment Start Date" v-model="employmentStartDate" readonly required clearable></v-text-field>
                      <v-date-picker v-model="employmentStartDate" no-title scrollable @change="$refs.dateMenu.save(employmentStartDate)" />
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" @click.native="stepper = 1">Back</v-btn>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" :disabled="isStepTwoValidated" @click.native="stepper = 3">Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="3" v-if="$vuetify.breakpoint.smAndDown">Leave Information</v-stepper-step>
              <v-stepper-content step="3">
                <v-layout row wrap>
                  <v-flex xs12>
                    <span>Please enter the total number of days of entitled leaves off system.</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model.number="medicalEntitled" label="Medical Leave" type="number" clearable />
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model.number="annualEntitled" label="Annual Leave" type="number" clearable />
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model.number="replacementEntitled" label="Replacement Leave" type="number" clearable />
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select v-model.number="replacementUnit" :items="replacementUnitType" label="Replacement Leave Unit" type="text" clearable />
                  </v-flex>
                  <v-flex xs12>
                    <span>Does your employee have taken any leave off system?</span>
                    <v-radio-group v-model="hasTakenLeave" row>
                      <v-radio label="Yes" value="yes"></v-radio>
                      <v-radio label="No" value="no"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <template v-if="hasTakenLeave === 'yes'">
                    <v-flex xs12>
                      <span>Please enter the number of days. Leave input as zero where necessary.</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field v-model.number="medicalTaken" label="Medical Leave" type="number" clearable />
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field v-model.number="annualTaken" label="Annual Leave" type="number" clearable />
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field v-model.number="emergencyTaken" label="Emergency Leave" type="number" clearable />
                    </v-flex>
                    <v-flex xs12 sm3>
                      <v-text-field v-model.number="replacementTaken" label="Replacement Leave" type="number" clearable />
                    </v-flex>
                    <v-flex xs12 sm3>
                      <v-select v-model="replacementUnit" :items="replacementUnitType" label="Replacement Leave Unit" type="text" clearable />
                    </v-flex>
                  </template>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" @click.native="stepper = 2">Back</v-btn>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" :disabled="isStepThreeValidated" @click.native="stepper = 4">Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="4" v-if="$vuetify.breakpoint.smAndDown">Carry Foward Leave</v-stepper-step>
              <v-stepper-content step="4">
                <v-layout row wrap>
                  <v-flex xs12>
                    <span>Does your employee have any carried forward leave?</span>
                    <v-radio-group v-model="hasCarryForward" row>
                      <v-radio label="Yes" value="yes"></v-radio>
                      <v-radio label="No" value="no"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <template v-if="hasCarryForward === 'yes'">
                    <v-flex xs12>
                      <span>Please enter the number of days. Leave input as zero where necessary.</span>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model.number="carryForward" label="Carry Foward Leave" type="number" clearable />
                    </v-flex>
                  </template>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" @click.native="stepper = 3">Back</v-btn>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" :disabled="isStepThreeValidated" @click.native="stepper = 5">Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="5" v-if="$vuetify.breakpoint.smAndDown">Review</v-stepper-step>
              <v-stepper-content step="5">
                <v-layout row wrap>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <h3>Part 1: Personal Details</h3>
                      </v-flex>
                      <v-flex xs12 sm6 class="fc-text-bold">
                        <span>Full Name</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ name }}</span>
                      </v-flex>
                      <v-flex xs12 sm6 class="fc-text-bold">
                        <span>Email Address</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ email }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <h3>Part 2: Employment Details</h3>
                      </v-flex>
                      <v-flex xs12 sm6 class="fc-text-bold">
                        <span>Employee ID</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ employeeId }}</span>
                      </v-flex>
                      <v-flex xs12 sm6 class="fc-text-bold">
                        <span>Employment Start Date</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ employmentStartDate }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <h3>Part 3: Leave Taken Information</h3>
                      </v-flex>
                      <v-flex xs3 sm6>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <h4>Type</h4>
                          </v-flex>
                          <v-flex xs12>
                            <span>Medical</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>Annual</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>Emergency</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>Replacement</span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs3 sm2>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <h4>Entitled</h4>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ medicalEntitled }} day(s)</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ annualEntitled }} day(s)</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>N/A</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ replacementEntitled }} {{ replacementUnit === 'Day' ? 'day(s)' : 'hour(s)' }}</span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs3 sm2>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <h4>Taken</h4>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ medicalTaken }} day(s)</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ annualTaken }} day(s)</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ emergencyTaken }} day(s)</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ replacementTaken }} {{ replacementUnit === 'Day' ? 'day(s)' : 'hour(s)' }}</span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs3 sm2>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <h4>Remaining</h4>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ calculateMedical }} day(s)</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ calculateAnnual }} day(s)</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>N/A</span>
                          </v-flex>
                          <v-flex xs12>
                            <span>{{ calculateReplacement }} {{ replacementUnit === 'Day' ? 'day(s)' : 'hour(s)' }}</span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <h3>Part 4: Carry Forward Leave</h3>
                      </v-flex>
                      <v-flex xs12 sm6 class="fc-text-bold">
                        <span>Carry Forward Leave</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ carryForward }} day(s)</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="primary" @click.native="stepper = 4">Back</v-btn>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-btn block color="success" @click="createNewEmployee" :loading="loading">Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper>
          </v-container>
        </v-flex>
      </v-layout>
    </v-content>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-container class="fc-dialog-background">
        <v-layout row wrap>
          <v-flex xs12>
            <h2>{{ vDialogHeader }}</h2>
          </v-flex>
          <v-flex xs12 class="py-2">
            <p>{{ vDialogContent }}</p>
          </v-flex>
          <v-flex xs12 v-if="!isEmployeeCreationSuccess">
            <v-btn left flat color="error" class="fc-dialog-btn-style" @click="navigateBackToDashboard">Cancel</v-btn>
            <v-btn left flat color="primary" class="fc-dialog-btn-style" @click.native="dialog = false">Edit Details</v-btn>
          </v-flex>
          <v-flex xs12 v-if="isEmployeeCreationSuccess">
            <v-btn left flat color="primary" class="fc-dialog-btn-style" @click="navigateToEmployeeSummary">Ok</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
import { server } from '@/store//helpers/axios.helper'

export default {
  data() {
    return {
      // General data binding ----
      stepper: 0,
      dateMenu: false,
      dialog: false,
      isEmployeeCreationSuccess: false,
      loading: false,
      // ------------------

      // Data bindings for dialog content -----
      vDialogHeader: null,
      vDialogContent: null,
      // -----------------------------------

      // Data binding for step 1
      name: null,
      email: null,
      // ------------------------

      // Data binding for step 2
      employeeId: null,
      employmentStartDate: null,
      // --------------------------

      // Data binding for step 3
      hasTakenLeave: null,
      leavePolicy: null,

      medicalEntitled: 14,
      annualEntitled: 12,
      replacementEntitled: 0,
      replacementUnit: 'Day',
      replacementUnitType: ['Day', 'Hour'],

      medicalTaken: 0,
      annualTaken: 0,
      emergencyTaken: 0,
      replacementTaken: 0,
      // ----------------------------

      // Data binding for step 4
      hasCarryForward: null,
      carryForward: 0,
      // ------------------------------

      // Final remaning leave---------
      totalMedical: 0,
      totalAnnual: 0,
      totalEmergency: 0,
      totalReplacement: 0,
      // -----------------------------
    }
  },
  methods: {
    backToHome() {
      this.$router.push({
        name: 'Home'
      })
    },
    async createNewEmployee() {
      this.loading = true
      const payload = {
        name: this.name,
        email: this.email,
        employeeId: this.employeeId,
        employmentDate: this.employmentStartDate,
        carryForward: this.carryForward.toString() + 'd',
        entitledLeave: {
          medical: this.medicalEntitled.toString() + 'd',
          annual: this.annualEntitled.toString() + 'd',
          replacement:
            this.replacementEntitled.toString() + `${this.replacementUnit === 'Day' ? 'd' : 'h'}`
        },
        takenLeave: {
          medical: this.medicalTaken.toString() + 'd',
          annual: this.annualTaken.toString() + 'd',
          emergency: this.emergencyTaken.toString() + 'd',
          replacement:
            this.replacementTaken.toString() + `${this.replacementUnit === 'Day' ? 'd' : 'h'}`
        },
        remainingLeave: {
          medical: this.totalMedical.toString() + 'd',
          annual: this.totalAnnual.toString() + 'd',
          replacement:
            this.totalReplacement.toString() + `${this.replacementUnit === 'Day' ? 'd' : 'h'}`
        }
      }
      try {
        const res = await server.post('/api/user/employee', payload, {
          headers: {
            Authorization: this.$store.getters['auth/getToken']
          }
        })
        this.loading = false
        const result = res.data.result
        if (result === 'EMPLOYEE_CREATED') {
          this.vDialogHeader = 'Employee Creation Successful'
          this.vDialogContent = `Employee ${
            this.employeeId
          } has been successfully created. An email has been sent to employee's mailbox to complete account registration.`
          this.dialog = true
          this.isEmployeeCreationSuccess = true
        }
      } catch (err) {
        this.loading = false
        const res = err.response.data
        console.log(res)
        if (res.err.message.startsWith('E11000')) {
          this.vDialogHeader = 'Employee Creation Error'
          this.vDialogContent =
            'Email or Employee ID already exist. Please check if employee account is already created.'
        } else {
          this.vDialogHeader = 'Employee Creation Error'
          this.vDialogContent = 'Something went wrong. Please try again later.'
        }

        this.dialog = true
        this.isEmployeeCreationSuccess = false
      }
    },
    navigateBackToDashboard() {
      this.$router.push({
        name: 'Home'
      })
    },
    navigateToEmployeeSummary() {
      this.$router.replace({
        name: 'ManageEmployee'
      })
    }
  },
  computed: {
    isStepOneValidated() {
      if (!this.name || !this.email) {
        return true
      }
      return false
    },
    isStepTwoValidated() {
      if (!this.employeeId || !this.employmentStartDate) {
        return true
      }
      return false
    },
    isStepThreeValidated() {
      if (!this.hasTakenLeave) {
        return true
      }
      return false
    },
    isStepFourValidated() {
      if (!this.hasCarryForward) {
        return true
      }
      return false
    },
    calculateMedical() {
      this.totalMedical = this.medicalEntitled - this.medicalTaken
      return this.totalMedical
    },
    calculateAnnual() {
      this.totalAnnual = this.annualEntitled - this.annualTaken - this.emergencyTaken
      this.totalEmergency = this.emergencyTaken
      return this.totalAnnual
    },
    calculateReplacement() {
      this.totalReplacement = this.replacementEntitled - this.replacementTaken
      return this.totalReplacement
    }
  }
}
</script>
