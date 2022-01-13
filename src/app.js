const path = require('path');
const express = require('express');
const hbs = require('hbs');
const res = require('express/lib/response');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express()
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

//define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: "Anish"

    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: "Anish"

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text ',
        title: "help",
        name: "anish"
    }
    )
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must address location"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })

    })
    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // });
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term",
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render("helperror",
        {
            title: 'help article error',
            name: 'Anish',
            errorMessage: "help article not found"
        })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anish',
        errorMessage: 'page not found 404 error'
    })
})
app.listen(port, () => {
    console.log('server is up on port 3000');
})