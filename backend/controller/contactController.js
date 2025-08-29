const Contact = require('../models/contact.js');

const createContact = async(req, res) => {
    try {
        const {name, email, message} = req.body;

        if(!name || !email || !message) {
            return res.status(400).json({
                status: 'failed',
                message: 'fill the field'
            });
        }

        const newMessage = new Contact({name, email, message});
        await newMessage.save();

        res.status(200).json({
            status: 'success',
            message: 'message has been sent🚀'
        });
    }
    catch(err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};

const getMessages = async (req, res) => {
    try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ 
        success: true, count: messages.length, data: messages
    });
    } catch (error) {
    res.status(500).json({
        success: false, error: "Server Error", details: error.message
    });
    }
};

module.exports = {
    createContact,
    getMessages
}