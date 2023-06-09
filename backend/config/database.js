const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(con => {
      console.log(`Mongodb database is connected to with HOST: ${con.connection.host}`);
    });
};

module.exports = connectDatabase;
