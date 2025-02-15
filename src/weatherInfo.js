const request = require('request')

//using function to call it multiple times with different locations
const forecast = (address, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=d2d8d958d724516e106929fc3655363d&query=' + address
    
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Low level OS error occured!', undefined)
        }
        else if(body.error){
            callback('Coordinate error', undefined)
        }
        else{
            callback(undefined, {
                temp: body.current.temperature, 
                feelslike: body.current.feelslike,
                day: body.current.weather_descriptions[0],
                location: body.location.name,
        });
        }
    })
}


module.exports= forecast