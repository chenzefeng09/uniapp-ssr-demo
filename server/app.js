const Vue = require('vue')
const path = require('path')
const server = require('express')()
const fs = require('fs')
const vsr = require('vue-server-renderer')
const bundlePath = path.join(__dirname, '..') + '/dist/build/h5/vue-ssr-server-bundle.json'
const tpl = fs.readFileSync('./server/template.html', 'utf-8')
const renderer = vsr.createBundleRenderer(bundlePath, {
  template: tpl,
  runInNewContext: true // 推荐
})

server.get('*', (req, res) => {
  // const context = { url: req.url, title: '标题', meta: '<meta charset="utf-8">' }
  const context = { url: req.url, title: '标题', meta: '<meta charset="utf-8">' }
  renderer.renderToString(context, (err, html) => {
    res.set({ 'content-type': 'text/html; charset=utf-8' })
    if (err) {
      console.log(err)
      res.status(500).end('500 error')
      return
    }
    res.end(html)
  })
})
let port = 8081
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})