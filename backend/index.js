const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const EmployeeRoutes = require('./Routes/EmployeeRoutes');
const PORT = 8080;

require('./Models/db');
app.use(cors());

app.use(bodyParser.json());

app.use('/api/employees', EmployeeRoutes);
const roleRoutes = require('./Routes/Roleroutes');
app.use('/api/roles', roleRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})
