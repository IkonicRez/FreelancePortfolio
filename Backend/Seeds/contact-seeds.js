const { Contact } = require('../Models')

const contactData = [
    {
        client_name: "TestClient",
        client_email: "test@testclient.com",
        project_type: "test_type",
        client_budget: 1500
    }
]

const seedContact = () => Contact.bulkCreate(contactData)

module.exports = seedContact