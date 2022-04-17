import express from "express";
import homeController from "../contronller/homeController"; '../contronller/homeController';
import multer from 'multer'
import path from 'path'
var appRoot = require('app-root-path')
let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,appRoot + '/src/public/image');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.get('/edit-user/:id', homeController.editUserPage)
   
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.post('/update-user',homeController.postUpdateUser)
    
    router.get('/upload-file',homeController.uploadFile)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)

    router.post('/upload-multiple-images', upload.array('multiple_images', 3), homeController.handleUploadMultipleFiles)

    
    router.get('/about', (req, res) =>{
        res.send(`Name: Duong Ngo Hung 
         age: 21
         status: singer
        `)
    })
    return app.use('/', router)
}

export default initWebRoute;