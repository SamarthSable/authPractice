import mongoose, { mongo, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, require: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
