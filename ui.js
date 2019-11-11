//populate dropdowns with hashed possible values

var heads = {};
var bodies = {};

var flowerDollHead = {skin: "./assets/_0001s_0000_flower-face-skin.png",
                eyes: "./assets/_0001s_0001_flower-face-eyes.png",
                hair: "./assets/_0001s_0002_flower-face-hair.png",
                cheeks: "./assets/_0001s_0003_flower-face-cheeks.png",
                face: "./assets/_0001s_0004_flower-face.png"};

var flowerDollBody = {jacket: "./assets/_0001s_0005_flower-base-jacket.png", 
                        flowers: "./assets/_0001s_0006_flower-base-flowers.png",
                        base: "./assets/_0001s_0007_flower-base.png"};

heads["flowerDoll"] = flowerDollHead;
bodies["flowerDoll"] = flowerDollBody;

var currentHead;
var currentBody;

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

//create color pickers for each option selected in head and body that can be changed
function addColorPickers(){
    var headPickerCount = 0;
    var bodyPickerCount = 0;
    for(var key in heads[currentHead]){
        var head = heads[currentHead][key];
        var value = head[key];
        console.log("this is value wee" + key);

        //add color picker
        var label = $('<p>Color pallete: ' + key + '</p>');
        var picker = $('<input type="text" id="picker' + key + '" style="position: relative;" />');
        console.log("what sos happenong" + headPickerCount);
        label.appendTo('#colorPickers');
        picker.appendTo('#colorPickers');

        $("#picker" + key).spectrum({
            preferredFormat: "rgb",
            showInput: true,
            showPalette: true,
            color: "#3355cc",//"red",
         
            move: function(color){
                //console.log(color);
            }
        });
        headPickerCount++;
    }

     for(var key in bodies[currentBody]){
         var body = bodies[currentBody][key];
         var value = body[key];

         //add color picker
         var label = $('<p>Color pallete: ' + key + '</p>');
         var picker = $('<input type="text" id="picker' + key + '" style="position: relative;" />');
         label.appendTo('#colorPickers');
         picker.appendTo('#colorPickers');

         $("#picker" + key).spectrum({
             preferredFormat: "rgb",
             showInput: true,
             showPalette: true,
      
             move: function(color){
                 //console.log(color);
            }
         });
         headPickerCount++;
     }
   
}

function setHead(){
    var select = document.getElementById("headDropdown"); 
    currentHead = select.value;
    console.log(this.currentHead);
}

function setBody(){
    var select = document.getElementById("bodyDropdown"); 
    currentBody = select.value;
}

window.onload = function() {
    this.populateDropDowns();
    this.setHead();
    this.setBody();

    console.log("what is selected rn?");
    console.log(this.currentHead);
    console.log(this.currentBody);

    this.addColorPickers();
};

//get selected colors from each color picker to apply to picture later
function applyColors(){
    var filters = [];
    var rgbs = [];
    
    for(var key in heads[currentHead]){
        console.log("after colors get" + key);

        var r1 = $("#picker" + key).spectrum("get")._r;
        var g1 = $("#picker" + key).spectrum("get")._g;
        var b1 = $("#picker" + key).spectrum("get")._b;
        var rgb = {r: r1, g: g1, b: b1};
        rgbs.push(rgb);
        //console.log(r + " " + g + " " + b);
        var filter = Filtrr2("#" + key, function() {   
            console.log("key within filter" + key);     
            this.fill(r1, g1, b1).render();
                
        });

        filters.push(filter);
        // filter.update(function(){
        //     this.render();
        // });

    }

    for(var i = 0; i < filters.length; i++){
        console.log("gullo" + rgbs[i].r);
        filters[i].update(function(){
            this.fill(rgbs[i].r, rgbs[i].g, rgbs[i].b).render();
        });
    }

    console.log("filters " + filters);
    console.log("rgbs" + rgbs);
    for(var key in bodies[currentBody]){
    
    }
    
}

//convert rgb to hex if needed
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  //alert(rgbToHex(0, 51, 255)); // #0033f
