<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" app dark width="250" disable-resize-watcher disable-route-watcher>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 class="fc-ta-center">
            <v-avatar size="100">
              <img :src="userAvatar" alt="">
            </v-avatar>
            <span class="fc-user-display-header pt-2">{{ userName }}</span>
            <span class="fc-user-display-subHeader fc-text-capitalize">{{ userPosition }} - {{ userRole }}</span>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- <v-list two-line>
        <v-list-tile avatar>
          <v-list-tile-avatar size="40">
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ userName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ userPosition }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->
      <v-divider></v-divider>
      <v-list>
        <v-list-group v-model="selection.active" v-for="selection in selections" :key="selection.title" :prepend-icon="selection.icon" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ selection.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router v-for="subSelection in selection.items" :key="subSelection.title" :to="subSelection.route" exact @click="closeDrawer">
            <v-list-tile-content>
              <v-list-tile-title>{{ subSelection.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <img :src="logoUrl" class="fc-dashboard-logo">
      <v-spacer></v-spacer>
      <v-btn icon router :to="goToHome" exact active-class="primary--text">
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content class="px-0 py-0">
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
    <v-footer fixed app inset>
      <span>&copy; 2017</span>
    </v-footer>
  </v-content>
</template>

<script>
import { store } from '@/store/index'
import { employeeConfig } from '@/helper/employee.dashboard'
import { adminConfig } from '@/helper/admin.dashboard'

export default {
  data() {
    return {
      drawer: true,
      logoUrl: 'https://s3-ap-southeast-1.amazonaws.com/fcuc-hrms-dev/public/logo.png',
      userName: 'Default User',
      userPosition: 'Developer',
      userRole: 'Standard',
      userAvatar: null,
      dashboardTitle: 'Welcome Back',
      navigateToHome: {
        name: 'Home'
      },
      goToHome: {
        name: 'Home'
      },
      selections: [],
      imageWidth: {
        width: '100px'
      }
    }
  },
  methods: {
    closeDrawer() {
      if (window.innerWidth < 1264) {
        this.drawer = false
      }
    },
    logout() {
      return this.$store.dispatch('auth/logoutUser').then(() => {
        return this.$router.replace({ name: 'Login' })
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    const status = store.getters['auth/getCurrentStatus']
    const user = store.getters['auth/getUser']
    if (status != 'VERIFIED') {
      return next({ name: 'Login', replace: true })
    }
    return next(vm => {
      if (user.role === 'administrator' || user.role === 'superuser') {
        vm.selections = [...adminConfig]
      } else {
        vm.selections = [...employeeConfig]
      }
      if (user.avatar) {
        vm.userAvatar = user.avatar
      }
      vm.userName = user.name
      vm.userRole = user.role
      vm.userPosition = user.position
    })
  }
}
</script>

<style scoped>
.fc-user-display-header {
  display: block;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

.fc-user-display-subHeader {
  display: block;
  color: #ffffff;
  font-size: 15px;
  font-style: italic;
}
</style>



