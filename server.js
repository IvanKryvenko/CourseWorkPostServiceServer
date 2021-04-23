const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({ message: 'Start page' });
});

require('./app/routes/archive.router')(app);
require('./app/routes/city.router')(app);
require('./app/routes/client.router')(app);
require('./app/routes/employee.router')(app);
require('./app/routes/posting.router')(app);
require('./app/routes/postOffice.router')(app);
require('./app/routes/service.router')(app);
require('./app/routes/transport.router')(app);

app.listen(port, () => {
    console.log(`server listening in ${port} port`);
})