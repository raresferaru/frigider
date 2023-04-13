const express = require('express');
// const session = require('express-session')
const path = require('path');
const ejs = require('ejs')
// const ExpressErorr = require('./utils/ExpressError');
const formidable = require('formidable');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Jimp = require('jimp');
const sharp = require('sharp')
const multiparty = require('multiparty');
const http = require('http');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(fileUpload());

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

async function imageOverlay(photos, size, top, left) { // Function name is same as of file
    let x = 0;
    let y = 0;

    const image = await Jimp.read(__dirname + '/fridge.png');
    for (let i = 1; i <= photos.length; i++) {
        let watermark = await Jimp.read(__dirname + '/upload/' + `photo${i}.png`);
        watermark = watermark.resize(400 * size / 100, 400 * size / 100); // Resizing watermark image
        // Reading original image
        x = 400 * left[i - 1] / 100;
        y = 400 * top[i - 1] / 100;
        watermark = await watermark
        image.composite(watermark, x, y, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 1
        })

        // images.push(image);
    }
    await image.writeAsync(__dirname + '/public' + '/jimp/' + 'newImage.png');

}

app.get('/home', (req, res) => {
    res.render("home")
})

app.post('/', async (req, res) => {

    try {
        for (let i = 1; i <= 6; i++) {
            let filePath = __dirname + '/upload/' + `photo${i}.png`;
            try { fs.unlinkSync(filePath); } catch { }
            filePath = __dirname + '/nobg_upload/' + `photo${i}.png`;
            try { fs.unlinkSync(filePath); } catch { };
        }

        const { p1, p2, p3, p4, p5, p6 } = req.files;
        let photos = [];

        photos.push(p1);
        photos.push(p2);
        photos.push(p3);
        photos.push(p4);
        photos.push(p5);
        photos.push(p6);

        let cnt = 0;
        for (let p of photos) {
            cnt += 1;
            p.name = `photo${cnt}.png`;
            await p.mv(__dirname + '/upload/' + p.name)

        }

        const { size, top, left } = req.body;


        imageOverlay(photos, size, top, left);
        // res.redirect('/home')
        await delay(2000);

        res.render('send')
    } catch (e) {

        res.render('eroare')

    }
})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

app.get('/cacat', (req, res) => {
    res.render('send')
})

app.get('*', (req, res) => {
    res.redirect('/home')
})

setInterval(function () {
    try {
        http.get("https://alys.herokuapp.com/");
        console.log('Fetched');
    } catch (err) {
        console.log(err);
    }

}, 300000);

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));