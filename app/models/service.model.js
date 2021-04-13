module.export = (sequelize, Sequelize) => {
    const Service = sequelize.define('service', {
        price: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        client: {
            type: Sequelize.STRING
        },
        paymentMethod: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        }
    });

    return Service;
}