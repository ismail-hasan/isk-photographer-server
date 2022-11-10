const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// midleWare  
app.use(cors())
app.use(express.json())

// username ReviewAssignment
// password tIOSPOkR90zpwrOo

// mongodb database codes 

// process.env.DB_USER
// process.env.DB_PASSWORD

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w4v9v80.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('photoService').collection('allPhotoService')
        const reviewCollection = client.db('reviewData').collection('allReviewData')


        // JWT WEB TOKEN 
        app.post('/jwt', (req, res) => {
            const user = req.body
            console.log(user)
        })

        // review data api review 
        app.post('/review', async (req, res) => {
            const user = req.body
            const result = await reviewCollection.insertOne(user)
            res.send(result)
        })


        app.get('/review', async (req, res) => {
            console.log(req.query.seviceid)

            let query = {}
            if (req.query.seviceid) {
                query = {
                    seviceid: req.query.seviceid
                }
            }
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }

            console.log(req.query.email)
            const cursor = reviewCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })



        // delete method 
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            // const query = { seviceid: id }
            const result = await reviewCollection.deleteOne(query)
            res.send(result)
        })


        app.get('/limitservice', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const result = await cursor.limit(3).toArray()
            res.send(result)
        })

        //services

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = serviceCollection.find(query)
            const result2 = await cursor.toArray()
            res.send(result2)
        })
        app.post('/services', async (req, res) => {
            const user = req.body
            const results = await serviceCollection.insertOne(user)
            res.send(results)
        })

    }
    finally {

    }
}
run().catch(e => console.log(e))

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`this server port is ${port}`)
})