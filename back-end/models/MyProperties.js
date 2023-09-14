const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  }
});

const MyProperties = mongoose.model('myproperties', PropertySchema);

module.exports = MyProperties;