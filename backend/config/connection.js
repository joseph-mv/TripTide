const MongoClient = require("mongodb").MongoClient
var state={
    db:null
}
module.exports.connect = async function(done){
    var url = process.env.MONGO_URI;
    dbName='TripTide'
   
    await MongoClient.connect(url)
    .then((data) => {
        // Access the newly created database with the desired name
        state.db = data.db(dbName); 

     done()
     
    })
    .catch((error) => {
        console.error("Connection error:", error);
        done(error);
    });
    
 
}

module.exports.get=function(){
   return state.db
     
}



