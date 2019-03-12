const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
// client
//   .textDetection('./resources/wakeupcat.jpg')
//   .then(results => {
//     //   console.log(results[0].fullTextAnnotation.pages[0].blocks[0].boundingBox);
//     // const labels = results[0].labelAnnotations;

//     // console.log('Labels:');
//     // labels.forEach(label => console.log(label.description));
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

let mongoClient = require('mongodb').MongoClient;
let dbUrl = "mongodb://" + process.env.IPADDRESS + ":27017/mydb";

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

// upload image and return text
app.post('/api/search/image/', upload.single('image'), function (req, res, next) {
    let path = req.file.path;
    client.textDetection(path).then(results => {
        let vertices = results[0].fullTextAnnotation.pages[0].blocks[0].boundingBox.vertices;
        // console.log(results[0]);
        // console.log(vertices);
        console.log(results[0].textAnnotations);
        // console.log(results[0].textAnnotations[0].description.split("\n"));
        return res.json(results[0]);
        // return res.json(results[0].fullTextAnnotation.pages[0].blocks[0].boundingBox);
        // labels.forEach(label => console.log(label.description));
    }).catch(err => {
        console.error('ERROR:', err);
    });
});

// need to update the method
app.get('/api/nutrient/', function (req, res, next) {
    mongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
        if (err) return res.status(500).end(err);
        let nutrients = db.collection('nutrients');
        // need to update the Item(req.body)
        nutrients.findOne({fields:{b:1}}, function(err, nutrient) {
            console.log(nutrient);      
            db.close();
        });
    });
    // items.find({}).sort({createdAt:-1}).limit(5).exec(function(err, items) { 
    //     if (err) return res.status(500).end(err);
    //     console.log(req);
    //     console.loads(res.status(500).end());
    //     return res.json(items.reverse());
    // });
});

app.post('/api/nutrients/', function (req, res, next) {
    mongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
        if (err) return res.status(500).end(err);
        let nutrients = db.collection('nutrients');
        // need to update the Item(req.body)
        nutrients.insertOne(new Item(req.body), function(err, nutrient) {
            if (err) return res.status(500).end(err);
            if(r.insertedCount == 1) return res.json(nutrient);
            // Finish up test
            db.close();
        });
    });
});

app.get('/', (req, res) => {
    res.send('Hello world\n');
});

const http = require('http');
const PORT = 8080;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});