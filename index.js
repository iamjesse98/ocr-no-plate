const path = require('path')
const Jimp = require('jimp')
const Tesseract = require('tesseract.js')

const img = path.join(__dirname, process.argv[2])

console.log(img)

// Tesseract.recognize(img)
//     .then(result => { console.log('result is: ', result) })

function pullText(url, callback) {
    Jimp.read(url)
        .then(image => {
            image.getBuffer(Jimp.MIME_JPEG, (err, data) => {
                if (err) return callback(err);
                Tesseract.recognize(data, { lang: 'eng' })
                    .then(result => callback(null, result.text))
                    .catch(err => callback(err))
            })
        }).catch(err => callback(err));
}

pullText(img, (err, result) => {
    if (err) throw err;
    console.log(result);
})