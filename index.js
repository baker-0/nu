const port = 8888
const app = require('./src/app.js')

app.listen(port, () => console.log(`Nu server listening on port ${port}!`))
