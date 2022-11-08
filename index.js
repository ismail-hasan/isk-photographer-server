const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


// midleWare  
app.use(cors())
app.use(express.json())

// username ReviewAssignment
// password tIOSPOkR90zpwrOo

// mongodb database codes 


const uri = "mongodb+srv://ReviewAssignment:tIOSPOkR90zpwrOo@cluster0.w4v9v80.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const reviewCollection = client.db('review').collection('allReview')

        app.get('/home-services', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query)
            const result = await cursor.limit(3).toArray()
            res.send(result)
        })

        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query)
            const result = await cursor.limit(3).toArray()
            // const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query)
            // const result2 = await cursor.limit(3).toArray()
            const result2 = await cursor.toArray()
            res.send(result2)
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