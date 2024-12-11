const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
//const db = require('./connectors/DB');
const app = express(); 
const { handlePublic } = require('./routes/public/api'); 
const {handlePrivate} = require('./routes/private/api');

app.use(cors()); 
app.use(bodyParser.json()); 

handlePublic(app);
handlePrivate(app);
app.get('/', (req, res) => {
    res.send('Welcome to the Engineering Equipment Inventory System API!'); 
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
