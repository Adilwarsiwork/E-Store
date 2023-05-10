const mongoose = require("mongoose");

const DBconnection = (URL) => {
  try {
    mongoose
      .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("database connected");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = DBconnection;

// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
