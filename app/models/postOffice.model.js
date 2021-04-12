module.export = (sequelize, Sequelize) => {
    const PostOffice = sequelize.define('postOffice', {
        address: {
            type: Sequelize.STRING
        },
        officeNumber: {
            type: Sequelize.NUMBER
        },
        officeType: {
            type: Sequelize.STRING
        },
        weightLimit: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        employeeCount: {
            type: Sequelize.NUMBER
        }
    });
}