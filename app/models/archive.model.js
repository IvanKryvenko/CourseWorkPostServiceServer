module.export = (sequelize, Sequelize) => {
    const Archive = sequelize.define('archive', {
        departureNumber: {
            type: Sequelize.STRING
        },
        arrivalDate: {
            type: Sequelize.DATE
        },
        receiveDate: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.STRING
        },
        sum: {
            type: Sequelize.STRING
        },
        payment: {
            type: Sequelize.STRING
        },
        employee: {
            type: Sequelize.STRING
        }
    });
}