<style>
.action-button { float:right; }
</style>
<template>
<el-card id='whoami' key='whoami' >

  <div slot="header" class="clearfix">
    <strong style="line-height: 36px;">Let's get started</strong>

    <el-button
      v-if='nextStep === "auth-register"'
      type="primary" class='action-button' >Create account
    </el-button>
    <el-button
      v-else-if='nextStep === "otp-auth"'
      type="primary" class='action-button' >Submit OTP
    </el-button>
    <el-button
      v-else-if='nextStep === "token-auth"'
      @click='login'
      type="primary" class='action-button' >Login
    </el-button>
    <span v-else >
    <el-button
      @click='getId'
      :loading='requestIsLoading(identifyRequest)'
      type="primary" class='action-button' >Next</el-button>
    <!-- <el-button @click='autoLogin' type='text' style="float: right; margin-right:10px;" >
      auto login</el-button> -->
    </span>
  </div>

  <el-form >
    <span
      v-show='requestIsLoading(identifyRequest)'
      class='pull-right' style='margin-top:5px;' >
    <i class="el-icon-loading" ></i>
    </span>
    <el-form-item label='Please provide your phone number' >
      <el-input
        @change='checkPhoneLength'
        v-model='user.phoneNumber' ></el-input>
    </el-form-item>
  </el-form>

  <transition name='fade' >
  <el-form v-if='nextStep === "auth-register"' >
    <el-form-item label='Your full name?' >
      <el-input v-model='user.fullName' ></el-input>
    </el-form-item>
    <el-form-item label='E-mail' >
      <el-input v-model='user.password' ></el-input>
    </el-form-item>
    <el-form-item label='Pick a password' >
      <el-input v-model='user.password' ></el-input>
    </el-form-item>
  </el-form>
  </transition>

  <transition name='fade' >
  <el-form v-show='nextStep === "auth-otp" || showOTP === true' >
    <span
      v-show='requestIsLoading(validateOtpRequest)'
      class='pull-right' style='margin-top:5px;' >
    <i class="el-icon-loading" ></i>
    </span>
    <el-form-item label='Please enter your OTP' >
      <el-input @change='checkOTPLength' v-model='user.otp' ></el-input>
    </el-form-item>
  </el-form>
  </transition>

  <transition name='fade' >
  <el-form v-if='nextStep === "token-auth"' >
    <el-form-item label='Please enter your password' >
      <el-input v-model='user.password' ></el-input>
      <el-button
        @click='showOTP = true'
        type='text' size='small' >Forgot password</el-button>
    </el-form-item>
  </el-form>
  </transition>

  <transition name='fade' >
  <el-form v-show='nextStep === "set-password"' >
    <el-form-item label='Please set your password' >
      <el-input v-model='user.otp' ></el-input>
    </el-form-item>
  </el-form>
  </transition>
</el-card>
</template>
<script type="text/javascript">
const ID_REQUEST = 'auth-identify-request'
const LOGIN_REQUEST = 'auth-login-request'
const OTP_AUTH_REQUEST = 'auth-validate-otp'

import Mixins from '@/store/mixins'
import FieldErrorMessages from '@/components/FieldErrorMessages'

export default {
  name: 'WhoAmI',
  mixins: [Mixins],
  components: {FieldErrorMessages},
  props: {
    initialData: { type: Object, default: () => { return {} } }
  },
  data () {
    return {
      showOTP: false,
      user: {
        phoneNumber: '+27'
      }
    }
  },
  watch: {
    loginRequestStatus () {
      if (this.loginRequestStatus === 200) {
        let token = this.loginRequest.result.data.token
        this.setToken(token)
        this.$emit('whoami:loggedin')
      }
    },
    validateOtpRequestStatus () {
      if (this.validateOtpRequestStatus === 200) {
        let token = this.validateOtpRequest.result.data.token
        this.setToken(token)
        this.$emit('whoami:loggedin')
      }
    }
  },
  computed: {
    identifyRequest () {
      return this.$requeststore.getters.getRequestById(ID_REQUEST)
    },
    loginRequest () {
      return this.$requeststore.getters.getRequestById(LOGIN_REQUEST)
    },
    loginRequestStatus () {
      let r = this.loginRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    validateOtpRequest () {
      return this.$requeststore.getters.getRequestById(OTP_AUTH_REQUEST)
    },
    validateOtpRequestStatus () {
      let r = this.validateOtpRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    nextStep () {
      if (this.identifyRequest !== -1) {
        if (this.identifyRequest.result && this.identifyRequest.result.data) {
          return this.identifyRequest.result.data.type
        }
      }
      return null
    }
  },
  methods: {
    getId () {
      let options = {
        id: ID_REQUEST,
        params: {phone_number: this.user.phoneNumber}
      }
      this.$appointmentguru
        .endpoint('auth-identify', options)
          // .then((result) => { this.getIdId = result })
    },
    checkPhoneLength () {
      if (this.user.phoneNumber.length === 12) {
        this.getId()
      }
    },
    checkOTPLength () {
      if (this.user.otp.length === 4) {
        this.validateOTP()
      }
    },
    login () {
      let options = {
        id: LOGIN_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          password: this.user.password
        }
      }
      this.$appointmentguru
        .endpoint('auth-login-phone', options)
    },
    validateOTP () {
      let options = {
        id: OTP_AUTH_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          otp: this.user.otp
        }
      }
      this.$appointmentguru.endpoint('auth-validate-otp', options)
    },
    autoLogin () {
      this.user.phoneNumber = '+27...'
      this.user.password = '...'
      this.login()
    },
    setToken (token) {
      let data = [
        this.$appointmentguru.name,
        'Authorization',
        `token ${token}`
      ]
      this.$requeststore.commit('BACKEND_CONFIG_SET_HEADER', data)
    }
  }
}
</script>
