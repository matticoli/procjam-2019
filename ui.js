

var heads = {};
var bodies = {};

var flowerDollHead = {face: "flower-face"};

var flowerDollBody = {body: "flower-body"};

var penguinDollHead = {face: "penguin-face"};

var penguinDollBody = {body: "penguin-body"};


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
    colorPallete = [];
    for (var i = 0; i < pallete.length; i++){
        var value = $("#picker" + i).spectrum("get");
        console.log("hex values" + $("#picker" + i).spectrum("get"));
        colorPallete.push(value);
    }

    console.log("current head selected " + currentHead)
    console.log("current body selected " + currentBody)

    createUrl();
    
}

function createUrl(){
    var face;
    var body;
    for(var key in heads[currentHead]){
        face = heads[currentHead][key];
        console.log("current head " + face);
    }

    for(var key in bodies[currentBody]){
        body = bodies[currentBody][key];
        console.log("current head " + body);
    }
    var newPallete = [];
    for(var j = 0; j < colorPallete.length; j++){
        var split = colorPallete[j].toString().split("#");
        newPallete.push(split[1]);
    }
    console.log(newPallete);
    console.log("https://russian-doll-generator.herokuapp.com/data?head=" + face + "&body=" + body + "&color1=" + 
        newPallete[0] + "&color2=" + newPallete[1] + "&color3=" + newPallete[2]
        + "&color4=" + newPallete[3] + "&color5=" + newPallete[4]);

    /**mikelpc.dyn.wpi.edu/?head=flower-face&body=flower-base&color1=ff00ff&color2=00ff00&color3=0000ff*/
    [1, 2, 3].forEach( (i) => {

        
        $.get( "https://russian-doll-generator.herokuapp.com/data?head=" + face + "&body=" + body + "&color1=" + 
        newPallete[0] + "&color2=" + newPallete[1] + "&color3=" + newPallete[2]
        + "&color4=" + newPallete[3] + "&color5=" + newPallete[4] + "&index=" + i, function(data) {
            console.log(data);
            var selector = "#doll"+i;
            console.log(selector);
            $(selector).html(data);
            //alert( "Load was performed." );
        });
        $("#doll1").children().height(100);
    })
    //document.write(data);
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
