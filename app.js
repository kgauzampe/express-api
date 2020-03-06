const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config(); 

const { Client } = require("pg");

let client = new Client()
client.connect()


console.log(process.env.PGUSER);

//routes
app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'));
app.post('/register', (req, res) => { 
    addNewVisitor(req.body.name,req.body.assistant,req.body.age,req.body.date,req.body.time,req.body.comment);
    res.sendFile(__dirname+'/index.html')
   });



app.listen(8080, () => (
console.log("listening on port 8080")
))

const addNewVisitor  = async(name, assistant, age,date,time, comment) =>{
	let text, query;
	let values = [name,assistant, age, date, time,  comment]
	text = `INSERT INTO 
				visitors(
                    visitorName,
                    nameOfAssistant,
                    visitorAge,
                    dateOfVisit,
                    timeOfVisit,
                    comments) 
					VALUES($1,$2,$3, $4, $5, $6) 
				RETURNING *`
	

	try {
		query = await client.query(text,values)
		return query.rows;
	
	} catch(e) {
		console.log("ERROR",e);
	}
	finally{

		
	}
}

// delete visitor from list
const deleteContent  = async() =>{
	let text, values, query;
	text = `DELETE FROM visitors WHERE visitorID = 3`

	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
	 
	} catch(e) {
		console.log(e);
		
	}
}


// update visitor log

const updateContent  = async() =>{
	let text, values, query;
	text = ` Update visitors
   			 SET nameOfAssistant = 'Mpumelelo', comments = 'It is a nice building'
    		 WHERE visitorID = 1 `

	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
		
	} catch(e) {
		console.log(e);
		
	}
}



//display content of a single visitor
const displayOneContent  = async() =>{
	let text, values, query;
	text = `select * From visitors WHERE visitorID = 01`
	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
		
	} catch(e) {
		console.log(e);
		
	}
}


//delete all visitors
const deleteall  = async() =>{
	let text, values, query;
	text = `delete From visitors`
	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
	
	} catch(e) {
		console.log(e);
		
	}
}
