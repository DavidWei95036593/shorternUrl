const mongoose = require('mongoose')

const URLSchema = mongoose.Schema({
  //schema is an object
  shortened_url: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  original_url: {
    type: String,
    required: true
  }
})

//basically making a new class
const Url = mongoose.model('Todo', URLSchema);

module.exports = {Url}
