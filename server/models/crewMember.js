const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')


const CrewMember = sequelize.define('CrewMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement:true
    },
	name: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len: [5,30]
        }
    },
    role: {
        type: DataTypes.ENUM('CAPTAIN', 'BOATSWAIN')
        
    },
})

module.exports = CrewMember