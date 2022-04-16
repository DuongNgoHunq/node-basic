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
    console.log('>>>Check req: ', req.body);
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, address])
    
    return res.redirect('/')
}

module.exports = {
    getHomepage, getDetailPage, createNewUser
}