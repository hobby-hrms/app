<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>Change Password</h2>
        </v-flex>
        <v-flex xs12>
          <v-container class="px-0 py-4" grid-list-md>
            <!-- This part in not a form due to unexpected form validation issues -->
            <v-layout row wrap v-if="!isOldPasswordValid">
              <v-flex xs12>
                <v-text-field v-model="oldPasswordField" label="Old Password" type="password" required :rules="oldPasswordRules" :error-messages="oldPasswordErrors" clearable
                  :loading="loading" />
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn block color="primary" :loading="loading" @click="validateOldPassword">Verify</v-btn>
              </v-flex>
              <v-flex xs12 sm6>
                <v-btn block color="error">Cancel</v-btn>
              </v-flex>
            </v-layout>
            <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="updateNewPassword" v-if="isOldPasswordValid">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field validate-on-blur v-model="newPasswordField" label="New Password" type="password" required :rules="newPasswordRules" :error-messages="newPasswordErrors"
                    clearable />
                  <v-text-field v-model="retypePasswordField" label="Retype Password" type="password" required :rules="newPasswordRules" :error-messages="retypePasswordErrors"
                    clearable />
                </v-flex>
                <v-flex xs12 sm6>
                  <v-btn block color="primary" :loading="loading" type="submit">Update Password</v-btn>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-btn block color="error">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
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
          <v-flex xs12 v-if="!isOldPasswordValid">
            <v-btn left flat color="error" class="fc-dialog-btn-style" @click="navigateBackToDashboard">Back to dashboard</v-btn>
            <v-btn left flat color="primary" class="fc-dialog-btn-style" @click="navigateToPasswordResetView">Request email</v-btn>
          </v-flex>
          <v-flex xs12 v-if="isOldPasswordValid">
            <v-btn left flat color="error" class="fc-dialog-btn-style" @click="logoutUser">Back to login</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // General data ------------------
      loading: false,
      isOldPasswordValid: false,
      dialog: false,
      attempts: 2,
      // -------------------------------------

      // Data bindings for dialog content -----
      vDialogHeader: null,
      vDialogContent: null,
      // -----------------------------------

      // Data bindings for valid/invalid form--------
      valid: true,
      // ---------------------------

      // Data bindings for old password --------------------
      oldPasswordField: null,
      oldPasswordRules: [v => !!v || 'Password is required!'],
      oldPasswordErrors: [],
      // ---------------------------------------------------

      // Data bindings for new password --------------------
      newPasswordField: null,
      newPasswordRules: [v => !!v || 'Password is required!'],
      newPasswordErrors: [],
      // ---------------------------------------------------

      // Data bindings for retype password --------------------
      retypePasswordField: null,
      retypePasswordErrors: [],
      // ---------------------------------------------------

      // Data binding to hold password reset token -----
      token: null
      // ----------------------------------------------
    }
  },
  methods: {
    async validateOldPassword() {
      this.oldPasswordErrors = []

      if (this.attempts <= 0) {
        this.dialog = true
        this.vDialogHeader = 'Too Many Incorrect Attempts'
        this.vDialogContent =
          'You have entered your password incorrectly too many times. Please consider requesting a password reset email. If you need assistance, please contact your administrator.'
      }

      if (this.oldPasswordField) {
        this.loading = true
        const res = await this.$store.dispatch('auth/getPasswordResetToken', {
          password: this.oldPasswordField,
          token: this.$store.getters['auth/getToken']
        })
        this.loading = false
        if (res.result === 'INVALID_PASSWORD') {
          this.oldPasswordErrors = ['Invalid password!']
          this.attempts--
        } else {
          this.token = res.token
          this.isOldPasswordValid = true
        }
      }
    },
    async updateNewPassword() {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.newPasswordField !== this.retypePasswordField) {
          this.retypePasswordErrors = ['Passwords do not match!']
        } else {
          await this.$store.dispatch('auth/updateUserPassword', {
            password: this.newPasswordField,
            token: this.token
          })
          this.loading = false
          const status = this.$store.getters['auth/getCurrentStatus']
          if (status === 'UPDATE_SUCCESS') {
            this.dialog = true
            this.vDialogHeader = 'Password Updated'
            this.vDialogContent =
              'You have successfully updated your password. Please use your new password for future login.'
          }
        }
      }
    },
    navigateToPasswordResetView() {
      this.$router.push({
        name: 'PasswordReset'
      })
    },
    navigateBackToDashboard() {
      this.$router.replace({
        name: 'Home'
      })
    },
    async logoutUser() {
      await this.$store.dispatch('auth/logoutUser')
      this.$router.replace({
        name: 'Login'
      })
    }
  }
}
</script>


