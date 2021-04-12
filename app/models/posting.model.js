module.export = (sequelize, Sequelize) => {
    const Posting = sequelize.define('posting', {
        departureNumber: {
            type: Sequelize.STRING
        },
        sender: {
            type: Sequelize.STRING
        },
        receiver: {
            type: Sequelize.STRING
        },
        sendDate: {
            type: Sequelize.DATE
        },
        deliveryTime: {
            type: Sequelize.STRING
        },
        deliveryType: {
            type: Sequelize.STRING
        },
        wareType: {
            type: Sequelize.STRING
        },
        senderPostOffice: {
            type: Sequelize.STRING
        },
        receiverPostOffice: {
            type: Sequelize.STRING
        },
        departureTime: {
            type: Sequelize.STRING
        }
    });
}