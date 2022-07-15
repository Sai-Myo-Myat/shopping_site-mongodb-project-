const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;

 const  mongoConnect = (callbackFun) => {
  MongoClient.connect('mongodb+srv://root:root@cluster0.7qhk2.mongodb.net/test?retryWrites=true&w=majority',
  {useUnifiedTopology: true}
  )
  .then(client => {
    console.log("connected");
    _db = client.db();
    callbackFun();
  })
  .catch(err => {
    console.log("err, connecting database",err)
  })
};

const getDb = () => {
  if(_db) {
    return _db
  }else{
     throw 'No Database Found'
  }
 
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;