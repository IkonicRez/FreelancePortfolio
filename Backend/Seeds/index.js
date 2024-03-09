const sequelize = require('../config/connection')
const seedContact = require('./contact-seeds')

const bShouldResetDB = true

const seedAll = async () => {
    
    await sequelize.sync({force: bShouldResetDB})
    console.log('\n ----- DATABASE SYNCED ----- \n')
    
    await seedContact()
    console.log('\n ----- CONTACT SEEDED ----- \n')

    process.exit(0)
}

seedAll()