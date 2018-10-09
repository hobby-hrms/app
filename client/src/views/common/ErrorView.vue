<template>
  <v-content class="fc-login-view">
    <v-container justify-center fill-height>
      <div class="fc-container">
        <v-layout row wrap>
          <v-flex xs12 class="fc-ta-center">
            <template v-if="errorCode === 404">
              <h1>404: Resource Not Found</h1>
              <p>Unfortunately, the resource that you are looking for is no longer available. If you think this is an
                error, please contact your administrator.</p>
            </template>
            <template v-if="errorCode === 401">
              <h1>401: Link Expired</h1>
              <p>Unfortunately, the link that you provided has expired. Please request a new link if necessary. If you think this is an
                error, please contact your administrator.</p>
            </template>
            <template v-if="errorCode === 500">
              <h1>500: Internal Server Error</h1>
              <p>Oops, something went wrong at our side. Please check back again while we fix the problem.</p>
            </template>
            <template v-if="errorCode === 503">
              <h1>503: Service Unavailable</h1>
              <p>Unfortunately, the server is currently down or undergoing maintenance.</p>
            </template>
            <v-btn v-if="errorCode !== 503" @click="navigateBackToLogin" block color="primary">Back to Login</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data(){
    return {
      errorCode: 404
    }
  },
  mounted(){
    const status = this.$store.getters['auth/getCurrentStatus']
    console.log(status)
    if (status === 'TOKEN_EXPIRED') {
      this.errorCode = 401
    } else if (status === 'INTERNAL_SERVER_ERROR') {
      this.errorCode = 500
    }
  },
  methods: {
    navigateBackToLogin() {
      this.$router.replace({
        name: 'Login'
      })
    }
  }
}
</script>
