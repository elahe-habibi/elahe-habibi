import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import url from 'url'; // Add this line to import the url module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer((req, res) => {
const pathName = req.url;

const { query, pathname } = url.parse(req.url, true); // Renamed pathName to pathname

// console.log(req.url);
// console.log(url.parse(req.url, true)); // Now this will work

const data = fs.readFileSync(`${__dirname}/txt/data.json`, 'utf-8');    
const dataObject = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/template/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template/template-product.html`, 'utf-8');

const replaceTemplate = (temp, product) => {
let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
output = output.replace(/{%IMAGE%}/g, product.image);
output = output.replace(/{%PRICE%}/g, product.price);
output = output.replace(/{%FROM%}/g, product.from);
output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
output = output.replace(/{%QUANTITY%}/g, product.quantity);
output = output.replace(/{%DESCRIPTION%}/g, product.description);
output = output.replace(/{%ID%}/g, product.id);

if (!product.organic)
output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
return output;
}

if (pathname === '/' || pathname === '/overview') { // Use pathname here
res.writeHead(200, { 'Content-Type': 'text/html' });

const cardHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
console.log(cardHtml);
res.end(output);
} 
else if (pathname === '/product') { // Use pathname here
console.log(query);
res.end('this error tataloooo');
} 
else if (pathname === '/api') { // Use pathname here
try {
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify(dataObject));
} catch (err) {
res.writeHead(500, { 'Content-Type': 'text/plain' });
res.end('Internal Server Error');
}
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