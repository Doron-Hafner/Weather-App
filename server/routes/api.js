const urllib = require('urllib')
const express = require('express')
const router = express.Router()
const axios = require('axios')
const City = require('../model/city')

const apiKey = 'dbce48a48b63cc3fba9e4077744a3a94'

const getURL = function (cityName) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
}

router.get('/city/:cityName', async (req, res) => {
    const cityName = req.params.cityName
    const response = await axios.get(getURL(cityName));
    const cityData = {
        name: response.data.name,
        temprature: (response.data.main.temp),
        condition: response.data.weather[0].description,
        conditionPic: response.data.weather[0].icon
    }
    res.send(cityData)
})


router.get('/cities', async (req, res) => {
    const Cities = await City.find({})
    res.send(Cities)
})

router.post('/city', (req, res) => {
    const city = new City(req.body)
    city.save()
    res.send(city.name)
})

router.delete('/city/:cityName', async (req, res) => {
    const cityName = req.params.cityName
    const delCity = await City.findOneAndDelete({ name: cityName })
    res.send(delCity.name)
})


module.exports = router