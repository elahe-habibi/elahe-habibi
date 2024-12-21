import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import slugify from 'slugify';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = http.createServer((req, res) => {
const pathName = req.url;
const tempOverview = fs.readFileSync(`${__dirname}/template/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/txt/data.json`, 'utf-8');    
const dataObject = JSON.parse(data);


if (pathName === '/' || pathName === '/overview') {
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(tempOverview);
} 
else if (pathName === '/product') {
res.end('this error tataloooo');
} 
else if (pathName === '/api') {
    if (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
    return;
    }
   
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

} 
else {
res.writeHead(404, {
'Content-Type': 'text/html',
'my-own-header': 'hello-world'
});
res.end('<h1>page not found</h1>');
}
});

server.listen(8000, '127.0.0.1', () => {
console.log('listening to request on port 8000');
});