
var heads = {};
var bodies = {};

var flowerDollHead = {skin: "./assets/_0001s_0000_flower-face-skin.png",
                eyes: "./assets/_0001s_0001_flower-face-eyes.png",
                hair: "./assets/_0001s_0002_flower-face-hair.png",
                cheeks: "./assets/_0001s_0003_flower-face-cheeks.png",
                face: "./assets/_0001s_0004_flower-face.png"};

var flowerDollBody = {jacket: "./assets/_0001s_0005_flower-base-jacket.png", 
                        design: "./assets/_0001s_0006_flower-base-flowers.png",
                        base: "./assets/_0001s_0007_flower-base.png"};

var penguinDollHead = {beak: "./assets/_0001s_0008_penguin-face-beak.png",
                        cheeks: "./assets/_0001s_0009_penguin-face-cheeks.png",
                        eyes: "./assets/_0001s_0010_penguin-face-eyes.png"};

var penguinDollBody = {feet: "./assets/_0001s_0012_penguin-base-feet.png",
                        base: "./assets/_0001s_0013_penguin-base.png"};

heads["flower doll"] = flowerDollHead;
heads["penguin doll"] = penguinDollHead;
bodies["flower doll"] = flowerDollBody;
bodies["penguin doll"] = penguinDollBody;

var currentHead;
var currentBody;

var colorPallete = [];

function setHead(){
    var select = document.getElementById("headDropdown"); 
    currentHead = select.value;
    console.log(this.currentHead);
}

function setBody(){
    var select = document.getElementById("bodyDropdown"); 
    currentBody = select.value;
}

function populateDropDowns(){

    console.log(heads);
    for(var key in heads){
        var value = heads[key];
        console.log(key);
        console.log(Object.keys(heads).length);
        
        var option = $('<option value="' + key + '">' + key + '</option>');
        option.textContent = key;
        option.value = key;

        option.appendTo('#headDropdown');
      }

      for(var key in bodies){
        var value = bodies[key];
        console.log(key);
        console.log(value);
        
        var option = $('<option value="' + key + '">' + key + '</option>');
        option.textContent = key;
        option.value = key;

        option.appendTo('#bodyDropdown');
      }

}

function addColorPickers(){

    for(var i = 0; i < 5; i++){
    
        var picker = $('<input type="text" class="pallete" id="picker' + i + '" style="position: relative;" />');
        //picker.css("display", "inline");
        //console.log("what is happening" + headPickerCount);
        picker.appendTo('#colorPickers');

        $("#picker" + i).spectrum({
            preferredFormat: "hex",
            showInput: true,
            showPalette: true,
         
            move: function(color){
                //console.log(color);
            }
        });

    }

}

function generate(){
    setHead();
    setBody();
    //get color pallete, body and head and call npm function that creates the doll set
    var pallete = document.getElementsByClassName("pallete");

    for (var i = 0; i < pallete.length; i++){
        var value = $("#picker" + i).spectrum("get");
        console.log("hex values" + $("#picker" + i).spectrum("get"));
        colorPallete.push(value);
    }

    console.log("current head selected " + currentHead)
    console.log("current body selected " + currentBody)

    
}

window.onload = function(){
    this.populateDropDowns();
    
    this.setHead();
    this.setBody();
    console.log("what is selected rn?");
    console.log(this.currentHead);
    console.log(this.currentBody);
    this.addColorPickers();
}