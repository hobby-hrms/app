<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>New Claim</h2>
        </v-flex>
        <v-flex xs12>
          <v-select v-model="claimType" :items="claimItems" label="Please select type of claim" clearable/>
        </v-flex>
        <v-flex xs12 v-if="claimType === 'Travelling/Mileage'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-menu ref="dateMenu" lazy :close-on-content-click="false" v-model="dateMenu" transition="slide-y-transition" full-width offset-y :return-value.sync="dateMenu" min-width="290px">
                <v-text-field slot="activator" label="Date" v-model="date" readonly required :rules="rules.required" />
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <span>Destination</span>
              <v-text-field v-model="fromDest" label="From" />
              <v-text-field v-model="toDest" label="To" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="distance" label="Distance" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="purposeOfTrip" label="Purpose of Trip" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="vehicleType" label="Vehicle type" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="vehicleNumber" label="Vehicle Plate Number" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="amount" label="Amount" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 v-if="claimType === 'Parking'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-menu ref="dateMenu" lazy :close-on-content-click="false" v-model="dateMenu" transition="slide-y-transition" full-width offset-y :return-value.sync="dateMenu" min-width="290px">
                <v-text-field slot="activator" label="Date" v-model="date" readonly required :rules="rules.required" />
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="receiptNo" label="Receipt No" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="purposeOfTrip" label="Purpose of Trip" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="amount" label="Amount" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 v-if="claimType === 'Allowance/Meals'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-menu ref="dateMenu" lazy :close-on-content-click="false" v-model="dateMenu" transition="slide-y-transition" full-width offset-y :return-value.sync="dateMenu" min-width="290px">
                <v-text-field slot="activator" label="Date" v-model="date" readonly required :rules="rules.required" />
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="receiptNo" label="Receipt No" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="purposeOfTrip" label="Purpose of Trip" />
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="amount" label="Amount" />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      claimType: null,
      claimItems: ['Travelling/Mileage', 'Parking', 'Allowance/Meals'],
      dateMenu: false,
      date: null,
      fromDest: null,
      toDest: null,
      distance: null,
      purposeOfTrip: null,
      vehicleType: null,
      vehicleNumber: null,
      amount: null,
      receiptNo: null,
      rules: {
        required: [v => !!v || 'Field is required!']
      }
    }
  }
}
</script>

