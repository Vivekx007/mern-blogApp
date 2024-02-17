import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=http%3A%2F%2Fhancockogundiyapartners.com%2Fmanagement%2Fdummy-profile-pic-300x300%2F&psig=AOvVaw11hcOgub-wSPZv8cRnbcSZ&ust=1707763559777000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPCaxJT5o4QDFQAAAAAdAAAAABAE",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
