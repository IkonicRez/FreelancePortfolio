const sequelize = require('../config/connection.js')
const { Model } = require('sequelize')
const Datatypes = require('sequelize/lib/data-types')

class Contact extends Model{}

Contact.init(
    {
        contact_id: {
            type: Datatypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        received_at: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW
        },
        client_name: {
            type: Datatypes.STRING(172),
            allowNull: false,
        },
        client_email: {
            type: Datatypes.TEXT('long'),
            validate: {
                is: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            },
            allowNull: false,
        },
        project_type: {
            type: Datatypes.STRING(130),
            allowNull: false,
        },
        client_budget: {
            type: Datatypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1000
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'contact'
    }
)

module.exports = Contact