import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const ConsumeData = {
  sunday: {
    total: 0,
    items: []
  },
  monday: {
    total: 0,
    items: []
  },
  tuesday: {
    total: 0,
    items: []
  },
  wednesday: {
    total: 0,
    items: []
  },
  thursday: {
    total: 0,
    items: []
  },
  friday: {
    total: 0,
    items: []
  },
  saturday: {
    total: 0,
    items: []
  },
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  imc: {
    type: Number,
    default: 0
  },

  height: {
    type: Number,
    default: 0
  },

  weight: {
    type: Number,
    default: 0
  },

  positiveWeeks: {
    type: Number,
    default: 0
  },

  recomendedKcal: {
    type: Number,
    default: 0,
  },

  consume: {
    type: Object,
    default: ConsumeData
  },

  admin: {
    type: Boolean,
    default: false,
  },
  
  created: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, encrypted) => {
    this.password = encrypted;
    return next();
  });
});

export default model("User", UserSchema);