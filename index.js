// Create Server Using NodeJs 
const http = require('http');
const fs = require('fs');
const multer = require('multer');

// File Upload Settings
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() +"-"+ file.originalname);
    },
});
let  upload = multer({storage:storage}).single('img');
//..............................................................

let server = http.createServer(function(req,res){
    if(req.url=='/'){

        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1> This is Home Page</h1>');
    }else if(req.url=='/about'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1> This is About Page</h1>');

    }else if(req.url=='/contact'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1> This is Contact Page</h1>');
        // File Write 
    }else if(req.url=='/file-write'){
        fs.writeFile('demo.txt','Hello World',function(error){
            if(error){
                res.writeHead(404,{'Content-Type':'text/html'});
                res.end('<h1>  Not found this text</h1>');
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end('<h1> File write success...you can check Folder</h1>');
            }
        })
    }

    // File Upload 
    else if(req.url=='/register' && req.method==='GET'){
        fs.readFile('upload.html', function(error, data){
            if(error){
                res.writeHead(404,{'Content-Type':'text/html'});
                res.end('<h1> upload file not found</h1>');
            }else if(data){
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                res.end();
            }
        })
    }else if(req.method ==='POST' && req.url === '/success'){
        upload(req, res,(error)=>{
            if(error){
                res.writeHead(404,{'Content-Type':'text/html'});
                res.end('<h1> upload file unsuccessful</h1>');
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end('<h1> File upload success you can check folder</h1>');
            }
        });
    }
    // File up setting 
});

    // server create port 
server.listen(5500, function(){
    console.log('server is listening on port 5500');
});
