const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/53a2914bf2d4db17af3bde3242ce95c3/'+ encodeURIComponent(lattitude) +','+ encodeURIComponent(longitude) + '?units=si'

    request({ url, json: true }, (error, { body } = {})=>{
        if (error) {
          callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out, tha maximum temperature is ' + body.daily.data[0].temperatureMax+ ', while the minimum tremperature is ' + body.daily.data[0].temperatureMin + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
      })
}

module.exports = forecast

