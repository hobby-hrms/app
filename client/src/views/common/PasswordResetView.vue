<template>
  <v-content class="fc-login-view">
    <v-container justify-center fill-height v-if="!recoveryEmailSent">
      <div class="fc-container">
        <v-layout row wrap>
          <v-flex xs12 class="fc-ta-center">
            <h1>Reset Password</h1>
            <p>Please enter your email address to reset your password</p>
          </v-flex>
          <v-flex xs12>
            <v-form class="fc-login-form" v-model="valid" ref="form" lazy-validation @submit.prevent="sendRecoveryEmail">
              <v-text-field v-model="email" :label="emailLabel" type="text" required :rules="emailRules" :error-messages="emailErrors" clearable />
              <v-btn block color="primary" :loading="loading" type="submit">Send Recovery Email</v-btn>
              <small>
                <span @click="navigateBackToLogin" class="fc-password-reset fc-float-left">Back to Login</span>
                <span v-if="isEmployee" @click="changeRequestType" class="fc-password-reset fc-float-right">Request as Administrator</span>
                <span v-if="!isEmployee" @click="changeRequestType" class="fc-password-reset fc-float-right">Request as Employee</span>
              </small>
            </v-form>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
    <v-container justify-center fill-height v-if="recoveryEmailSent">
      <div class="fc-container">
        <v-layout row wrap>
          <v-flex xs12 class="fc-ta-center">
            <h1>Recovery Email Sent</h1>
            <p>Please check your mailbox and follow the instructions to reset your password.</p>
          </v-flex>
          <v-flex xs12>
            <v-btn @click="navigateBackToLogin" block color="primary">Back to Login</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { server } from '@/store/helpers/axios.helper'

export default {
  data() {
    return {
      isEmployee: true,
      valid: true,
      email: '',
      loading: false,
      emailRules: [v => !!v || 'Email is required'],
      emailErrors: [],
      recoveryEmailSent: false
    }
  },
  methods: {
    navigateBackToLogin() {
      this.$router.replace({
        name: 'Login'
      })
    },
    async sendRecoveryEmail() {
      this.emailErrors = []
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const res = await server.post('/auth/password/reset', {
            email: this.email,
            type: this.isEmployee ? 'employee' : 'administrator'
          })
          if (res.data.result === 'EMAIL_SENT') {
            this.recoveryEmailSent = true
            this.loading = false
          }
        } catch (err) {
          const res = err.response.data
          this.loading = false
          if (res.result === 'USER_NOT_FOUND') {
            this.emailErrors = ['User not found. Please make sure you have an active account!']
          }
        }
      }
    },
    changeRequestType() {
      this.isEmployee = !this.isEmployee
      this.emailErrors = []
      this.passwordErrors = []
      this.$refs.form.reset()
    }
  },
  computed: {
    emailLabel() {
      if (this.isEmployee) {
        return 'Employee Email'
      } else {
        return 'Administrator Email'
      }
    }
  }
}
</script>




