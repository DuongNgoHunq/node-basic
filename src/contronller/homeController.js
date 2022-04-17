import pool from '../configs/connectDB';
import multer from'multer'
let getHomepage = async (req, res) => {
   
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage =async(req, res) =>{
    let id = req.params.id;

    let [user] = await pool.execute('SELECT * FROM users WHERE `id` = ?', [id]);
    console.log(">>check req params: ", user);
    return res.send(user)
}

let createNewUser = async(req, res) =>{
    
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, address])

    return res.redirect('/')
}

let deleteUser = async (req, res) =>{
    let userId = req.body.id;
    await pool.execute('Delete from users where id = ?', [userId])
    return res.redirect('/')
    
}
let editUserPage =async (req, res) =>{
    let id = req.params.id; 
    let [user] = await pool.execute('select * from users where id = ?', [id])
    return res.render('update.ejs',{dataUser: user[0]})  
}
let postUpdateUser = async(req, res) =>{
    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute('update users set firstname = ?, lastName = ?, email = ?, address = ? where id = ?',
    [firstName, lastName, email, address, id])
    return res.redirect("/")
}

let uploadFile = async (req, res) =>{
    return res.render('upload.ejs')
}
const upload = multer().single('profile_pic');
let handleUploadFile = async(req, res) =>{

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./upload-file">Upload another image</a>`);
    });
}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUserPage, postUpdateUser,
    uploadFile,handleUploadFile
}