const db = require('./config/db');
const app = require('./config/server');

db.sync()
  .then(() => {
    app.listen(8081, () => {
      console.log('Server is running on port 8081');
    })
  })
  .catch(console.error);