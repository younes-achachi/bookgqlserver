const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const authorSchema = require('./models/author');
const bookSchema = require('./models/book');
// authorSchema.deleteMany().then((res) => console.log(res));
// bookSchema.deleteMany().then((res) => console.log(res));
//allow cross-origin requests
require('dotenv').config();
app.use(cors());
//  connect to mongdb  with credentiels
mongoose.connect(`mongodb+srv://younes:sniper@cluster0.ptp5m.mongodb.net/dbyounes`).then((data) => {
	console.log(data.connection.models.Author);
});
//
mongoose.connection.once('open', (data) => {
	console.log('connected to db ');
});

const schema = require('./schema/schema');
const author = require('./models/author');
//enable graphql schema  on node server
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => console.log('listening to port 4000', process.env.USER, process.env.MDP));
