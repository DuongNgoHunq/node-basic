import pool from '../configs/connectDB';

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
let handleUploadFile = async(req, res) =>{

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./upload-file">Upload another image</a>`);
}

// upload multiple file

let handleUploadMultipleFiles = async(req, res) =>{

    // upload(req, res, function(err) {
        console.log(req.files);
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        console.log(">>>check files path: ", files);
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload-file">Upload more im  ages</a>';
        res.send(result);
    // });
} 
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUserPage, postUpdateUser,
    uploadFile,handleUploadFile, handleUploadMultipleFiles, 
}