1、npm install  
2、npm run build:ssr-server  
3、node server/app.js  
4、浏览器访问http://localhost:8081/pages/location/test  

报错TypeError: Cannot read property 'style' of undefined  
node版本：v12.19.1  
`
context.url /pages/location/test  
444 [  
  {  
    render: [Function: r],
    staticRenderFns: [],
    _compiled: true,
    _scopeId: 'data-v-ff2757ae',
    _ssrRegister: [Function: u],
    beforeCreate: [ [Function: u] ],
    _Ctor: { '0': [Function] }
  }
]
TypeError: Cannot read property 'style' of undefined
    at a.c (static/js/chunk-56c71877.6121f492.js:1:3053)
    at a.u (static/js/chunk-56c71877.6121f492.js:1:4136)
    at ne (static/js/main.2821d1c7.js:7:12035)
    at Un (static/js/main.2821d1c7.js:7:30109)
    at a.t._init (static/js/main.2821d1c7.js:7:35448)
    at new a (static/js/main.2821d1c7.js:7:36792)
    at createComponentInstanceForVnode (/Users/chenzefeng/Development/uniappWorkspace/webapp-hq/uni-app/node_modules/vue-server-renderer/build.dev.js:8184:10)
    at renderComponentInner (/Users/chenzefeng/Development/uniappWorkspace/webapp-hq/uni-app/node_modules/vue-server-renderer/build.dev.js:8408:40)
    at renderComponent (/Users/chenzefeng/Development/uniappWorkspace/webapp-hq/uni-app/node_modules/vue-server-renderer/build.dev.js:8383:5)
    at renderNode (/Users/chenzefeng/Development/uniappWorkspace/webapp-hq/uni-app/node_modules/vue-server-renderer/build.dev.js:8294:5)
`
