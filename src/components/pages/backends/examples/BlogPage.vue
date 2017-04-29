<template>
<div>
  <el-row >
    <el-col :md='6' >
      <ul v-if='posts !== -1' >
        <li
          v-for='post in posts.result.data'
          @click='setActive(post)' >{{post.title}}</li>
      </ul>
      <div v-if='posts === -1' >
      loading posts...
      </div>
    </el-col>
    <el-col :md='18' >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">#{{activePost.id}}: {{activePost.title}}</span>
          <el-button type='danger' size='small' style='float:right;' >
            Delete</el-button>
          <el-button
            size='small' style='float:right;' >
            Edit</el-button>
        </div>
        <div class="text item">
          <p>{{activePost.body}}</p>
        </div>
      </el-card>

      <hr/>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">New blog post</span>
          <request-status-tag :request='createRequest' >
          </request-status-tag>
          <el-button
            @click='create'
            :loading='requestIsLoading(createRequest)'
            type="primary" style='float:right' >Create</el-button>
        </div>
        <div
          v-loading.body="requestIsLoading(createRequest)"
          class="text item" >
          <el-form >
            <el-form-item label="Title" prop="name">
              <el-input v-model="blogForm.title"></el-input>
            </el-form-item>
            <el-form-item label="Content" prop="desc">
              <el-input type="textarea" v-model="blogForm.body"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <!-- <pre>{{createRequest}}</pre> -->
      <!-- <ul>{{requests}}</ul> -->
    </el-col>
  </el-row>
</div>
</template>
<script type="text/javascript">
const BLOG_POSTS = 'blogs-list'
const CREATE_REQUEST = 'blogs-create'

import RequestStatusTag from '@/components/RequestStatusTag'
import Mixins from '@/store/mixins'

export default {
  name: 'BlogPage',
  mixins: [Mixins],
  components: { RequestStatusTag },
  mounted () {
    this.$jsonplaceholder.resource('posts').id(BLOG_POSTS).list()
  },
  data () {
    return {
      activePost: {},
      blogForm: {
        title: null,
        body: null
      }
    }
  },
  watch: {
    createRequest () {
      if (this.createRequest.result.status === 201) {
        this.$message({ message: 'New post created', type: 'success' })
        this.activePost = this.createRequest.result.data
      }
      if (this.createRequest.result.status === 500) {
        this.$message({ message: 'There was an error creating your post', type: 'error' })
      }
    }
  },
  methods: {
    setActive (post) { this.activePost = post },
    create () {
      this.$jsonplaceholder
        .resource('posts')
        .id(CREATE_REQUEST)
        .create(this.blogForm, ['create-blog'])
    }
  },
  computed: {
    requests () {
      return this.$requeststore.getters.getRequestsByTag('create-blog')
    },
    createRequest () {
      return this.$requeststore.getters.getRequestById(CREATE_REQUEST)
    },
    posts () {
      return this.$requeststore.getters.getRequestById(BLOG_POSTS)
    }
  }
}
</script>
