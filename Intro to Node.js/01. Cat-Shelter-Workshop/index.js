const http = require('http');

const homeHtml = require('./views/home/index');
const siteCss = require('./content/styles/site');

const addBreed = require('./views/addBreed');
const addCat = require('./views/addCat');


const server = http.createServer(async (req, res) => {
    console.log(req.url);

    if (req.url == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(homeHtml);
    } else if (req.url == '/styles/site.css') {
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        res.write(siteCss);
    } else if (req.url == '/cats/add-breed') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(addBreed);
    } else if (req.url == '/cats/add-cat') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(addCat);

    }

    res.end()
});

server.listen(5000, () => console.log('Server is running on port 5000 ...'));