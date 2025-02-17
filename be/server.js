require('dotenv-flow').config();

const express = require('express');
const app = express();
const { PORT } = process.env;

const connectionDB = require('./helpers/connectionDB.helper');
const { ObjectId } = require('mongodb');

global.ObjectId = ObjectId;
connectionDB();

app.use(express.json());

app.use('/api/users', require('./routers/user.router'));
app.use('/api/boms', require('./routers/bom.router'));
app.use('/api/emails', require('./routers/email.router'));
app.use('/api/companys', require('./routers/company.router'));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})
