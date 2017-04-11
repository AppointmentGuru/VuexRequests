webpackJsonp([1],[,,,,,,,,,,,,,,function(e,t,s){"use strict";t.a={methods:{getRequestById:function(e){if(e){console.log(e);var t=this.$requeststore.state.requests;if(e in t.index){var s=t.index[e];return t.requests[s]}}return-1},getResultKey:function(e,t,s){var r=this.getRequestById(e);return r&&r!==-1?r.result[t]:s},getResponseKey:function(e,t,s){var r=this.getRequestById(e);return r&&r!==-1?r[t]:s}}}},,,,,,function(e,t,s){"use strict";var r=s(47);t.a={store:r.a,install:function(e,t){e.prototype.$requeststore=r.a}}},function(e,t,s){var r=s(1)(s(48),s(89),null,null);e.exports=r.exports},function(e,t,s){s(83);var r=s(1)(s(49),s(90),"data-v-4d28a115",null);e.exports=r.exports},function(e,t,s){var r=s(1)(s(52),s(94),null,null);e.exports=r.exports},function(e,t,s){var r=s(1)(s(53),s(91),null,null);e.exports=r.exports},,,,,,,,,,,,,,,,,,,,function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(4),n=s(25),a=s(21),i=s.n(a),u=s(20),o=s(22),l=s.n(o),c=s(24),d=s.n(c),v=s(23),p=s.n(v);r.a.config.productionTip=!1,r.a.use(u.a),r.a.use(n.a);var _=[{path:"/",component:l.a},{path:"/randomuser",component:d.a},{path:"/github",component:p.a}],f=new n.a({routes:_});r.a.directive("highlightjs",{deep:!0,bind:function(e,t){e.querySelectorAll("code").forEach(function(e){t.value&&(e.textContent=t.value),hljs.highlightBlock(e)})},componentUpdated:function(e,t){e.querySelectorAll("code").forEach(function(e){t.value&&(e.textContent=t.value,hljs.highlightBlock(e))})}}),new r.a({router:f,el:"#app",template:"<App/>",components:{App:i.a}})},function(e,t,s){"use strict";function r(){return Math.random().toString().split(".")[1]}function n(e,t){return t.id||(t.id=r()),t.result={status:0},t.method=e,t.loading=!0,t.modified=(new Date).getTime(),t}function a(e,t,s){t.getRequestById(s.id)===-1?e("PUSH_REQUEST",s):e("UPDATE_REQUEST",s);var r=["post","put","patch"],n=r.indexOf(s.method)!==-1,a=null;return a=n?o[s.method](s.url,s.data,s):o[s.method](s.url,s),a.then(function(t){s.modified=(new Date).getTime(),s.loading=!1,s.result=t,e("UPDATE_REQUEST",s)}).catch(function(t){s.modified=(new Date).getTime(),s.loading=!1,t.response?s.result=t.response:(s.result.message=t.message,s.result.name=t.toString(),s.result.config=t.config),s.result.status||(s.result.status=500,s.result.statusText=t.toString()),e("UPDATE_REQUEST",s)})}var i=s(26),u=s.n(i);s.d(t,"a",function(){return l}),s.d(t,"b",function(){return c}),s.d(t,"c",function(){return d}),s.d(t,"d",function(){return v}),s.d(t,"e",function(){return p}),s.d(t,"f",function(){return _}),s.i({NODE_ENV:"production"}).API_ROOT||console.warn("No API route defined. Please set API route in config/dev.env.js");var o=u.a.create({baseURL:s.i({NODE_ENV:"production"}).API_ROOT,headers:{"Content-Type":"application/json"}}),l=function(e,t){var s=e.commit,r=e.getters;return t=n("get",t),a(s,r,t),t.id},c=function(e,t){var s=e.commit,r=e.getters;return t=n("post",t),a(s,r,t)},d=function(e,t){var s=e.commit,r=e.getters;return t=n("put",t),a(s,r,t)},v=function(e,t){var s=e.commit,r=e.getters;return t=n("patch",t),a(s,r,t)},p=function(e,t){var s=e.commit,r=e.getters;return t=n("delete",t),a(s,r,t)},_=function(e,t){var s=e.getters,r=e.commit,n=s.getRequestById(t);if(n!==-1)return n.result.status=0,n.loading=!0,r("UPDATE_REQUEST",n),a(r,s,n)}},function(e,t,s){"use strict";var r,n=s(55),a=s.n(n),i=s(56),u=s.n(i),o=s(4),l=s(45);t.a={state:{requests:[],index:{}},mutations:(r={},u()(r,"UPDATE_REQUEST",function(e,t){var s=e.index[t.id];o.a.set(e.requests,s,t)}),u()(r,"PUSH_REQUEST",function(e,t){e.requests.push(t);var s=e.requests.length-1;o.a.set(e.index,t.id,s)}),u()(r,"REMOVE_REQUEST",function(e,t){console.log("remove request: "+t)}),r),actions:{GET:l.a,POST:l.b,PUT:l.c,PATCH:l.d,DELETE:l.e,RETRY:l.f},getters:{getRequestById:function(e,t){return function(t){if(t in e.index){var s=e.index[t];return e.requests[s]}return-1}},totalRequestCount:function(e){return a()(e.requests).length},getRequestByStatusCode:function(e,t){return function(t){return e.requests.filter(function(e){return e.result.status===t})}},getRequestByStatusClass:function(e,t){return function(t){return e.requests.filter(function(e){if(e.result&&e.result.status)return 0===e.result.status.toString().indexOf(t)})}},getInProgressRequests:function(e,t){return t.getRequestByStatusCode(0)},getClientErrorRequests:function(e,t){return t.getRequestByStatusClass("4")},getServerErrorRequests:function(e,t){return t.getRequestByStatusClass("5")}}}},function(e,t,s){"use strict";var r=s(4),n=s(96),a=s(46);r.a.use(n.a),t.a=new n.a.Store({modules:{requests:a.a}})},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(88),n=s.n(r),a=s(87),i=s.n(a);t.default={name:"VuexRequests",components:{RequestItem:n.a,RequestDetail:i.a},data:function(){return{resultCode:400,activeRequest:{}}},created:function(){var e={url:"https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole",id:"get_random_users"};this.$requeststore.dispatch("GET",e),this.activeRequest=e},computed:{requests:function(){return this.$requeststore.state.requests.requests},random_user_request:function(){var e=this.$requeststore.getters.getRequestById("get_random_users");return e!==-1?e:{}},users:function(){var e=this.$requeststore.getters.getRequestById("get_random_users");return e!==-1?e.result.data:[]},usersLoading:function(){var e=this.$requeststore.getters.getRequestById("get_random_users");return e!==-1&&e.loading},index:function(){return this.$requeststore.state.requests.index},requestCount:function(){return this.$requeststore.getters.totalRequestCount},inprogressRequests:function(){return this.$requeststore.getters.getInProgressRequests},successRequests:function(){return this.$requeststore.getters.getRequestByStatusCode(200)},clientErrorRequests:function(){return this.$requeststore.getters.getClientErrorRequests},serverErrorRequests:function(){return this.$requeststore.getters.getServerErrorRequests}},methods:{createRequest:function(){var e={url:"api/"};return this.$requeststore.dispatch("GET",e)},retry:function(e){return this.$requeststore.dispatch("RETRY",e)},showRequest:function(e){this.activeRequest=e,$("#req-modal").modal("show")}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"RequestDetail",props:{request:{type:Object,required:!0}},mounted:function(){$("#reqResTabs a").click(function(e){e.preventDefault(),$(this).tab("show")})}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Request",props:{request:{type:Object,required:!0}},methods:{emit:function(e,t){var s="requestitem:"+e;console.log(s,t),this.$emit(s,t)}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(14),n={get_repos:function(e){return{id:"GET_REPOS",url:"https://api.github.com/user/repos",headers:{Authorization:"token "+e},params:{sort:"created",direction:"desc"}}},get_repo:function(e,t){return{id:"GET_REPO",url:"https://api.github.com/user/repos/"+t,headers:{Authorization:"token "+e}}},create_repo:function(e,t){return{id:"CREATE_REPO",url:"https://api.github.com/user/repos",headers:{Authorization:"token "+e},data:{name:t}}},delete_repo:function(e,t){return{id:"DELETE_REPO",url:"https://api.github.com/repos/"+t,headers:{Authorization:"token "+e}}}};t.default={name:"GithubCRUDPage",mixins:[r.a],data:function(){return{token:"",repoName:"",selectedRepo:{}}},methods:{fetch:function(){this.$requeststore.dispatch("GET",n.get_repos(this.token))},createRepo:function(){this.$requeststore.dispatch("POST",n.create_repo(this.token,this.repoName))},showRepo:function(e){this.selectedRepo=e},deleteRepo:function(e){window.confirm("Are you sure you want to delete repo: "+e.full_name+"?")&&this.$requeststore.dispatch("DELETE",n.delete_repo(this.token,e.full_name))}},computed:{repos:function(){return this.getResultKey("GET_REPOS","data",[])},reposChanged:function(){return this.getResponseKey("GET_REPOS","modified",0)},reposLoading:function(){return this.getResponseKey("GET_REPOS","loading",!1)}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(14);t.default={name:"RandomUserPage",mixins:[r.a],mounted:function(){this.fetch()},computed:{request:function(){var e=this.getRequestById("get_users_request");return e!==-1?e:{result:{data:{results:[[]]}}}},users:function(){try{if(this.request)return this.request.result.data.results[0]}catch(e){console.log(e)}return[]},usersLoading:function(){return!!this.request&&this.request.loading}},methods:{fetch:function(){var e={url:"https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb",id:"get_users_request"};this.$requeststore.dispatch("GET",e)},retry:function(){this.$requeststore.dispatch("RETRY","get_users_request")}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},,function(e,t,s){s(84);var r=s(1)(s(50),s(92),"data-v-69f05e66",null);e.exports=r.exports},function(e,t,s){s(85);var r=s(1)(s(51),s(93),"data-v-751368e2",null);e.exports=r.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("nav",{staticClass:"navbar navbar-toggleable-md navbar-light bg-faded"},[e._m(0),e._v(" "),s("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[e._v("VuexRequests")]),e._v(" "),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"navbar-nav mr-auto"},[e._m(1),e._v(" "),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{to:"/",href:"#"}},[e._v("Demo")])],1),e._v(" "),s("li",{staticClass:"nav-item active"},[s("router-link",{staticClass:"nav-link",attrs:{to:"/randomuser",href:"#"}},[e._v("Get Example")])],1),e._v(" "),s("li",{staticClass:"nav-item active"},[s("router-link",{staticClass:"nav-link",attrs:{to:"/github",href:"#"}},[e._v("CRUD Example")])],1)])])]),e._v(" "),s("router-view")],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{staticClass:"navbar-toggler navbar-toggler-right",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[s("span",{staticClass:"navbar-toggler-icon"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{staticClass:"nav-item active"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[e._v("Home "),s("span",{staticClass:"sr-only"},[e._v("(current)")])])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("form",{staticClass:"form-inline p-2"},[s("label",{attrs:{for:"inlineFormInput"}},[e._v("Server response status:")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.resultCode,expression:"resultCode"}],staticClass:"form-control mb-2 mr-sm-2 mb-sm-0",attrs:{type:"text",id:"inlineFormInput"},domProps:{value:e.resultCode},on:{input:function(t){t.target.composing||(e.resultCode=t.target.value)}}}),e._v(" "),s("button",{staticClass:"btn",on:{click:e.createRequest}},[e._v("Create request")])])]),e._v(" "),s("hr"),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("h5",[e._v("In progress")]),e._v(" "),e._l(e.inprogressRequests,function(t){return[s("request-item",{attrs:{request:t}}),e._v(" "),s("button",{on:{click:function(s){e.retry(t.id)}}},[e._v("Cancel")])]})],2),e._v(" "),s("div",{staticClass:"col"},[s("h5",[e._v("Error requests")]),e._v(" "),s("strong",[e._v("Client errors (4xx)")]),e._v(" "),e._l(e.clientErrorRequests,function(t){return s("request-item",{key:t.id,attrs:{request:t},on:{"requestitem:retry":e.retry,"requestitem:select":e.showRequest}})}),e._v(" "),s("strong",[e._v("Server errors (5xx)")]),e._v(" "),e._l(e.serverErrorRequests,function(t){return s("request-item",{key:t.id,attrs:{request:t},on:{"requestitem:retry":e.retry,"requestitem:select":e.showRequest}})})],2),e._v(" "),s("div",{staticClass:"col"},[s("h5",[e._v("Success requests")]),e._v(" "),e._l(e.successRequests,function(t){return s("request-item",{key:t.id,attrs:{request:t},on:{"requestitem:retry":e.retry,"requestitem:select":e.showRequest}})})],2)]),e._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"req-modal"}},[s("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[e._m(0),e._v(" "),s("div",{staticClass:"modal-body"},[s("request-detail",{attrs:{request:e.activeRequest}})],1),e._v(" "),e._m(1)])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title"},[e._v("Request detail")]),e._v(" "),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h1",[e._v("Random User Example")]),e._v(" "),s("blockquote",[e._v("An example that demonstrates using VuexRequests to interact with the RandomUser.io API")]),e._v(" "),s("hr"),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("ul",{staticClass:"list-group"},[s("li",{staticClass:"list-group-item"},[s("button",{staticClass:"btn",on:{click:e.retry}},[e._v("Reload")]),e._v("\n          Loading: "+e._s(e.usersLoading)+"\n        ")]),e._v(" "),e._l(e.users,function(t){return s("li",{staticClass:"list-group-item"},[e._v("\n            "+e._s(t.first)+" "+e._s(t.last))])})],2)]),e._v(" "),s("div",{staticClass:"col"},[s("div",{staticClass:"p-2"},[s("h3",[e._v("Code for this example:")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[s("code",{staticClass:"JavaScript"},[e._v("\nconst GET_USERS_REQUEST = 'get_users_request'\n\nexport default {\n  name: 'RandomUserPage',\n  mounted () {\n    this.fetch()\n  },\n  computed: {\n    request () {\n      let req = this.$requeststore.getters.getRequestById(GET_USERS_REQUEST)\n      let requestExists = (req !== -1)\n      if (requestExists) {\n        return req\n      } else { // if no request exists. return a blank mock\n        return { result: { data: { results: [[]] } } }\n      }\n    },\n    users () {\n      if (this.request) { return this.request.result.data.results[0] }\n      return []\n    },\n    usersLoading () {\n      if (this.request) { return this.request.loading }\n      return false\n    }\n  },\n  methods: {\n    fetch () {\n      let url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb'\n      let req = { url: url, id: GET_USERS_REQUEST }\n      this.$requeststore.dispatch('GET', req)\n    },\n    retry () {\n      this.$requeststore.dispatch('RETRY', GET_USERS_REQUEST)\n    }\n  }\n}\n")])])])])])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card"},[s("div",{staticClass:"card-block"},[s("h4",{staticClass:"card-title"},[e._v("\n      #"+e._s(e.request.id)+"\n      "),s("span",{staticClass:"badge badge-default pull-right"},[e._v(e._s(e.request.result.status))])]),e._v(" "),s("p",{staticClass:"card-text"},[s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[s("code",{staticClass:"Bash"},[e._v(e._s(e.request.method.toUpperCase())+" "+e._s(e.request.url))])])]),e._v(" "),e._m(0),e._v(" "),s("div",{staticClass:"tab-content"},[s("div",{staticClass:"tab-pane fade active",attrs:{id:"request",role:"tabpanel"}},[s("br"),e._v(" "),s("p",[e._v("\n        "+e._s(e.request.result.status)+" "+e._s(e.request.result.statusText)+"\n        ")]),s("h5",[e._v("Headers")]),e._v(" "),e.request.result.config?s("ul",e._l(e.request.result.config.headers,function(t,r,n){return s("li",[s("strong",[e._v(e._s(r))]),e._v(": "+e._s(t)+"\n          ")])})):e._e(),e._v(" "),s("p")]),e._v(" "),s("div",{staticClass:"tab-pane fade",attrs:{id:"response",role:"tabpanel"}},[s("p"),s("div",{directives:[{name:"show",rawName:"v-show",value:e.request.result.name,expression:"request.result.name"}]},[e._v("\n            "+e._s(e.request.result.status)+" "+e._s(e.request.result.statusText)+"\n          ")]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.request.result,expression:"request.result"}]},[s("h5",[e._v("Headers")]),e._v(" "),s("ul",e._l(e.request.result.headers,function(t,r,n){return s("li",[s("strong",[e._v(e._s(r))]),e._v(": "+e._s(t)+"\n              ")])})),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.request.result.data,expression:"request.result.data"}],staticClass:"response-data"},[s("h5",[e._v("Response data")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs",value:JSON.stringify(e.request.result.data,null,2),expression:"JSON.stringify(request.result.data, null, 2)"}]},[e._v("\n                "),s("code",{staticClass:"JSON"})])])]),e._v(" "),s("p")])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",{staticClass:"nav nav-tabs",attrs:{id:"reqResTabs"}},[s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link active",attrs:{href:"#request"}},[e._v(" Request")])]),e._v(" "),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#response"}},[e._v(" Response")])])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card"},[s("div",{staticClass:"card-block"},[s("span",{staticClass:"avatar bg-success text-white rounded-circle pull-left"},[e._v("\n      "+e._s(e.request.result.status)+"\n    ")]),e._v(e._s(e.request.id)+"\n    "),s("hr"),e._v(" "),s("a",{staticClass:"card-link",on:{click:function(t){e.emit("select",e.request)}}},[e._v("View")]),e._v(" "),s("a",{staticClass:"card-link",on:{click:function(t){e.emit("retry",e.request.id)}}},[e._v("Retry")]),e._v(" "),s("a",{staticClass:"card-link",on:{click:function(t){e.emit("cancel",e.request.id)}}},[e._v("Cancel")])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("h1",[e._v("CRUD example")]),e._v(" "),s("blockquote",[e._v("Create, edit and delete Github Repos")]),e._v(" "),s("hr"),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12 "},[s("form",{staticClass:"m-md p-md"},[s("label",{attrs:{for:"inlineFormInput"}},[e._v("Server response status:")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.token,expression:"token"}],staticClass:"form-control ",attrs:{type:"text"},domProps:{value:e.token},on:{input:function(t){t.target.composing||(e.token=t.target.value)}}}),e._v(" "),s("button",{staticClass:"btn",on:{click:e.fetch}},[e._v("Get Repos ["+e._s(e.reposLoading)+"]")])])])]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("ul",{staticClass:"list-group"},[s("a",{staticClass:"list-group-item active",attrs:{href:"#"}},[e._v("\n          Github Repos "),s("span",{staticClass:"pull-right"},[e._v("["+e._s(e.reposChanged)+"]")])]),e._v(" "),e._l(e.repos,function(t){return s("li",{staticClass:"list-group-item",on:{click:function(s){e.showRepo(t)}}},[e._v(e._s(t.full_name))])})],2)]),e._v(" "),s("div",{staticClass:"col"},[s("h3",[e._v("Create a repo")]),e._v(" "),s("form",[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"repoName"}},[e._v("Email address")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.repoName,expression:"repoName"}],staticClass:"form-control",attrs:{id:"repoName",placeholder:"Repo name"},domProps:{value:e.repoName},on:{input:function(t){t.target.composing||(e.repoName=t.target.value)}}})]),e._v(" "),s("button",{staticClass:"btn btn-primary pull-right",attrs:{type:"submit"},on:{click:e.createRepo}},[e._v("Create Repo")])]),e._v(" "),s("div",{staticClass:"p-md",staticStyle:{"max-width":"500px"}},[s("br"),e._v(" "),s("h3",[e._v("Repo deets")]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:Object.keys(e.selectedRepo).length>0,expression:"Object.keys(selectedRepo).length > 0"}]},[s("button",{staticClass:"btn btn-danger",on:{click:function(t){e.deleteRepo(e.selectedRepo)}}},[e._v("Delete Repo: "+e._s(e.selectedRepo.full_name))]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs",value:JSON.stringify(e.selectedRepo,null,2),expression:"JSON.stringify(selectedRepo, null, 2)"}]},[e._v("\n            "),s("code",{staticClass:"JSON"})])])])])])],1)},staticRenderFns:[]}}],[44]);
//# sourceMappingURL=app.f2a3f6eceb5ec5237637.js.map