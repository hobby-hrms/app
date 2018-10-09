<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>Profile Settings</h2>
        </v-flex>
        <v-flex xs12>
          <v-container class="px-0 py-4" grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-layout row wrap class="elevation-2 px-2 py-2">
                  <v-flex xs12 class="pb-2">
                    <h4 class="primary--text">Personal Information</h4>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span class="fc-text-bold">Full Name</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span>{{ name }}</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span class="fc-text-bold">Email</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span>{{ email }}</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span class="fc-text-bold">Nickname</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span>{{ nickname }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm6>
                <v-layout row wrap class="elevation-2 px-2 py-2">
                  <v-flex xs12 class="pb-2">
                    <h4 class="primary--text">Employment Information</h4>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span class="fc-text-bold">Employee ID</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span>{{ employeeId }}</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span class="fc-text-bold">Employment Date</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span>{{ employmentDate }}</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span class="fc-text-bold">Position</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <span>{{ position }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm6>
                <v-layout row wrap class="elevation-2 px-2 py-2">
                  <v-flex xs12>
                    <h4 class="primary--text">Leave Information</h4>
                  </v-flex>
                  <v-flex xs12>

                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm6>
                <v-layout row wrap class="elevation-2 px-2 py-2">
                  <v-flex xs12>
                    <h4 class="primary--text">Attendance</h4>
                  </v-flex>
                  <v-flex xs12>
                    
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>

        </v-flex>
      </v-layout>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Personal information data binding
      name: null,
      email: null,
      nickname: null,
      // ----------------------------------

      // Employment information data binding------
      employeeId: null,
      employmentDate: null,
      position: null,
      // --------------------------------------

    }
  }
}
</script>
