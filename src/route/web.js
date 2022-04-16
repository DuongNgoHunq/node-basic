import express from "express";
import { getHomepage } from "../contronller/homeController"; '../contronller/homeController';

let router = express.Router();

const initWebRoute = (app) =>{
    // app.METHOD(PATH, HANDLER)
    
    router.get('/', getHomepage);
    
    router.get('/about', (req, res) =>{
        res.send(`Name: Duong Ngoo Hung 
         age: 21
         status: singer
        `)
    })
    return app.use('/', router)
}

export default initWebRoute;