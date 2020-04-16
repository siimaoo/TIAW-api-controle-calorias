import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

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
    type: Number
  },

  height: {
    type: Number
  },

  weight: {
    type: Number
  },

  positiveWeeks: {
    type: Number,
    default: 0
  },

  consume: {
    monday: {
      totalOfDay: {
        type: Number,
        default: 0
      },
      items: {
        type: Array
      }
    },
    tuesday: {
      totalOfDay: {
        type: Number,
        default: 0
      },
      items: {
        type: Array
      }
    },
    wednesday: {
      totalOfDay: {
        type: Number,
        default: 0
      },
      items: {
        type: Array
      }
    },
    thursday: {
      totalOfDay: {
        type: Number,
        default: 0
      },
      items: {
        type: Array
      }
    },
    friday: {
      totalOfDay: {
        type: Number,
        default: 0
      },
      items: {
        type: Array
      }
    },
    saturday: {
      totalOfDay: {
        type: Number,
        default: 0
      },
      items: {
        type: Array
      }
    },
    sunday: {
      totalOfDay: {
        type: Number,
        default: 0
      },
      items: {
        type: Array
      }
    }
  },

  created: {type: Date, default: Date.now}
});

UserSchema.pre('save', function (next) {
  if(!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, encrypted) => {
    this.password = encrypted;
    return next();
  });
});

export default model("User", UserSchema);