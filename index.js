const http = require('http')
const url = require('url')
const fs = require('fs')
const replaceTemplate = require('./replaceTemplate')

const templateIndex = fs.readFileSync(`${__dirname}/index.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/product.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/card.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/database.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)


    if (pathname == "/" || pathname == '/index') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const cardsHTML = dataObj.map(el => replaceTemplate(templateCard, el)).join('')
        const output = templateIndex.replace('{%FOOD%}', cardsHTML)

        res.end(output)

    } else if (pathname == '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const product = dataObj[query.id]
        const output = replaceTemplate(templateProduct, product)
        res.end(output)

    } else {

        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end('<h1>404 page not found<h1>')

    }
})

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000')
})