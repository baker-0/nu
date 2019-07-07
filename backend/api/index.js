const port = 8888
const dbURI = 'mongodb://db:27017/mongo'

require('./src/dbDriver').connect(dbURI)
const app = require('./src/server.js')

app.listen(port, () => console.log(`Nu server listening on port ${port}!`))
