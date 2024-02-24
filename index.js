const express = require('express')
const app = express()
const port = 9000
const cors = require("cors")
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://masum105ahmed:1JarBCe2l7Ivmk0a@masum105ahmed.3bdkcsr.mongodb.net/?retryWrites=true&w=majority&appName=masum105ahmed";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const allDataCollection = client.db("dataDB").collection("alldata")
    const dataCollection = client.db("dataDB").collection("data")
    const recipeCollection = client.db("dataDB").collection("recipe")

    app.get("/alldata",async (req, res)=>{
      const cursor = allDataCollection.find()
      const alldata =await cursor.toArray()
      res.send(alldata)
    })
    app.get("/data",async (req, res)=>{
      const cursor = dataCollection.find()
      const data =await cursor.toArray()
      res.send(data)
    })
    app.get("/recipe",async (req, res)=>{
      const cursor = recipeCollection.find()
      const recipe =await cursor.toArray()
      res.send(recipe)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})