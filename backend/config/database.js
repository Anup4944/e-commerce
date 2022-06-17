const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((con) =>
      console.log(`Database connection sucessfull ${con.connection.host}`)
    );
};

module.exports = connectDb;

// .catch((err) => console.log(err));
