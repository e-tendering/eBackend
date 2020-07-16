const mongoose = require("mongoose");

const url =DBURL;
// Use connect method to connect to the Server
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
