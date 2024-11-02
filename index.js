import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//const http = require('http')

//const fs = require('fs');
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// const textOut = `this is hamechi darmorede node: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt ', textOut);
// console.log(textOut);
// fs.readFile('./txt/starttttt.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error ----------')
//     console.log("------------- data1 --------------------", data1);
//     fs.readFile(`./txt/input.txt`, 'utf-8', (err, data2) => {
//         console.log("------------------ data2 ----------------------", data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {

//             console.log("------------------- data3 -------------------", data3);
//         });

        
//         fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', err => {
//             console.log('your file has been written');
//         });
//         fs.readFile('./txt/final.txt', 'utf-8', (err, final) => {

//             console.log("------------------- final -------------------", final);
//         });

//     });

// });


// console.log('will read file');

const server = http.createServer((req, res) => {

// console.log(req.url);
// res.end('hello from elahe')


const pathName = req.url;
if(pathName === '/'  || pathName === '/overview')
    {
    res.end('this is nothing');

} 
else if ( pathName === '/product') {
res.end (' this error tataloooo')
}

else if (pathName === '/api'){
    
fs.readFileSunc(`${__dirname}/txt/data.json`,'utf-8', (err , data) =>{
const productData = JSON.parse(data);
//console.log(productData);
res.writeHead(200, { 'Content-type' : 'application/json'});
res.end ('data');

});
}

else {
res.writeHead(404,
{ 'Contenet-type': 'text/html',
    'my-own-header': 'helloo-world'

});    
res.end('<h1>page not found</h1>');

}

});


server.listen(8000,'127.0.0.1', () => {
    console.log('listening to request on port 8000');
});