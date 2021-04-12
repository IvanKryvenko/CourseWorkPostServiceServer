module.export = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee', {
        name: {
            type: Sequelize.STRING
        },
        birthDate: {
            type: Sequelize.DATE
        },
        workExperience: {
            type: Sequelize.STRING
        },
        position: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        postOffice: {
            type: Sequelize.STRING
        },
        workStartDate: {
            type: Sequelize.DATE
        },
        sallary: {
            type: Sequelize.STRING
        }
    });
}