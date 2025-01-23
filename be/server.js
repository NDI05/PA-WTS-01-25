require('dotenv-flow').config();

const express = require('express');
const app = express();
const { PORT } = process.env;

const connectionDB = require('./helpers/connectionDB.helper');

connectionDB();

app.use(express.json());

app.use('/api/users', require('./routers/user.router'));
app.use('/api/boms', require('./routers/bom.router'));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})
