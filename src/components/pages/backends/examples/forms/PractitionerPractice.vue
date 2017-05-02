<template>
<el-card v-else id='profile-form' key='profile' >
  <div slot="header" class="clearfix">
    <strong style="line-height: 36px;">Your Practice</strong>
    <el-button
      @click='saveProfile'
      :loading='requestIsLoading(updateProfileRequest)'
      style="float: right;" type="primary">Save profile</el-button>
  </div>

  <el-form v-loading="requestIsLoading(updateProfileRequest)" >
    <el-form-item label='What is the name of your practice?' >
      <el-input  v-model="profile.practice_name" >
      </el-input>
      <field-error-messages
        :request='updateProfileRequest'
        field='practice_name' ></field-error-messages>
    </el-form-item>
    <el-form-item label='Please choose a sub-domain' >
      <el-input  v-model="profile.sub_domain" >
        <template slot="prepend">https://bookme.guru/</template>
      </el-input>
      <el-form-item
        class='help-text'
        label='This will determine the url for your online booking page' >
      </el-form-item>
      <field-error-messages
        :request='updateProfileRequest'
        field='sub_domain' ></field-error-messages>
    </el-form-item>

    <h4>
      Visibility settings
      <el-tooltip content="You can always change these later from your settings page in the web app" placement="right">
        <i class='el-icon-information' ></i>
      </el-tooltip>
    </h4>

    <el-form-item label="Make my booking page available online" >
      <el-switch on-text="yes" off-text="no" v-model="profile.is_website_published" ></el-switch>
      <el-form-item v-show='profile.is_website_published' >
        <span> Your site will be available at:
        <a
          :href="'https://bookme.guru/' + profile.sub_domain + '/'" target='_blank' >
          https://bookme.guru/{{profile.sub_domain}}/
        </a>
        </span>
      </el-form-item>
    </el-form-item>
    <el-form-item label="Allow clients to book through the AppointmentGuru app" >
      <el-switch on-text="yes" off-text="no" v-model="profile.is_visible_in_app" ></el-switch>
    </el-form-item>

  </el-form>
</el-card>
</template>
<script type="text/javascript">
import Mixins from '@/store/mixins'
import FieldErrorMessages from '@/components/FieldErrorMessages'

const UPDATE_PROFILE_REQUEST = 'update-profile-request'

export default {
  name: 'Temp',
  mixins: [Mixins],
  components: {FieldErrorMessages},
  props: {
    initialData: { type: Object, default: () => { return {} } }
  },
  data () {
    return {
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
    initialData () {
    }
  },
  computed: {
    practiceName () {
      return this.profile.practice_name
    },
    updateProfileRequest () {
      return this.$requeststore.getters
              .getRequestById(UPDATE_PROFILE_REQUEST)
    }
  },
  methods: {
    _slugify (text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    },
    saveProfile () {
      let id = 1 // fix this:
      this.$appointmentguru
        .resource('practitioner.me.profile')
        .id(UPDATE_PROFILE_REQUEST).save(id, this.profile)
    }
  }
}
</script>
