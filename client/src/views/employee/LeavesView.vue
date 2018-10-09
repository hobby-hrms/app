<template>
  <v-container>
    <v-content class="px-0 py-0">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>Leave Application</h2>
        </v-flex>
        <v-flex xs12>
          <v-container class="px-0 py-4" grid-list-md>
            <v-stepper v-model="stepper" :vertical="$vuetify.breakpoint.smAndDown">
              <v-stepper-header v-if="!$vuetify.breakpoint.smAndDown">
                <v-stepper-step step="1" :complete="step1">Leave Type</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step2">Leave Details</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="step3">Class Replacements</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4" :complete="step4">Attachments</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="5" :complete="step5">Review</v-stepper-step>
              </v-stepper-header>
              <v-stepper-step step="1" :complete="step1" v-if="$vuetify.breakpoint.smAndDown">Leave Type</v-stepper-step>
              <v-stepper-content step="1">
                <v-layout row wrap>
                  <v-flex xs12>
                    <span>Please select leave type</span>
                  </v-flex>
                  <v-flex xs12>
                    <v-form ref="form1" v-model="valid1" lazy-validation @submit.prevent="continueToStep2">
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-select v-model="leave" :items="leaveType" item-value="key" label="Leave Type" required :rules="leaveRules" clearable/>
                        </v-flex>
                        <v-flex xs12 class="text-xs-right">
                          <v-btn color="error" flat left @click="$router.push({ name: 'Home' })">Cancel</v-btn>
                          <v-btn color="primary" :loading="loading" type="submit" flat left>Continue</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="2" :complete="step2" v-if="$vuetify.breakpoint.smAndDown">Leave Details</v-stepper-step>
              <v-stepper-content step="2">
                <v-layout row wrap>
                  <v-flex xs12 sm3 md6>
                    <v-layout row wrap>
                      <v-flex xs6 sm12>
                        <span class="fc-text-bold">Leave Type</span>
                      </v-flex>
                      <v-flex xs6 sm12>
                        <span class="fc-text-capitalize">{{ this.leave === 'special' ? 'Special Purpose' : this.leave }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-layout row wrap>
                      <v-flex xs6 sm12>
                        <span class="fc-text-bold">Entitled</span>
                      </v-flex>
                      <v-flex xs6 sm12>
                        <span>{{ showEntitledLeave }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-layout row wrap>
                      <v-flex xs6 sm12>
                        <span class="fc-text-bold">Taken</span>
                      </v-flex>
                      <v-flex xs6 sm12>
                        <span>{{ showTakenLeave }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                    <v-layout row wrap>
                      <v-flex xs6 sm12>
                        <span class="fc-text-bold">Remaining</span>
                      </v-flex>
                      <v-flex xs6 sm12>
                        <span>{{ showRemainingLeave }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="pt-3">
                    <v-form ref="form2" v-model="valid2" lazy-validation @submit.prevent="continueToStep3">
                      <v-layout row wrap>
                        <v-flex xs12 sm4>
                          <v-menu ref="startDateMenu" lazy v-model="startDateMenu" transition="scale-transition" offset-y full-width min-width="290px" :return-value.sync="startDateMenu">
                            <v-text-field slot="activator" label="Start Date" v-model="startDate" readonly required clearable />
                            <v-date-picker v-model="startDate" no-title scrollable @change="$refs.startDateMenu.save(startDate)" :min="todayDate" />
                          </v-menu>
                        </v-flex>
                        <v-flex xs12 sm4>
                          <v-menu ref="endDateMenu" lazy v-model="endDateMenu" transition="scale-transition" offset-y full-width min-width="290px" :return-value.sync="endDateMenu"
                            :disabled="!startDate">
                            <v-text-field slot="activator" label="End Date" v-model="endDate" readonly required clearable />
                            <v-date-picker v-model="endDate" no-title scrollable @change="$refs.endDateMenu.save(endDate)" :min="startDate" />
                          </v-menu>
                        </v-flex>
                        <v-flex xs12 sm4>
                          <v-text-field label="Total Day(s)" v-model="totalDays" readonly required/>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Purpose of Leave" v-model="purpose" required multi-line :rules="purposeRules" />
                        </v-flex>
                        <v-flex xs12 class="text-xs-right">
                          <v-btn color="error" flat left @click="stepper = 1; step1 = false">Back</v-btn>
                          <v-btn color="primary" :loading="loading" type="submit" flat left>Continue</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="3" :complete="step3" v-if="$vuetify.breakpoint.smAndDown">Class Replacements</v-stepper-step>
              <v-stepper-content step="3">
                <v-layout row wrap>
                  <v-flex xs12>
                    <span>Please state if there is any class replacement due to your leave.</span>
                  </v-flex>
                  <v-flex xs12>
                    <v-form ref="form3" v-model="valid3" lazy-validation @submit.prevent="continueToStep4">
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-radio-group v-model="classReplacement" row :rules="classReplacementRules">
                            <v-radio label="Yes" value="yes"></v-radio>
                            <v-radio label="No" value="no"></v-radio>
                          </v-radio-group>
                        </v-flex>
                        <v-flex xs12 v-if="classReplacement === 'yes'">
                          <v-layout row wrap>
                            <v-flex xs12 sm6>
                              <span>Please fill in your class details. Add more if necessary</span>
                            </v-flex>
                            <v-flex xs12 sm6 class="text-xs-right">
                              <v-btn fab small color="primary" @click="addNewClass">
                                <v-icon>add</v-icon>
                              </v-btn>
                              <v-btn fab small color="error" @click="removeLastClass">
                                <v-icon>delete</v-icon>
                              </v-btn>
                            </v-flex>
                            <v-flex xs12 sm3>
                              <v-menu ref="classDateMenu" lazy :close-on-content-click="false" v-model="classDateMenu" transition="scale-transition" offset-y full-width min-width="290px"
                                :return-value.sync="classDateMenu">
                                <v-text-field slot="activator" label="Class Date" v-model="classDate" readonly required clearable />
                                <v-date-picker v-model="classDate" no-title scrollable @change="$refs.classDateMenu.save(classDate)" :min="startDate" :max="endDate" />
                              </v-menu>
                            </v-flex>
                            <v-flex xs12 sm3>
                              <v-menu ref="classTimeMenu" lazy :close-on-content-click="false" v-model="classTimeMenu" transition="scale-transition" offset-y full-width min-width="290px"
                                :return-value.sync="classTimeMenu">
                                <v-text-field slot="activator" label="Class Time" v-model="classTime" readonly required clearable />
                                <v-time-picker v-model="classTime" scrollable @change="$refs.classTimeMenu.save(classTime)" min="09:00" max="18:00" />
                              </v-menu>
                            </v-flex>
                            <v-flex xs12 sm3>
                              <v-text-field label="Class Code" v-model="classCode" required clearable/>
                            </v-flex>
                            <v-flex xs12 sm3>
                              <v-text-field label="Lecture Room" v-model="classRoom" required clearable/>
                            </v-flex>
                            <v-flex xs12 v-if="classReplacements !== []">
                              <v-layout row wrap>
                                <v-flex xs3>
                                  <span class="fc-text-bold">Date</span>
                                </v-flex>
                                <v-flex xs3>
                                  <span class="fc-text-bold">Time</span>
                                </v-flex>
                                <v-flex xs3>
                                  <span class="fc-text-bold">Class Code</span>
                                </v-flex>
                                <v-flex xs3>
                                  <span class="fc-text-bold">Lecture Room</span>
                                </v-flex>
                                <template v-for="classes in classReplacements">
                                  <v-flex xs3 :key="classes.index">
                                    {{ classes.classDate }}
                                  </v-flex>
                                  <v-flex xs3 :key="classes.index">
                                    {{ classes.classTime }}
                                  </v-flex>
                                  <v-flex xs3 :key="classes.index">
                                    {{ classes.classCode }}
                                  </v-flex>
                                  <v-flex xs3 :key="classes.index">
                                    {{ classes.classRoom }}
                                  </v-flex>
                                </template>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 v-if="classReplacement === 'no'">
                          <v-layout row wrap>
                            <v-flex xs12>
                              <span>Please state your reason(s)</span>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Reason" v-model="noClassReason" required multi-line />
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 class="text-xs-right">
                          <v-btn color="error" flat left @click="stepper = 2; step2 = false">Back</v-btn>
                          <v-btn color="primary" :loading="loading" type="submit" flat left>Continue</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="4" :complete="step4" v-if="$vuetify.breakpoint.smAndDown">Attachments</v-stepper-step>
              <v-stepper-content step="4">
                <v-layout row wrap>
                  <v-flex xs12>
                    <span>Do you have any attachments to upload? (MC, supporting docs, etc...)</span>
                  </v-flex>
                  <v-flex xs12>
                    <v-form ref="form4" v-model="valid4" lazy-validation @submit.prevent="continueToStep5">
                      <v-layout row wrap>
                        <v-flex>
                          <v-radio-group v-model="upload" row :rules="uploadRules">
                            <v-radio label="Yes" value="yes"></v-radio>
                            <v-radio label="No" value="no"></v-radio>
                          </v-radio-group>
                        </v-flex>
                        <v-flex xs12 v-if="upload === 'yes'">
                          <label for="imageUpload" class="fc-upload-button primary white--text">Upload Image</label>
                          <input type="file" @change="saveFileObject" accept=".png,.jpg" id="imageUpload" style="display: none">
                          <span v-if="image"> {{ image.name }}</span>
                        </v-flex>
                        <v-flex xs12 class="text-xs-right">
                          <v-btn color="error" flat left @click="stepper = 3; step3 = false">Back</v-btn>
                          <v-btn color="primary" :loading="loading" type="submit" flat left>Continue</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-stepper-content>
              <v-stepper-step step="5" :complete="step5" v-if="$vuetify.breakpoint.smAndDown">Review</v-stepper-step>
              <v-stepper-content step="5">
                <v-layout row wrap>
                  <v-flex xs12>
                    <span>Please review your details</span>
                  </v-flex>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <span class="fc-text-bold primary--text">Part 1: Leave Type</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Applied Leave Type</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-capitalize">{{ this.leave === 'special' ? 'Special Purpose' : this.leave }}</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Entitled</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ showEntitledLeave }}</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Taken</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ showTakenLeave }}</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Remaining</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ showRemainingLeave }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <span class="fc-text-bold primary--text">Part 2: Leave Details</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Start Date</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ startDate }}</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">End Date</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ endDate }}</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Total Days</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ totalDays }}</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Purpose</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span>{{ purpose }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <span class="fc-text-bold primary--text">Part 3: Class Replacements</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-bold">Class Replacements</span>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span class="fc-text-capitalize">{{ classReplacement }}</span>
                      </v-flex>
                      <template v-if="classReplacement === 'no'">
                        <v-flex xs12 sm6>
                          <span class="fc-text-bold">Reason</span>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <span>{{ noClassReason }}</span>
                        </v-flex>
                      </template>
                      <v-flex xs12 v-if="classReplacement === 'yes'">
                        <v-layout row wrap>
                          <v-flex xs3>
                            <span class="fc-text-bold">Date</span>
                          </v-flex>
                          <v-flex xs3>
                            <span class="fc-text-bold">Time</span>
                          </v-flex>
                          <v-flex xs3>
                            <span class="fc-text-bold">Class Code</span>
                          </v-flex>
                          <v-flex xs3>
                            <span class="fc-text-bold">Lecture Room</span>
                          </v-flex>
                          <template v-for="classes in classReplacements">
                            <v-flex xs3 :key="classes.index">
                              {{ classes.classDate }}
                            </v-flex>
                            <v-flex xs3 :key="classes.index">
                              {{ classes.classTime }}
                            </v-flex>
                            <v-flex xs3 :key="classes.index">
                              {{ classes.classCode }}
                            </v-flex>
                            <v-flex xs3 :key="classes.index">
                              {{ classes.classRoom }}
                            </v-flex>
                          </template>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 class="py-3">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <span class="fc-text-bold primary--text">Part 4: Attachments</span>
                      </v-flex>
                      <v-flex xs12 v-if="upload === 'no'">
                        <span>No attachments</span>
                      </v-flex>
                      <template v-if="upload === 'yes'">
                        <v-flex xs12 sm6>
                          <span class="fc-text-bold">Filename</span>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <span v-if="image">{{ image.name }}</span>
                        </v-flex>
                      </template>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="text-xs-right">
                    <v-btn color="error" flat left @click="stepper = 4; step4 = false">Back</v-btn>
                    <v-btn color="success" :loading="loading" flat left @click="submitNewLeave">Submit</v-btn>
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
            <h2>
              {{ vDialogHeader }}
            </h2>
          </v-flex>
          <v-flex xs12 class="py-2">
            <p>{{ vDialogContent }}</p>
          </v-flex>
          <v-flex xs12 class="text-xs-right">
            <v-btn color="primary" left flat @click="dialog = false; isEmergencyLeaveWarning = false" v-if="isEmergencyLeaveWarning">Ok</v-btn>
            <v-btn color="primary" left flat @click="dialog = false; isInvalidTotalDays = false; $refs.form2.reset()" v-if="isInvalidTotalDays">Ok</v-btn>
            <v-btn color="primary" left flat @click="dialog = false; $router.replace({ name: 'Home' })" v-if="isLeaveSubmitSuccess">Back to Home</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
import { dateDifferenceByDays } from '@/helper/tools'
import { server, aws } from '@/store/helpers/axios.helper'

export default {
  data() {
    return {
      // Dialog data binding ------------
      dialog: false,
      vDialogHeader: null,
      vDialogContent: null,
      // ---------------------------------

      // General data binding -----------
      todayDate: null,
      // -------------------------------

      // Stepper data binding --------------
      stepper: 0,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      // ----------------------------------

      // Remaining leave from server ------
      entitledLeave: null,
      takenLeave: null,
      remainingLeave: null,
      // -----------------------------

      // Form data binding ---------------
      valid1: true,
      valid2: true,
      valid3: true,
      valid4: true,
      // ---------------------------------

      // Buttons data binding -----------------
      loading: false,
      // ---------------------------------------

      // Remainding leave --------
      annual: 0,
      medical: 0,

      // --------------------

      // Step 1: Leave Type ------------------
      leave: null,
      leaveType: [
        { key: 'annual', text: 'Annual' },
        { key: 'medical', text: 'Medical' },
        { key: 'emergency', text: 'Emergency' },
        { key: 'replacement', text: 'Replacement' },
        { key: 'special', text: 'Special Purpose' }
      ],
      leaveRules: [v => !!v || 'Field must not be empty!'],
      // ---------------------------------------

      // Step 2: Leave Details ----------------
      startDateMenu: false,
      endDateMenu: false,
      startDate: null,
      endDate: null,
      totalDays: 0,
      currentRemainingLeave: 0,
      purpose: null,
      purposeRules: [v => !!v || 'Please state your reason!'],
      dateRules: [v => !!v || 'Date is required!'],
      // ----------------------------------------------

      // Step 3: Leave attachment -----------------
      classReplacement: null,
      classReplacementRules: [v => !!v || 'Please select an option!'],
      noClassReason: null,

      classDateMenu: false,
      classTimeMenu: false,

      classDate: null,
      classTime: null,
      classCode: null,
      classRoom: null,

      classReplacements: [],
      // ---------------------------------

      // Step 4: 'Attachments' -----------------
      image: null,
      upload: null,
      uploadRules: [v => !!v || 'Please select an option!'],
      // ---------------------------

      // Data binding for dialog actions
      isLeaveSubmitSuccess: false,
      isEmergencyLeaveWarning: false,
      isInvalidTotalDays: false
    }
  },
  watch: {
    endDate() {
      if (this.startDate && this.endDate) this.calculateTotalDays
    },
    totalDays() {
      if (this.totalDays > this.currentRemainingLeave) {
        this.vDialogHeader = 'Attention!'
        this.vDialogContent = 'You cannot apply more than remaining leaves!'
        this.isInvalidTotalDays = true
        this.dialog = true
      }
    }
  },
  computed: {
    showEntitledLeave() {
      switch (this.leave) {
        case 'medical':
          return parseInt(this.entitledLeave.medical) + ' day(s)'
          break
        case 'annual':
          return parseInt(this.entitledLeave.annual) + ' day(s)'
          break
        case 'emergency':
          return 'N/A'
          break
        case 'replacement':
          const unit = this.entitledLeave.replacement.slice(-1) === 'd' ? ' day(s)' : ' hour(s)'
          return parseInt(this.entitledLeave.replacement) + unit
          break
      }
    },
    showTakenLeave() {
      switch (this.leave) {
        case 'medical':
          return parseInt(this.takenLeave.medical) + ' day(s)'
          break
        case 'annual':
          return parseInt(this.takenLeave.annual) + ' day(s)'
          break
        case 'emergency':
          return parseInt(this.takenLeave.emergency) + ' day(s)'
          break
        case 'replacement':
          const unit = this.takenLeave.replacement.slice(-1) === 'd' ? ' day(s)' : ' hour(s)'
          return parseInt(this.takenLeave.replacement) + unit
          break
      }
    },
    showRemainingLeave() {
      switch (this.leave) {
        case 'medical':
          this.currentRemainingLeave = parseInt(this.remainingLeave.medical)
          return this.currentRemainingLeave + ' day(s)'
          break
        case 'annual':
          this.currentRemainingLeave = parseInt(this.remainingLeave.annual)
          return this.currentRemainingLeave + ' day(s)'
          break
        case 'emergency':
          this.currentRemainingLeave = parseInt(this.remainingLeave.annual)
          return this.currentRemainingLeave + ' day(s)'
          break
        case 'replacement':
          const unit = this.remainingLeave.replacement.slice(-1) === 'd' ? ' day(s)' : ' hour(s)'
          this.currentRemainingLeave = parseInt(this.remainingLeave.replacement)
          return this.currentRemainingLeave + unit
          break
      }
    },
    calculateTotalDays() {
      this.totalDays = dateDifferenceByDays(this.startDate, this.endDate)
      return this.totalDays
    }
  },
  methods: {
    async checkAvailableLeave() {
      return await server.get('/api/leave', {
        headers: {
          Authorization: this.$store.getters['auth/getToken']
        }
      })
    },
    continueToStep2() {
      if (this.$refs.form1.validate()) {
        this.stepper = 2
        this.step1 = true

        if (this.leave === 'emergency') {
          this.vDialogHeader = 'Attention!'
          this.vDialogContent =
            'Applying Emergency Leaves will deduct remaining days from Annual Leave.'
          this.isEmergencyLeaveWarning = true
          this.dialog = true
        }
      }
    },
    continueToStep3() {
      if (this.$refs.form2.validate()) {
        this.stepper = 3
        this.step2 = true
      }
    },
    continueToStep4() {
      if (this.$refs.form3.validate()) {
        this.stepper = 4
        this.step3 = true
      }
    },
    continueToStep5() {
      if (this.$refs.form4.validate()) {
        this.stepper = 5
        this.step4 = true
      }
    },
    saveFileObject() {
      this.image = event.target.files[0]
    },
    addNewClass() {
      if (this.classDate && this.classTime && this.classCode && this.classRoom) {
        this.classReplacements.push({
          classDate: this.classDate,
          classTime: this.classTime,
          classCode: this.classCode,
          classRoom: this.classRoom
        })
        this.classDate = null
        this.classTime = null
        this.classCode = null
        this.classRoom = null
      }
    },
    removeLastClass() {
      this.classReplacements.pop()
    },
    extractDataFromArray() {
      let data = []
      for (let index = 0; index < this.classReplacements.length; index++) {
        const element = {
          classDate: this.classReplacements[index].classDate,
          classTime: this.classReplacements[index].classTime,
          classCode: this.classReplacements[index].classCode,
          classRoom: this.classReplacements[index].classRoom
        }
        data.push(element)
      }
      return data
    },
    generatePayload(link) {
      let classReplacements = []
      if (this.classReplacement === 'yes') {
        classReplacements = this.extractDataFromArray()
      }
      return {
        leave: this.leave,
        startDate: this.startDate,
        endDate: this.endDate,
        totalDays: this.totalDays.toString() + 'd',
        purpose: this.purpose,
        classReplacements,
        noClassReason: this.noClassReason || '',
        attachmentLink: link || ''
      }
    },
    async getPresignedUrl() {
      return await server.get(`/api/upload?type=${this.image.type}`, {
        headers: {
          Authorization: this.$store.getters['auth/getToken']
        }
      })
    },
    async uploadImage(presignedUrl) {
      try {
        await aws.put(presignedUrl, this.image, {
          headers: {
            'Content-Type': this.image.type
          }
        })
        return { status: 'UPLOAD_OK' }
      } catch (err) {
        throw { status: 'UPLOAD_ERROR' }
      }
    },
    async submitNewLeave() {
      try {
        if (this.upload === 'yes') {
          this.loading = true
          const presignedUrl = await this.getPresignedUrl()
          const upload = await this.uploadImage(presignedUrl.data.result.url)
          if (upload.status === 'UPLOAD_OK') {
            const payload = this.generatePayload(presignedUrl.data.result.key)
            const res = await server.post('/api/leave', payload, {
              headers: {
                Authorization: this.$store.getters['auth/getToken']
              }
            })
            const result = res.data.result
            if (result === 'LEAVE_CREATED') {
              this.loading = false
              this.vDialogHeader = 'Leave Submitted'
              this.vDialogContent = 'Your leave have been successfully submitted.'
              this.isLeaveSubmitSuccess = true
              this.dialog = true
            }
          }
        } else {
          this.loading = true
          const payload = this.generatePayload()
          const res = await server.post('/api/leave', payload, {
            headers: {
              Authorization: this.$store.getters['auth/getToken']
            }
          })
          const result = res.data.result
          if (result === 'LEAVE_CREATED') {
            this.loading = false
            this.vDialogHeader = 'Leave Submitted'
            this.vDialogContent = 'Your leave have been successfully submitted.'
            this.isLeaveSubmitSuccess = true
            this.dialog = true
          }
        }
      } catch (err) {
        if (err.status === 'UPLOAD_ERROR') {
          this.vDialogHeader = 'Error'
          this.vDialogContent = 'Unable to upload attachment, please try again'
          this.dialog = true
        } else {
          console.log(err.response)
        }
      }
    }
  },
  async created() {
    const res = await this.checkAvailableLeave()
    const result = res.data.result
    this.remainingLeave = result.remainingLeave
    this.takenLeave = result.takenLeave
    this.entitledLeave = result.entitledLeave

    const date = new Date().toISOString().split('T')
    this.todayDate = date[0]
  }
}
</script>

<style scoped>
.fc-upload-button {
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
