module.export = (sequelize, Sequelize) => {
    const Transport = sequelize.define('transport', {
        number: {
            type: Sequelize.STRING
        },
        driverName: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        releaseYear: {
            type: Sequelize.NUMBER
        },
        capasity: {
            type: Sequelize.STRING
        }
    });
}