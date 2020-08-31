const {Router}= require('express');
const router = Router();
const {connect} = require('../database')
const {verifyAuth} = require('../passport/verify')

router.get('/', verifyAuth,async (req,res)=>{
  const pool = await connect();
  const response = await pool.query('SELECT * from links where user_id=?',req.user.id);

  const links = response[0]
  res.render('links/index',{links,raiz:true});
})

router.get('/add', verifyAuth, async (req,res)=>{
  res.render('links/add',{add:true});
})

router.post('/add', async (req,res)=>{
  const {title, url, description}= req.body;
  const newLink ={title, url, description, user_id:req.user.id}
  const pool = await connect();
  const links = await pool.query('INSERT INTO links SET ?',[newLink]);
  req.flash('message','link created')
  res.redirect('/links');
})

router.delete('/:id/delete', async (req,res)=>{
  const pool = await connect();
  const response = await pool.query('DELETE FROM links WHERE id=?',[req.params.id]);
  req.flash('message','link deleted')
  res.redirect('/links');
})

router.get('/:id/edit',verifyAuth, async (req,res)=>{
 console.log(req.params.id)
  const pool = await connect();
  const response = await pool.query('SELECT * FROM links WHERE id=?',[req.params.id]);
  const link = response[0][0]
  res.render('links/edit',{link});
})
 
router.put('/:id/edit', async (req,res)=>{

  const pool = await connect();
  const link = await pool.query('UPDATE links SET ? WHERE id=?',[req.body,req.params.id]);
  req.flash('message','link updated')
  res.redirect('/links');
})

module.exports=router;