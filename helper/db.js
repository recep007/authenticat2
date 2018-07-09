const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://recep:terlik200278@ds131721.mlab.com:31721/adopet');
  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', () => {
    console.log('MongoDB: Error', error);
  });

  mongoose.Promise = global.Promise;

};
