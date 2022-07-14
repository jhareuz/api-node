'use strict'
import config from './../../config';
// ===================
// Verificar token
// ===================

const jwt = require('jsonwebtoken');

let validToken = (req,resp,next) => {
    console.log("req",req)
    let token = req.get('token');

    jwt.verify(token,config.server.seed, (err,decoded) => {
        if(err){
            return resp.status(401).json({
                message: err,
                status: false
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// ===================
// Verificar ROLE
// ===================

let validRole = (req,resp,next) => {
    let usuario = req.usuario;
    let role    = usuario.role;
    if(role === 'ADMIN'){
        next();        
    }else{
        return resp.status(401).json({
            message: 'No tienes suficientes privilegios',
            status: false
        });
    };    
};

module.exports = {
    validToken,
    validRole
}