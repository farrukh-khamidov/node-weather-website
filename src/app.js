const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Farrukh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Farrukh'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help App',
        name: 'Farrukh',
        message: 'This is dynamic help page!'

    })
})
// app.use(express.static(publicDirectoryPathToHelp))
// app.use(express.static(publicDirectoryPathToAbout))
// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27 
//     },
//     {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1 style="text-align: center;">About page!</h1> ')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
      })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Farrukh',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Farrukh',
        errorMessage: 'Page not found!'
    })
})
 
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})