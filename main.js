
//set a list variable to contain all th things to be randomized and all things that are custom set
//build json at end of function once list is made

//globals!
var optionsList = []; //at the end this will consist of all options that are needed to know to do the generation
var swapFace = false;
var swapBody = false;
var randomColors = false;
var customColors = false;
var customFace = false;
var randomAll = false;

var rgb1 = [];
var rgb2 = [];
var rgb3 = [];
var rgb4 = [];
var filters = [eyesFilter, cheeksFilter, skinFilter, design1Filter, design2Filter, baseFilter];

//collection of filters on each object
//define original filter and update
// var eyesFilter = Filtrr2("#eyes", function() {  
//     console.log("Test2");      
//     this.saturate(-100).render();
// });
// var cheeksFilter = Filtrr2("#cheeks", function() {  
//     console.log("Test2");      
//     this.saturate(-100).render();
// });
// var skinFilter = Filtrr2("#skin", function() {  
//     console.log("Test2");      
//     this.saturate(-100).render();
// });
// var design1Filter = Filtrr2("#jacket", function() {  
//     console.log("Test2");      
//     this.saturate(-100).render();
// });
// var design2Filter = Filtrr2("#design", function() {  
//     console.log("Test2");      
//     this.saturate(-100).render();
// });
// var baseFilter = Filtrr2("#base", function() {  
//     console.log("Test2");      
//     this.saturate(-100).render();
// });

function generatePickers(){
    var count = 0;

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

$("#picker1").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showPalette: true,
    palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]],
 
    move: function(color){
       
        console.log(color);
    }
    
});
$("#picker2").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showPalette: true,
    palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]],
 
    move: function(color){
       
        console.log(color);
    }
    
});
$("#picker3").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showPalette: true,
    palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]],
 
    move: function(color){
       
        console.log(color);
    }
    
});
$("#picker4").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showPalette: true,
 
    move: function(color){
       
        console.log(color);
    }
    
});

function applyFilter(){
    console.log("asdfasdfasdfas");
    var optionsCopy = optionsList;
    console.log(optionsList); //returns list of options in effect
    
    console.log(optionsList);
    
    var r1 = $("#picker1").spectrum("get")._r;
    var g1 = $("#picker1").spectrum("get")._g;
    var b1 = $("#picker1").spectrum("get")._b;

    for(var j = 0; j < filters.length; j++){
        filters[j].update(function(){
            this.fill(r1, g1, b1).render();
        });
    }
     
    var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', "./assets/_0001s_0000_flower-face-skin.png");
    img.css('position', 'absolute');
    //img.appendTo('#doll');//console.log(color.toHexString());

    var checkboxes = $("input:checkbox");
    var toprint = "";
    for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            toprint += checkboxes[i].value + " ";
        }
    }
    //console.log(toprint);
    //console.log($("input:checkbox"));
    console.log($("#picker").spectrum("option", "color")); //returns original value only
    buildRandomJson();
    optionsList = [];

    
    
}

//face randomized
$('#wholeface').click(function() {
    console.log("selected face button!");
    if($('#wholeface').is(':checked')) { 
         showOptions("swapFace");
         console.log("i am checked");
     } 
 });

 //body randomized
 $('#wholebody').click(function() {
    console.log("selected face button!");
    if($('#wholebody').is(':checked')) { 
         showOptions("swapBody");
         console.log("body checked");
     } 
 });

 //no options
 $('#randomAll').click(function() {
    console.log("selected face button!");
    if($('#randomAll').is(':checked')) { 
         showOptions("none");
         console.log("all random checked");
     } 
 });

 //don't show custom color options
 $('#randomColor').click(function() {
    console.log("selected face button!");
    if($('#randomColor').is(':checked')) { 
         showOptions("randomColor");
         console.log("all random checked");
     } 
 });

 //show custom color options
 $('#customColor').click(function() {
    if($('#customColor').is(':checked')) { 
         showOptions("customColors");
     } 
 });

 //show all options
 $('#customAll').click(function() {
    if($('#customAll').is(':checked')) { 
         showOptions("allCustom");
     } 
 });

 /**else if($('#wholebody').is(':checked') || $('#alloptions').is(':checked')){
         showFaceOptions(false);
         console.log("not checked anymore!");
     } */
 
     

function showOptions(option){
        
        if(option == "swapFace"){
            showFaceOptions(false);
            showBodyOptions(false);
            swapFace = true;
            swapBody = false;
            randomAll = false;
            customFace = false;

        } else if (option == "swapBody") {
            showBodyOptions(false);
            showFaceOptions(false);
            swapFace = false;
            swapBody = true;
            randomAll = false;
            customFace = false;
        } 
        
        if(option == "customColors"){
            showColorOptions(true);
            customColors = true;
            randomColors = false;
        } else if(option == "randomColor"){
            showColorOptions(false);
            randomColors = true;
            customColors = false;
        }

        if (option == "allCustom"){
            showBodyOptions(true);
            showFaceOptions(true);
            showColorOptions(true);
            customFace = true;
            customColors = true;
        }

        if (option == "none"){
            showFaceOptions(false);
            showBodyOptions(false);
            showColorOptions(false);
            randomAll = true;
        }

        if(randomAll){
            optionsList.push("randomAll");
            //console.log(optionsList);
            return;
        }
        if(customColors && customFace){
            optionsList.push("customAll");
            //console.log(optionsList);
            return;
        }

        if(swapBody){
            optionsList.push("swapBody");
        }
        if(swapFace){
            optionsList.push("swapFace");
        }
        if(customFace){
            optionsList.push("customFace");
        }
        if(customColors){
            optionsList.push("customColors");
        }
        if(randomColors){
            optionsList.push("randomColors");
        }

        //console.log(optionsList);
}
function showFaceOptions(show){
    var list = document.getElementsByClassName("faceoptions");
    
    for(var i = 0; i < list.length; i++){
        if(show){
            list[i].style.display = "block";
        } else if (!show){
            list[i].style.display = "none";
        }
    }
}

function showBodyOptions(show){
    var list = document.getElementsByClassName("bodyoptions");
    
    for(var i = 0; i < list.length; i++){
        if(show){
            list[i].style.display = "block";
        } else if (!show){
            list[i].style.display = "none";
        }
    }
}

function showColorOptions(show){
    var list = document.getElementsByClassName("coloroptions");
    
    for(var i = 0; i < list.length; i++){
        if(show){
            list[i].style.display = "block";
        } else if (!show){
            list[i].style.display = "none";
        }
    }
}

function buildRandomJson(){
    var optionsCopy = optionsList;
    var myjson = "\{";
    //iterate through options list, see what is checked, and get relevant information from each option
    for(var i = 0; i < optionsCopy.length; i++){
        switch(optionsCopy[i]){
            case "randomAll":
                myjson += "\"randomAll\":\{\"randomize?\": true\},";
                break;
            case "customAll":
                myjson += ""
                break;
            case "randomColors":
                myjson += "\"randomColors\": \{\"randomize?\": true\},";
                break;
            case "swapFace":
                myjson += "\"swapFace\": \{\"swap?\": true\},";
                break;
            case "swapBody":
                myjson += "\"swapBody\": \{\"swap?\": true\},";
                break;
            case "customColors":
                rgb1.push($("#picker1").spectrum("get")._r, $("#picker1").spectrum("get")._g,$("#picker1").spectrum("get")._b);
                rgb2.push($("#picker2").spectrum("get")._r, $("#picker2").spectrum("get")._g,$("#picker2").spectrum("get")._b);
                rgb3.push($("#picker3").spectrum("get")._r, $("#picker3").spectrum("get")._g,$("#picker3").spectrum("get")._b);
                console.log(rgb1 + "\n" + rgb2 + "\n" + rgb3);
                myjson += "\"customColors\": [\{\"color1\": \"["
                + rgb1[0] + ", " + rgb1[1] + ", " + rgb1[2] + "]\",\"color2\": \"["
                + rgb2[0] + ", " + rgb2[1] + ", " + rgb2[2] + "]\",\"color3\": \"[" 
                + rgb3[0] + ", " + rgb3[1] + ", " + rgb3[2] + "]\"\}],";
                break;
            default:
                break;
            
        }
    }
    console.log("this is options copy in json functions");

    console.log(myjson);
}

//generate json object that describes attributes which person wants to change

//  Filtrr2.fx("fill", function(r, g, b) {
//      this.process(function(rgba)
//      {
//          rgba.r = r;
//          rgba.g = g;
//          rgba.b = b;
//      });
// });
