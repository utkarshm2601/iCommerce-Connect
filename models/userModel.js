import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {}, //object -> agar multiple line likhenge toh ye direct string me save nahi hoga isliye humne ise object bana diya
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);

//instead of above line of code , it is better to write below line of code

//export const User=mongoose.model("users",userSchema);

//But if we write line 39 instead of line 35 then hume har jagah aise likhna hoga => import {User} from '..../models/userModel.js'
//wrna agr hum line 35 ko use krenge toh hume har jagah filename se import krna hoga aur jitne methods mongoose hume provide krta hai woh sb filename pe lagenge
