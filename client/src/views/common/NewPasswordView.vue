<template>
  <v-content class="fc-login-view">
    <v-container justify-center fill-height v-if="!passwordUpdated">
      <div class="fc-container">
        <v-layout row wrap>
          <v-flex xs12 class="fc-ta-center">
            <h1>New Password</h1>
            <p>Please enter your new password</p>
          </v-flex>
          <v-flex xs12>
            <v-form class="fc-login-form" v-model="valid" ref="form" lazy-validation @submit.prevent="updatePassword">
              <v-text-field v-model="password" label="Password" type="password" required :rules="passwordRules" :error-messages="passwordErrors" clearable/>
              <v-text-field v-model="passwordRetype" label="Retype Password" type="password" required :rules="passwordRules" :error-messages="passwordRetypeErrors" clearable/>
              <v-btn block color="primary" :loading="loading" type="submit">Update Password</v-btn>
            </v-form>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <v-container justify-center fill-height v-if="passwordUpdated">
      <div class="fc-container">
        <v-layout row wrap>
          <v-flex xs12 class="fc-ta-center">
            <h1>Password Changed</h1>
            <p>Your password has been updated, please use your new password for future login</p>
            <v-btn @click="navigateBackToLogin" block color="primary">Back to Login</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { store } from '@/store/index'

export default {
  data() {
    return {
      password: '',
      passwordRetype: '',
      passwordRules: [v => !!v || 'Field cannot be empty!'],
      passwordErrors: [],
      passwordRetypeErrors: [],
      passwordUpdated: false,
      valid: true,
      loading: false
    }
  },
  methods: {
    updatePassword() {
      this.passwordErrors = []
      this.passwordRetypeErrors = []
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.password.length < 6) {
          this.passwordErrors = ['Password length is too short!']
          this.loading = false
        } else if (this.password !== this.passwordRetype) {
          this.passwordRetypeErrors = ['Passwords do not match!']
          this.loading = false
        } else {
          this.$store
            .dispatch('auth/updateUserPassword', {
              password: this.password,
              token: this.$store.getters['auth/getToken']
            })
            .then(() => {
              this.loading = false
              const status = this.$store.getters['auth/getCurrentStatus']
              if (status === 'UPDATE_SUCCESS') {
                this.passwordUpdated = true
              } else {
                this.$router.replace({ name: 'Error' })
              }
            })
        }
      }
    },
    navigateBackToLogin() {
      this.$store.dispatch('auth/logoutUser').then(() => {
        this.$router.replace({
          name: 'Login'
        })
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch('auth/validateUserToken', {
        token: to.query.token
      })
      .then(() => {
        const status = store.getters['auth/getCurrentStatus']
        if (status === 'PASSWORD_RESET') {
          next()
        } else if (status === 'TOKEN_USED') {
          next({ name: 'Login', replace: true })
        } else if (status === 'TOKEN_EXPIRED') {
          next({ name: 'Error', replace: true })
        }
      })
  }
}
</script>

