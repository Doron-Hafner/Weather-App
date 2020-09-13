const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect("mongodb://localhost/citiesDB", { useNewUrlParser: true })

const citySchema = new Schema ({
    name: String,
    temprature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('City', citySchema)

module.exports = City