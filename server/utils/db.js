const { default: mongoose } = require("mongoose");

module.exports = () => {
  const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to dataBase succesfully");
  } catch (error) {
    console.log("Could not connect to dataBase");
  }
};
