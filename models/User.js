const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

UsuarioSchema.method('toJSON',function(){
    const {password,__v,...object} = this.toObject();
    return object;
})
module.exports = model('User',UsuarioSchema);