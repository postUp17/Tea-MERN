const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 30
  },
  major: {
    type: String
  },
  fieldofstudy: {
    type: String
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },
  subject: [
    {
      subjectname: {
        type: String,
        required: true
      },
      coordinator: {
        type: String,
        required: true
      },
      tutor: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = profile = mongoose.model("profile", ProfileSchema);
