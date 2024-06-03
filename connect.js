const mongoose=require('mongoose');
async function connectotmongodb(url){
  await mongoose.connect(url);
}
module.exports={connectotmongodb};
