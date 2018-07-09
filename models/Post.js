const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  status: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    contentType: String,
    //required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('post', PostSchema);

//telefon
//kişi bilgileri
