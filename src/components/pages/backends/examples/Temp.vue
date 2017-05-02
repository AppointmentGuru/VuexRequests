<template>
<div>

  <transition name="fade" mode="out-in" >
    <who-am-i
      id='whoami' key='whoami'
      v-if='meRequest === -1 || meRequest.status !== 200'
      @whoami:loggedin='getMe' >
    </who-am-i>

    <practitioner-practice v-else key='practitioner-practice' >
    </practitioner-practice>
  </transition>


</div>
<!--
* Who are you / create account
* Verify personal details
* Business details
* donezo
-->
</template>
<script type="text/javascript">
import Mixins from '@/store/mixins'
import FieldErrorMessages from '@/components/FieldErrorMessages'
import WhoAmI from './forms/WhoAmI'
import PractitionerPractice from './forms/PractitionerPractice'

const ID_REQUEST = 'auth-identify-request'
const LOGIN_REQUEST = 'auth-login-request'
const ME_REQUEST = 'me-request'
const UPDATE_PROFILE_REQUEST = 'update-profile-request'

export default {
  name: 'Temp',
  mixins: [Mixins],
  components: {FieldErrorMessages, WhoAmI, PractitionerPractice},
  data () {
    return {
      getIdId: null,
      showOTP: false,
      show: true,
      user: {},
      contacts: {},
      profile: {
        sub_domain: '',
        practice_name: '',
        is_website_published: '',
        is_visible_in_app: ''
      }
    }
  },
  watch: {
    practiceName () {
      this.profile.sub_domain = this._slugify(this.practiceName)
    },
    loginRequestStatus () {
      if (this.loginRequestStatus === 200) {
        let token = this.loginRequest.result.data.token
        let data = [
          this.$appointmentguru.name,
          'Authorization',
          `token ${token}`
        ]
        this.$requeststore.commit('BACKEND_CONFIG_SET_HEADER', data)
        this.getMe()
      }
    }
  },
  computed: {
    practiceName () {
      return this.profile.practice_name
    },
    updateProfileRequest () {
      return this.$requeststore.getters
              .getRequestById(UPDATE_PROFILE_REQUEST)
    },
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
    meRequest () {
      return this.$requeststore.getters.getRequestById(ME_REQUEST)
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
    _requestById (id) {
      return this.$requeststore.getters.getRequestById(id)
    },
    _slugify (text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    },
    getId () {
      let options = {
        id: ID_REQUEST,
        params: {phone_number: this.user.phoneNumber}
      }
      this.$appointmentguru
        .endpoint('auth-identify', options)
          // .then((result) => { this.getIdId = result })
    },
    autoLogin () {
      this.user.phoneNumber = '+27832566533'
      this.user.password = 'testtest'
      this.login()
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
    getMe () {
      this.$appointmentguru
        .resource('practitioner.me.profile')
        .id(ME_REQUEST).list()
    },
    saveProfile () {
      let id = this.meRequest.result.data[0].user
      this.$appointmentguru
        .resource('practitioner.me.profile')
        .id(UPDATE_PROFILE_REQUEST).save(id, this.profile)
    }
  }
}
</script>
