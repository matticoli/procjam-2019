var Jimp = require('jimp');
var express = require('express');
const app = express();
const port = process.env.PORT || 8080;

var allTheImages = {
    "flower-body": ["flower-base.png", "flower-base-jacket.png", "flower-base-flowers.png"],
    "flower-face": ["flower-face.png","flower-face-skin.png","flower-face-cheeks.png","flower-face-eyes.png", "flower-face-hair.png"],
    "penguin-body": ["penguin-base.png", "penguin-base-feet.png"],
    "penguin-face": ["penguin-face.png", "penguin-face-cheeks.png","penguin-face-eyes.png", "penguin-face-beak.png"]
}
app.use('/', express.static('.'));
app.get('/data', (req, res) => {
    try {
        console.log(req.query);
        var imagePaths = allTheImages[req.query["head"]].concat(allTheImages[req.query["body"]]);
        var colors = [Jimp.cssColorToHex(req.query.color1), Jimp.cssColorToHex(req.query.color2), Jimp.cssColorToHex(req.query.color3), Jimp.cssColorToHex(req.query.color4), Jimp.cssColorToHex(req.query.color5)];
        var imgIndex = req.query["index"];

        console.log(imagePaths);
        var i = 0;
        var x = (err, image) => {
            console.log("Run x w "+image);
            if(i >= imagePaths.length) {
                image.blur(1)
                .getBase64(Jimp.AUTO, (err, dat) => {
                    res.send("<img style=\"height: " + 100*(parseInt(imgIndex) || 1) + "px\" src=\""+dat+"\"/>");
                    return;
                });
            }
            Jimp.read("./assets/"+imagePaths[i++], (err, img) => {
                if(!img) {
                    return;
                }
                img
                .color([
                    { apply: 'tint', params: [colors[Math.floor(Math.random()*colors.length)]] }
                ])
                .composite(image, 0, 0, undefined, x);
            });
        }
        Jimp.read("./assets/blank.png", x);
    } catch(e) {
        res.send("Error");
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))