import express from "express";
import APIController from '../contronller/APIController'
let router = express.Router();

const initAPIRoute = (app) =>{
    router.get('/users', APIController.getAllUsers); // method GET -> read data
    router.post('/create-user', APIController.createUser);// method POST -> Add data
    router.put('/update-user', APIController.updateUser);// method PUT -> update data
    router.delete('/delete-user/:id', APIController.deleteUser);// method DELETE -> DELETE data
    
    return app.use('/api/v1/', router)
}

export default initAPIRoute;