//populate dropdowns with hashed possible values

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

heads["flowerDoll"] = flowerDollHead;
heads["penguinDoll"] = penguinDollHead;
bodies["flowerDoll"] = flowerDollBody;
bodies["penguinDoll"] = penguinDollBody;

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
    var filtersHead = [];
    var filtersBody = [];
    var rgbsHead = [];
    var rgbsBody = [];
    
    for(var key in heads[currentHead]){
        console.log("after colors get" + key);

        var r1 = $("#picker" + key).spectrum("get")._r;
        var g1 = $("#picker" + key).spectrum("get")._g;
        var b1 = $("#picker" + key).spectrum("get")._b;
        var rgb = {r: r1, g: g1, b: b1};
        rgbsHead.push(rgb);
        //console.log(r + " " + g + " " + b);
        var filter = Filtrr2("#" + key, function() {   
            console.log("key within filter" + key);  
            var dup = this.dup().fill(r1, g1, b1);   
            //this.fill(r1, g1, b1).render();
            this.layer('overlay', dup).render();  
        });

        filtersHead.push(filter);
        // filter.update(function(){
        //     this.render();
        // });

    }

    for(var i = filtersHead.length - 1; i > -1; i--){
        console.log("gullo" + rgbsHead[i].r);
        filtersHead[i].update(function(){
            this.fill(rgbsHead[i].r, rgbsHead[i].g, rgbsHead[i].b).render();
        });
    }

    //console.log("filters " + filters);
    //console.log("rgbs" + rgbs);
    for(var key in bodies[currentBody]){
        console.log("after colors get" + key);

        var r1 = $("#picker" + key).spectrum("get")._r;
        var g1 = $("#picker" + key).spectrum("get")._g;
        var b1 = $("#picker" + key).spectrum("get")._b;
        var rgb = {r: r1, g: g1, b: b1};
        rgbsBody.push(rgb);
        //console.log(r + " " + g + " " + b);
        var filter = Filtrr2("#" + key, function() {   
            console.log("key within filter" + key);  
            var dup = this.dup().fill(r1, g1, b1);   
            //this.fill(r1, g1, b1).render();
            this.layer('overlay', dup).render();  
        });

        filtersBody.push(filter);
        // filter.update(function(){
        //     this.render();
        // });
    }

    for(var i = filtersBody.length - 1; i > 0; i--){
        console.log("gullo" + rgbsBody[i].r);
        filtersBody[i].update(function(){
            this.fill(rgbsBody[i].r, rgbsBody[i].g, rgbsBody[i].b).render();
        });
    }
    
}

//call to randomize all colors
function randomize(){
    //setHead();
    //setBody();
    //swapModel();
    //generate rgb value between 0-255 rounded
     var r1;// = Math.floor(Math.random() * (255 - 0) + 0);
     var g1;// = Math.floor(Math.random() * (255 - 0) + 0);
     var b1;// = Math.floor(Math.random() * (255 - 0) + 0);
     var r2;// = Math.floor(Math.random() * (255 - 0) + 0);
     var g2;// = Math.floor(Math.random() * (255 - 0) + 0);
     var b2;// = Math.floor(Math.random() * (255 - 0) + 0);
     filtersHead = [];
     filtersBody = [];
     rgbsBody = [];
     rgbsHead = [];

     for(var key in heads[currentHead]){
         r1 = Math.floor(Math.random() * (255 - 150) + 150);
         g1 = Math.floor(Math.random() * (255 - 150) + 150);
         b1 = Math.floor(Math.random() * (255 - 150) + 150);
         var rgb = {r: r1, g: g1, b: b1};
         rgbsHead.push(rgb);
         var filter = Filtrr2("#" + key, function() {   
             var dup = this.dup().fill(r1, g1, b1);   
             //this.fill(r1, g1, b1).render();
             this.layer('overlay', dup).render();  
         });

         filtersHead.push(filter);

     }

     for(var key in bodies[currentBody]){
         console.log("hmmmmmmmmmmmmmmm" + key);

         r2 = Math.floor(Math.random() * (255 - 0) + 0);
         g2 = Math.floor(Math.random() * (255 - 0) + 0);
         b2 = Math.floor(Math.random() * (255 - 0) + 0);
         var rgb = {r: r2, g: g2, b: b2};
         rgbsBody.push(rgb);
         var filter = Filtrr2("#" + key, function() {   
             var dup = this.dup().fill(r2, g2, b2);   
             //this.fill(r1, g1, b1).render();
             this.layer('overlay', dup).render();  
         });

         filtersBody.push(filter);

     }

     for(var i = filtersBody.length - 1; i > 0; i--){
         console.log("gullo" + rgbsBody[i].r);
         filtersBody[i].update(function(){
             this.fill(rgbsBody[i].r, rgbsBody[i].g, rgbsBody[i].b).render();
         });
     }

     for(var i = filtersHead.length - 1; i > -1; i--){
         console.log("gullo" + rgbsHead[i].r);
         filtersHead[i].update(function(){
             this.fill(rgbsHead[i].r, rgbsHead[i].g, rgbsHead[i].b).render();
         });
     }
}

//swap body parts
function swapModel(){
    setBody();
    setHead();
    var headParts = document.getElementsByClassName("head");
    var bodyParts = document.getElementsByClassName("body");

    //iterate through and remove anything that was there and put in new parts corresponding
    //to currently selected doll
    for(var i = 0; i < headParts.length; i++){
        
        console.log("woooooooooooooooooooo");
        console.log(headParts[i]);
        headParts[i].remove();//style.display = "none";
    }

    for(var i = 0; i < bodyParts.length; i++){
        
        console.log("woooooooooooooooooooo");
        console.log(bodyParts[i]);
        bodyParts[i].style.display = "none";
    }

    //now replace!
    for(var key in heads[currentHead]){
        var value = heads[currentHead][key];
        console.log("pqqqqqqqqqqqqqqqqqq" + value);
        var el = $("<img id=" + key + " src=" + value + " style='position: absolute; display: block'/>");
        el.appendTo('#dollHead');
        

    }

    for(var key in bodies[currentBody]){
        var value = bodies[currentBody][key];
        console.log("pqqqqqqqqqqqqqqqqqq" + value);
        var el = $("<img id=" + key + " src=" + value + " style='position: absolute; display: block'/>");
        el.appendTo('#dollBody');
        
    }

    // headParts = document.getElementsByClassName("dollHead");
    // bodyParts = document.getElementsByClassName("dollBody");

    // //iterate through and remove anything that was there and put in new parts corresponding
    // //to currently selected doll
    // for(var i = 0; i < headParts.length; i++){
        
    //     console.log("woooooooooooooooooooo");
    //     console.log(headParts[i]);
    //     headParts[i].style.display = "block";
    // }

    // for(var i = 0; i < bodyParts.length; i++){
        
    //     console.log("woooooooooooooooooooo");
    //     console.log(bodyParts[i]);
    //     bodyParts[i].style.display = "block";
    // }
}
