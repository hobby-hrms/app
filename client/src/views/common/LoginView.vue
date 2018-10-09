<template>
  <v-content class="fc-login-view">
    <v-container justify-center fill-height>
      <div class="fc-container">
        <v-layout row wrap>
          <v-flex xs12 sm4 class="fc-ta-center">
            <img :src="logoUrl" alt="" class="fc-login-logo">
          </v-flex>
          <v-flex xs12 sm8>
            <v-form class="fc-login-form" v-model="valid" ref="form" lazy-validation @submit.prevent="validateInput">
              <v-container class="px-0 py-0" grid-list-xs>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="employeeId" :label="emailLabel" type="text" required :rules="emailRules" :error-messages="employeeIdErrors" clearable />
                    <v-text-field v-model="password" label="Password" type="password" required :rules="passwordRules" :error-messages="passwordErrors" clearable/>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn block color="primary" :loading="loading" type="submit">Login</v-btn>
                  </v-flex>
                  <v-flex xs12>
                    <small>
                      <span @click="navigateToPasswordReset" class="fc-password-reset fc-float-left">Forgot password?</span>
                      <span v-if="isEmployee" @click="changeLoginType" class="fc-password-reset fc-float-right">Login as Administrator</span>
                      <span v-if="!isEmployee" @click="changeLoginType" class="fc-password-reset fc-float-right">Login as Employee</span>
                    </small>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
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
      logoUrl: 'https://s3-ap-southeast-1.amazonaws.com/fcuc-hrms-dev/public/crest.png',
      isEmployee: true,
      employeeId: '',
      password: '',
      valid: true,
      loading: false,
      emailRules: [v => !!v || 'Email is required'],
      passwordRules: [v => !!v || 'Password is required'],
      employeeIdErrors: [],
      passwordErrors: []
    }
  },
  methods: {
    async validateInput() {
      this.employeeIdErrors = []
      this.passwordErrors = []
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.$store.dispatch('auth/authenticateUser', {
          employeeId: this.employeeId,
          password: this.password,
          type: this.isEmployee ? 'employee' : 'administrator'
        })
        this.loading = false
        const status = this.$store.getters['auth/getCurrentStatus']
        if (status === 'USER_NOT_FOUND') {
          if (this.isEmployee) {
            this.employeeIdErrors = ['Account does not exists. Please contact your administrator.']
          } else {
            this.employeeIdErrors = ['Account does not exists.']
          }
        } else if (status === 'INVALID_PASSWORD') {
          this.passwordErrors = ['Invalid password entered!']
        } else if (status === 'VERIFIED') {
          localStorage.setItem('employeeId', this.employeeId)
          this.$router.replace({ name: 'Home' })
        } else if (status === 'NEW') {
          this.$router.replace({ name: 'NewEmployeeRegistration' })
        }
      }
    },
    showLoginDialog() {
      this.showDialog = true
    },
    navigateToPasswordReset() {
      this.$router.push({
        name: 'PasswordReset'
      })
    },
    changeLoginType() {
      this.isEmployee = !this.isEmployee
      this.employeeIdErrors = []
      this.passwordErrors = []
      this.$refs.form.reset()
    }
  },
  mounted() {
    const employeeId = localStorage.getItem('employeeId')
    if (employeeId) this.employeeId = employeeId
  },
  async beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('token')
    if (!token) return next()
    await store.dispatch('auth/validateUserToken', { token })
    if (store.getters['auth/getCurrentStatus'] === 'VERIFIED') {
      next({ name: 'Home', replace: true })
    } else {
      next()
    }
  },
  computed: {
    emailLabel() {
      if (this.isEmployee) {
        return 'Employee ID'
      } else {
        return 'Administrator ID'
      }
    }
  }
}
</script>






