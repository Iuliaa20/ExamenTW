const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const Ship = sequelize.define('Ship', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
	name: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len:[3, 30]
        }
    },
    displacement: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            min:50
        }
    }
    
})

module.exports = Ship