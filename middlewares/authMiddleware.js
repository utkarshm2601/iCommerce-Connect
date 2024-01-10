import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    //console.log(req);
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //console.log(decode); // { _id: '659c170107ad399f4611c4ce', iat: 1704728659, exp: 1705333459 }  ->these are the claims which is given by the jwt authority to verify that he is the authorized user or not
    //above line of code se hume ek id bhi milegi (i.e decode._id ) and this will be equal to the user id which is there in mongodb too. It is paased during creation of token

    //const Id = decode._id;
    // const USER = userModel.findById("Id");
    // if (!USER) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "UnAuthorized USER",
    //   });
    // }

    req.user = decode; //this line of code adds a new user object in req

    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
