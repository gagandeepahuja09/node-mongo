const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Using Node Modules for database operations
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null);
	console.log('Connected correctly to the server');
	const db = client.db(dbname);
	// 4 parameter => db, document, collection and callback
	// as done in operations.js
	dboper.insertDocument(db, { name: "Gagandeep", 
		description: 'Test' }, 'dishes', (result) => {
			// ops => number of operations
			console.log('Insert document:\n', result.ops);
			dboper.findDocuments(db, 'dishes', (docs) => {
				console.log('Found documents:/n', docs);
				dboper.updateDocument(db, { name: 'Gagandeep' }, 
					{ description: 'Updated Test' }, dishes, (result) => {
						console.log('Updated document:\n', result.result);
						dboper.findDocuments(db, 'dishes', (docs) => {
							console.log('Found documents:/n', docs);

							db.dropCollection('dishes', (result) => {
								console.log('Dropped collection: ', result);
								client.close();
							});	
						});
					});
			});
		});
});