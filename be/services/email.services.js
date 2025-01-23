const configMailer = require('../helpers/configMailer.helper');
const Users = require('../models/users/users.model');

const emailService = {
    sendEmail: async ({email, subject, text, html}) => {
            const user = await Users.findOne({ email });
            if (!user) throw new Error('User is not found');
            await configMailer.sendingEmail(email, subject, text, html);
    }
}

module.exports = emailService;