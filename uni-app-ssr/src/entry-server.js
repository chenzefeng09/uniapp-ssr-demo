import { createApp } from './app'
import { createRouter } from './router'

export default context => {
  return new Promise((resolve, reject) => {
    const router = createRouter()
    const { app } = createApp({
      router,
      render: h => {
        return h('router-view')
      }
    })
    console.log('context.url', context.url)
    router.push(context.url)
  
    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      console.log(444, matchedComponents)
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      resolve(app)
    })
  })
}
