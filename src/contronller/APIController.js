import pool from '../configs/connectDB';

let getAllUsers = async(req, res) =>{

    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createUser = async(req, res) =>{
    
    let {firstName, lastName, email, address} = req.body;
    
    if(!firstName || !lastName || !email || !address){
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, address])
    return res.status(200).json({
        message: 'ok', 
    
    })
}

let updateUser = async(req, res)=>{

    let {firstName, lastName, email, address, id} = req.body;
    
    if(!firstName || !lastName || !email || !address || !id){
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('update users set firstname = ?, lastName = ?, email = ?, address = ? where id = ?',
        [firstName, lastName, email, address, id])

    return res.status(200).json({
        message: 'ok', 
    })
}

let deleteUser = async(req, res)=>{
    let userId = req.params.id;
    if(!userId){
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('Delete from users where id = ?', [userId])
    return res.status(200).json({
        message: 'ok', 
    })
}
module.exports = {
    getAllUsers, createUser,updateUser,deleteUser
}