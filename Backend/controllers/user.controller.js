const User = require("../model/User")

class AuthController {

  async addUser(req, res){
    try {
      const {
        firstName,
        lastName,
        email,
        country,
        state,
        city,
        gender,
        dateOfBirth,
        age
      } = req.body;
      const findUser = await User.find({email: email})
      if(findUser.length >  0) {
        res.status(409).send({ message: "User already registered", data: {}})
      } else {
        const addUser = await User.create({
          firstName,
          lastName,
          email,
          country,
          state,
          city,
          gender,
          dateOfBirth,
          age
        });
        return res.status(200).send({message: "User registered successfully", data: addUser})
      }

    } catch(err) {
      console.error("Error adding user:", err);
		return res.status(500).send({message: "Something went wrong"})
    }

  }

  async getUser(req, res) {
    try {
      const { id } = req.query;
      const user = await User.findOne({_id: id});
      if (!user) {
        return res.status(200).send({message: "User not found", data: {}});
      }
      return res.status(200).send({message: "User get successfully", data: user})
    } catch (error) {
      console.error("Error getting user details:", error);
      return res.status(500).send({
        message: "Something went wrong"
      })
    }
  }

}


module.exports = new AuthController();
