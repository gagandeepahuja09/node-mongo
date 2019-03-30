const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Using Node Modules for database operations
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
	assert.equal(err, null);
	console.log('Connected correctly to the server');
	const db = client.db(dbname);
	// 4 parameter => db, document, collection and callback
	// as done in operations.js
	dboper.insertDocument(db, { name: "Gagandeep", 
		description: 'Test' }, 'dishes')
	.then((result) => {
			// ops => number of operations
		console.log('Insert document:\n', result.ops);
		return dboper.findDocuments(db, 'dishes');
	})
	.then((docs) => {
		console.log('Found documents:/n', docs);
		return dboper.updateDocument(db, { name: 'Gagandeep' }, 
			{ description: 'Updated Test' }, dishes);
	})
	.then((result) => {
		console.log('Updated document:\n', result.result);
		return dboper.findDocuments(db, 'dishes'); 
	})
	.then((docs) => {
		console.log('Found documents:/n', docs);
		return db.dropCollection('dishes')
	})
	.then((result) => {
			console.log('Dropped collection: ', result);
			return client.close();
	})
	.catch((error) => console.log(error));
})
.catch((error) => console.log(error));