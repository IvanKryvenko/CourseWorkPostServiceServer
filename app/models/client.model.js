module.export = (sequelize, Sequelize) => {
    const Client = sequelize.define('client', {
        name: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.NUMBER
        },
        city: {
            type: Sequelize.STRING
        },
        departureCount: {
            type: Sequelize.NUMBER
        }
    });

    return Client;
}