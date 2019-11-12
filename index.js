var Jimp = require('jimp');
 
var imagePaths = ["flower-base.png", "flower-face.png","flower-face-skin.png","flower-face-cheeks.png","flower-face-eyes.png", "flower-face-hair.png", "flower-base-jacket.png", "flower-base-flowers.png"]
var images = [undefined, undefined, undefined]
var i = 0;
var x = (err, image) => {
    console.log("Run x w "+image);
    if(i >= imagePaths.length) {
        image.composite(image.scale(0.8, 0.8), image.bitmap.width * 1.0, 0)
        .composite(image.scale(0.6, 0.6), image.bitmap.width * 2, 0)
        .composite(image.scale(0.4, 0.4), image.bitmap.width * 3, 0)
        .write("test.jpg", () => {
            console.log("Done!");
            exit(0);
        });
    }
    Jimp.read("../assets/"+imagePaths[i++], (err, img) => {
        img
        .color([
            { apply: 'hue', params: [Math.random() * -180] }
        ])
        .composite(image, 0, 0, undefined, x);
    });
}

Jimp.read("../assets/flower-base.png", x);