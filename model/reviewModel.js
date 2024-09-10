//import
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
   movie:{
    type:String,
    required:true
   },
   language:{
    type:String,
    required:true
   },
   director:{
    type:String,
    required:true
   },
   cast:{
    type:String,
    required:true
   },
   username:{
    type:String,
    required:true
   },
   review:{
    type:String,
    required:true
   },
   movimg:{
    type:String,
    required:true
   },
   userId:{
    type:String,
    required:true
   }

})

const reviews = mongoose.model("reviews",reviewSchema)

module.exports = reviews