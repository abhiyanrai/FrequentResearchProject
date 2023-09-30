const mongoose = require("mongoose");
const connectToMongoose = () => {
  mongoose
    .connect(
      "mongodb://localhost:27017/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectToMongoose;
