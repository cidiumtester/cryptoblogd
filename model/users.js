//importamos dependencias
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//creamos el esquema

const UsersSchema = new Schema({
    correo: String,
    password: String,
    userName: String,
    idioma: String,
    moneda: String,
    deleteFlag: Boolean

})

module.exports = mongoose.model('users', UsersSchema)