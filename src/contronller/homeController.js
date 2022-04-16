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
    console.log('>>>Check req: ', req);
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
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUserPage, postUpdateUser
}