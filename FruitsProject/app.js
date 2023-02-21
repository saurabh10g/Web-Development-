const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name:{
    type: String,
    required:[true,"Please add name. It's mandatory."]
  },
  rating:{
    type: Number,
    min: 1,
    max:10
  },
  review:String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit1 = new Fruit ({
  name: "Peaches",
  rating: 3,
  review: "Great fruit."
});

console.log(fruit1.name);


const personSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit:fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const p1 = new Person({
  name:"Saurabh",
  age:21
});

// p1.save();

// const kiwi = new Fruit({
//   name:"Kiwi",
//   score: 10,
//   review: "The best fruit"
// });
//
// const orange = new Fruit({
//   name:"orange",
//   score: 4,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit({
//   name:"banana",
//   score: 4,
//   review: "Weird texture"
// });

// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully saved all fruits");
//   }
// });

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{

    mongoose.connection.close();

    fruits.forEach(function(unit){
      console.log(unit.name);
    });
  }
});

Fruit.updateOne({name:"Peaches"},{name:"peach"},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated the name.");
  }
});

Fruit.deleteOne({name:"banana"},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully Deleted the entry with name banana.");
  }
});

// to establish rrelationship in frit and person

const mango = new Fruit ({
  name: "mango",
  rating: 10,
  review: "Vishal loves mango most!!!"
});

// mango.save();

const p2 = new Person({
  name:"Vishal",
  age:25,
  favouriteFruit:mango
});

// p2.save();

Person.updateOne({name:"Saurabh"},{favouriteFruit:fruit1},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully Updated saurabh's favourite fruit.");
  }
});
