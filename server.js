const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const knex = require('knex');
const pg = require('pg');
const cors = require('cors');

//Parse incoming body
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(
    cors({
        origin: "*",
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }
    )
    )

const postgres = knex({
        client: 'pg',
        connection: {
        host : '127.0.0.1',
        user : 'ashettyj',
        password : '',
        database : 'responses'
      }
    });

//Get method on root
app.get('/', (req,res)=> {
res.send("Getting root");
})

//Get method on /users
app.get('/response', async function (req,res){
    console.log("Get Worked")
    const myres = await postgres.select('*').from('responses');
    res.send(myres);
})

app.get('/note', async function (req,res){
    console.log("Get Worked")
    const myres = await postgres.select('*').from('notes');
    res.send(myres);
})

//Get method on /users
app.get('/canned', async function (req,res){
    console.log("Get Worked")
    const myres = await postgres.select('*').from('canned');
    res.send(myres);
})

//Post method on users
app.post('/response',cors(), function(req,res){
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    const myres =  postgres('responses').insert(req.body).then((data) => console.log("data from knex",req,res))
        .catch((err) => { res.send(err.detail); throw err.detail;})
        .finally(() => {});
    console.log("Ashish")
});

app.post('/note',cors(), async function(req,res){
    console.log(req.body);
    const myres = await postgres('notes').insert(req.body).then(() => console.log("data inserted"))
        .catch((err) => { res.send(err.detail); throw err })
        .finally(() => {});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.send("Done")
});

app.post('/canned',cors(), async function(req,res){
    console.log(req.body);
    const myres = await postgres('canned').insert(req.body).then(() => console.log("data inserted"))
        .catch((err) => { res.send(err.detail); throw err })
        .finally(() => {});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.send("Done")
});

// app.get('/metadata', async function (req,res){
//     console.log("Get Here")
//     const myres = await postgres.select('tno','ttitle').from('tickets').orderBy('tno');
//     res.send(myres);
// })

// app.get('/manpower/:id', async function (req,res){
//     console.log("Get Here with id")
//     const myres = await postgres.where('id',req.params.id).from('manpower').orderBy('id');
//     myres.length?res.send(myres):res.send("No such ticket found")

// })


// //Delete user method
// app.delete('/manpower/:id', (req,res)=>{
//     console.log(req.params);
// postgres("manpower").where("id",req.params.id).del().then(function (count) {
//   console.log(count);
// }).finally(function () {
// });
// res.send('Done Deleting ticket');
// })

//Listen to requests
app.listen(3001,() => {console.log("Server is listening")});
