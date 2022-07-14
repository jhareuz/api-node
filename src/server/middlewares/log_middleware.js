/***************************************************************
 * Middleware to change the way of logging                     *
 *                                                             *
 * @author ErickCervantes <erick.cervantesacosta.5@gmail.com>  *
 ***************************************************************/

import config from './../../config';

import mung from 'express-mung';
import morgan from 'morgan';
import fs from 'fs';
import rfs from 'rotating-file-stream';

const middleMung = mung.json((body, req, res)=>{        
    morgan.token('response-data', ()=>{ 
        let resultBody=null;
        if(body){
            resultBody="response: "+JSON.stringify(body);
        }
        return resultBody;
    });
    return body;
});

//config log directory
let logDirectory = config.service.msAuth.pathLogger;

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
let accessLogStream = rfs(config.service.msAuth.fileLogger, {
interval: '1d', // rotate daily
path: logDirectory
});

//create custom tokens for morgan
morgan.token('request-data', (req, res) => { return "request: "+JSON.stringify({headers:req.headers, body:req.body}); });
morgan.token('epoch', (req, res) => { return Date.now(); });
morgan.token('name-service', (req, res) => { return config.service.msAuth.name.toUpperCase(); });
morgan.token('type-logger', (req, res) => { return "REQUEST"; });

const middleMorgan = morgan((tokens, req, res)=>{

    if(!tokens['response-data']){
        tokens['response-data']= ()=>{return "";};
    }
       
    //[date, service, type, code, ip, method,url,length,time, data]
    let consoleOutPut=[
        tokens['epoch'](req,res),
        tokens['name-service'](req,res),
        tokens['type-logger'](req,res),
        tokens.status(req, res),
        tokens['remote-addr'](req, res),
        tokens.method(req, res),
        tokens.url(req, res),    
        tokens.res(req, res, 'content-length'),
        tokens['response-time'](req, res),
        tokens['request-data'](req, res),
        tokens['response-data'](),
        ].join(' ');

    //console.log(consoleOutPut);    
    return consoleOutPut;
}, {
    skip: (req,res)=>{
        let excludePaths= String(config.service.msAuth.excludeLogger).split(",");

        for(let x in excludePaths){
            if(req.url.includes(excludePaths[x]))
               return true;
        }
    },
    stream: accessLogStream
});

export {
    middleMung,
    middleMorgan
};