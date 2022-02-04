const mongoose = require('mongoose'); 
const connexionString = 'mongodb://localhost/rest_api';
const initDB = () => { 
  mongoose.connect(connexionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.once('open', () => { 
    console.log('connected to database'); 
  }); 
  
  mongoose.connection.on('error', console.error); 
} 


 // define Schema
 var userSchema = mongoose.Schema({
    id: String,
    firstname: String,
    lastname: String,
    age: Number,
    address: String,
    contact: String
      
  });

  var User = mongoose.model("User", userSchema);
  module.exports.User = User;
  module.exports.initDB = initDB;




//mongodb+srv://admin:DLmslsF5m5BgFfk2@cluster0.bk6gf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//DLmslsF5m5BgFfk2