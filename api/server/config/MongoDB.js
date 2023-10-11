const mongoose = require('mongoose');

const url = process.env.MongoDB_URL

const MongoDB_Connection = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Radi Mongo'))
      .catch((error) => console.log(error))
}

module.exports = MongoDB_Connection;