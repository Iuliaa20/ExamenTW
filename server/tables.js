const Ship = require('./models/ship')
const CrewMember=require('./models/crewMember')

const { DataTypes } = require('sequelize')


Ship.hasMany(CrewMember, {  type:DataTypes.INTEGER })


module.exports = {Ship,CrewMember }