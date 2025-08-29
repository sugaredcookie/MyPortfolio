const express = require('express');
const mongoose = require('mongoose');
const contactRouter = require('./router/contactRouter');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successfull🚀");
}).catch((err) => {
    console.log("DB Connection Failed😭", err);
}); 

app.use('/api', contactRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server started on the port: ", PORT, "👌");
});