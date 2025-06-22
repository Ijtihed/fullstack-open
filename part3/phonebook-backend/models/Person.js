const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    required: [true, 'Phone number required'],
    validate: {
      validator: v => /^\d{2,3}-\d+$/.test(v) && v.length >= 8,
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
