<template>
  <v-content class="fc-login-view">
    <v-container fill-height justify-center grid-list-md>
      <v-stepper v-model="stepper" :vertical="$vuetify.breakpoint.smAndDown" class="fc-stepper-width">
        <v-stepper-header v-if="!$vuetify.breakpoint.smAndDown">
          <v-stepper-step step="1" :complete="step1">Change Password</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="step2">Personal Details</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="step3">Profile Picture</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="step4">Employment Information</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="step5">Registration Complete</v-stepper-step>
        </v-stepper-header>
        <v-stepper-step step="1" v-if="$vuetify.breakpoint.smAndDown">Change Password</v-stepper-step>
        <v-stepper-content step="1">
          <v-layout row wrap>
            <v-flex xs12>
              <span>First things first, please change your password.</span>
            </v-flex>
            <v-flex xs12>
              <v-form ref="form1" v-model="valid1" lazy-validation @submit.prevent="updatePassword">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="password" label="Password" type="password" required :rules="passwordRules" :error-messages="passwordErrors" clearable/>
                    <v-text-field v-model="passwordRetype" label="Retype Password" type="password" required :rules="passwordRules" :error-messages="passwordRetypeErrors" clearable/>
                  </v-flex>
                  <v-flex xs12 class="text-xs-right">
                    <v-btn color="primary" :loading="loading" type="submit" flat left>Update Password</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-step step="2" v-if="$vuetify.breakpoint.smAndDown">Personal Details</v-stepper-step>
        <v-stepper-content step="2">
          <v-layout row wrap>
            <v-flex xs12>
              <span>Tell us about your nickname, we will use this to address you in future.</span>
            </v-flex>
            <v-flex xs12>
              <v-form ref="form2" v-model="valid2" lazy-validation @submit.prevent="updateNickname">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="nickname" label="Nickname" type="text" required :rules="nicknameRules" :error-messages="nicknameErrors" clearable/>
                  </v-flex>
                  <v-flex xs12 class="text-xs-right">
                    <v-btn color="primary" :loading="loading" type="submit" flat left>Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-step step="3" v-if="$vuetify.breakpoint.smAndDown">Profile Picture</v-stepper-step>
        <v-stepper-content step="3">
          <v-layout row wrap>
            <v-flex xs12>
              <span>Do you want to upload your profile picture? You can do this later.</span>
            </v-flex>
            <v-flex xs12>
              <v-form ref="form3" v-model="valid3" lazy-validation @submit.prevent="uploadPicture">
                <v-layout row wrap>
                  <v-flex>
                    <v-radio-group v-model="upload" row :rules="uploadRules">
                      <v-radio label="Yes" value="yes"></v-radio>
                      <v-radio label="No" value="no"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 v-if="upload === 'yes'">
                    <v-text-field v-model="nickname" label="Nickname" type="text" required :rules="nicknameRules" :error-messages="nicknameErrors" clearable/>
                  </v-flex>
                  <v-flex xs12 class="text-xs-right">
                    <v-btn color="primary" :loading="loading" type="submit" flat left>Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-step step="4" v-if="$vuetify.breakpoint.smAndDown">Employment Information</v-stepper-step>
        <v-stepper-content step="4">
          <v-layout row wrap>
            <v-flex xs12>
              <span>Please enter your job position</span>
            </v-flex>
            <v-flex xs12>
              <v-form ref="form4" v-model="valid4" lazy-validation @submit.prevent="updateEmploymentDetails">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="position" label="Position" type="text" required :rules="positionRules" :error-messages="positionErrors" clearable/>
                  </v-flex>
                  <v-flex xs12 class="text-xs-right">
                    <v-btn color="primary" :loading="loading" type="submit" flat left>Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-step step="5" v-if="$vuetify.breakpoint.smAndDown">Registration Complete</v-stepper-step>
        <v-stepper-content step="5">
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-center" v-if="!isUpdateSuccess">
              <v-progress-circular color="primary" indeterminate/>
              <h2>Applying Changes</h2>
              <p>Please wait while we update your information...</p>
            </v-flex>
            <v-flex xs12 class="text-xs-center" v-if="isUpdateSuccess">
              <v-icon color="success">done</v-icon>
              <h2>Registration Complete</h2>
              <p>Your details have been updated. Please login again for changes to take effect.</p>
              <v-btn color="primary" @click="backToLogin">Back to Login</v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-content>
</template>

<script>
import { server } from '@/store//helpers/axios.helper'
import { store } from '@/store/index'

export default {
  data() {
    return {
      // Stepper data binding ---------------
      stepper: 0,
      isVerticalStepper: false,

      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      // ----------------------------------------

      // Form data binding ----------------
      valid1: true,
      valid2: true,
      valid3: true,
      valid4: true,
      // ---------------------------------

      // Data for button loading -------------
      loading: false,
      // -----------------------------------

      // Step 1: Change password -------------
      password: null,
      passwordRetype: null,
      passwordRules: [v => !!v || 'Field is required!'],
      passwordErrors: [],
      passwordRetypeErrors: [],
      // -------------------------------------------

      // Step 2: Personal details ------------------------
      nickname: null,
      nicknameRules: [v => !!v || 'Nickname is required!'],
      nicknameErrors: [],

      avatar: null,
      // --------------------------------------------------

      // Step 3: Profile picture --------------------------
      upload: null,
      uploadRules: [v => !!v || 'Please select an option!'],
      // -----------------------------------------------------

      // Step 4: Employment Details ----------------------------
      position: null,
      positionRules: [v => !!v || 'Position is required!'],
      positionErrors: [],
      // ------------------------------------------------

      // Step 5: Apply changes
      isUpdateSuccess: false
    }
  },
  methods: {
    updatePassword() {
      if (this.$refs.form1.validate()) {
        if (this.password !== this.passwordRetype) {
          this.passwordRetypeErrors = ['Passwords do not match!']
        } else {
          this.stepper = 2
          this.step1 = true
        }
      }
    },
    updateNickname() {
      if (this.$refs.form2.validate()) {
        this.stepper = 3
        this.step2 = true
      }
    },
    uploadPicture() {
      if (this.$refs.form3.validate()) {
        this.stepper = 4
        this.step3 = true
      }
    },
    async updateEmploymentDetails() {
      if (this.$refs.form4.validate()) {
        this.stepper = 5
        this.step4 = true

        const payload = this.constructPayload()
        await this.updateDetails(payload)
      }
    },
    constructPayload() {
      return {
        password: this.password,
        nickname: this.nickname,
        position: this.position
      }
    },
    async updateDetails(payload) {
      try {
        const res = await server.put('/api/user/employee', payload, {
          headers: {
            Authorization: this.$store.getters['auth/getToken']
          }
        })
        const result = res.data.result
        if (result.status === 'REGISTRATION_SUCCESS') {
          this.isUpdateSuccess = true
          this.step5 = true
        }
      } catch (err) {
        await this.$store.dispatch('auth/manuallySetStatus', 'INTERNAL_SERVER_ERROR')
        this.$router.replace({
          name: 'Error'
        })
      }
    },
    async backToLogin() {
      await this.$store.dispatch('auth/logoutUser')
      this.$router.replace({
        name: 'Login'
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    const status = store.getters['auth/getCurrentStatus']
    if (status !== 'NEW') {
      return next({ name: 'Login', replace: true })
    }
    return next()
  }
}
</script>

<style scoped>
.fc-stepper-width {
  width: 100%;
}
</style>

