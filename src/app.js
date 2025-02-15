const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./weatherInfo')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public/index.html'))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express() 

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {   
        name: 'Anchal',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Anchal',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Anchal',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    //if no address is provided
    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        })
    }
    
    //address is provided
    forecast(req.query.address, (err, {temp, feelslike, day, location} = {}) => {
        if(err){
            return res.send({err})
        }
        res.send({
            forecast: day + '. It is currently ' + temp + ' degrees out, but it feelslike '+ feelslike + ' degrees.',
            location,
            address: req.query.address,
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name:'Anchal Agrawal',  
        errorMsg: 'Help article not found'
    })
})


app.get('/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name:'Anchal Agrawal',
        errorMsg:'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('listening')
})