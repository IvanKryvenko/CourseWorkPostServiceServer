module.export = (sequelize, Sequelize) => {
    const City = sequelize.define('city', {
        cityName: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        square: {
            type: Sequelize.NUMBER
        },
        infastructure: {
            type: Sequelize.STRING
        },
        popularity: {
            type: Sequelize.STRING
        },
        postOfficesCount: {
            type: Sequelize.NUMBER
        }
    });
}