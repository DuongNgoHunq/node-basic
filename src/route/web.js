import express from "express";
import homeController from "../contronller/homeController"; '../contronller/homeController';

let router = express.Router();

const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.get('/edit-user/:id', homeController.editUserPage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.post('/update-user',homeController.postUpdateUser)
    router.get('/about', (req, res) =>{
        res.send(`Name: Duong Ngo Hung 
         age: 21
         status: singer
        `)
    })
    return app.use('/', router)
}

export default initWebRoute;