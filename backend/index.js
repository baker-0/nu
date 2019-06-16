const port = 8888
const app = require('./src/server.js')

app.listen(port, () => console.log(`Nu server listening on port ${port}!`))
