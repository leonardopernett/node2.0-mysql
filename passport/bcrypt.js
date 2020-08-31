const bcrypt = require('bcrypt')


exports.encryptPassword = async (password)=>{
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt)
}
exports.comparePassword = async (password, savePassword)=>{
   return await bcrypt.compare(password, savePassword)
}