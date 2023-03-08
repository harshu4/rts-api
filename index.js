require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = "mongodb+srv://harsh4444:KqBHGDnuA8llURl3@cluster0.bexolkm.mongodb.net/?retryWrites=true&w=majority";
const Data = require('./user.js')
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${3000}`)
})

app.get('/:id', async(req, res) => {
    try {
        let data = await Data.findOne({ id: req.params.id })
        if (data) {
            data = {
                address: data.id,
                buil: data.buildings
            }

            res.json(data);

        } else {
            res.json({ "id": false })
        }
    } catch (error) {
        console.log(error);
        res.json({ "id": false })

    }


})

app.get('/random/:id', async(req, res) => {
    try {
        let data = await Data.findOne({ id: { $ne: req.params.id } })
        if (data) {
            data = {
                address: data.id,
                buil: data.buildings
            }

            res.json(data);

        } else {
            res.json({ "id": false })
        }
    } catch (error) {
        console.log(error);
        res.json({ "id": false })

    }


})


app.post('/save', async(req, res) => {
    try {

        //let a = '{"address":"dfsf","buil":[{"buildingIndex":2,"position":[75,0,85],"rotation":0.0}]}'

        let a = req.body
        console.log(a);
        let c = await Data.findOne({ "id": a.address })
        if (c == null) {
            c = new Data({
                id: a.address,
                buildings: a.buil
            })

        }
        c.buildings = a.buil;



        await c.save();
        console.log(c)
        res.send("hola");
    } catch (error) {
        console.log(error)

        res.json({ "id": false })
    }

})