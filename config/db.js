const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://jesse123:jesse123@itlogger-wnlat.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
