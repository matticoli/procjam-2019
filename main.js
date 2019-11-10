console.log("Test");              

//define original filter and update
var thing = Filtrr2("#eyes", function() {  
    console.log("Test2");      
    
    var dup = this.dup().expose(80);
    this.layer('overlay', dup).render();
    //this.saturate(-70).render();
});
var pickerColor;
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

    var r = $("#picker").spectrum("get")._r;
    var g = $("#picker").spectrum("get")._g;
    var b = $("#picker").spectrum("get")._b;

    // thing.update(function(){
    //     this.fill(255, 0, 0).render();
    // });
    var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', "./assets/_0001s_0000_flower-face-skin.png");
    img.css('position', 'absolute');
    //img.appendTo('#doll');//console.log(color.toHexString());
    console.log($("#picker").spectrum("get")._r);
    console.log($("#picker").spectrum("get")._g);
    console.log($("#picker").spectrum("get")._b);
    console.log($("#picker").spectrum("get")._a);
    

    // $("#picker").spectrum({
    //     fill: [0, 0, 0]
    // })
    var checkboxes = $("input:checkbox");
    var toprint = "";
    for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            toprint += checkboxes[i].value + " ";
        }
    }
    console.log(toprint);
    //console.log($("input:checkbox"));
    console.log($("#picker").spectrum("option", "color")); //returns original value only
    
}

//face randomized
$('#wholeface').click(function() {
    console.log("selected face button!");
    if($('#wholeface').is(':checked')) { 
         showOptions("face");
         console.log("i am checked");
     } 
 });

 //body randomized
 $('#wholebody').click(function() {
    console.log("selected face button!");
    if($('#wholebody').is(':checked')) { 
         showOptions("body");
         console.log("body checked");
     } 
 });

 //no options
 $('#alloptions').click(function() {
    console.log("selected face button!");
    if($('#alloptions').is(':checked')) { 
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
         showOptions("colors");
     } 
 });

 //show all options
 $('#customRandom').click(function() {
    if($('#customRandom').is(':checked')) { 
         showOptions("allcustom");
     } 
 });

 /**else if($('#wholebody').is(':checked') || $('#alloptions').is(':checked')){
         showFaceOptions(false);
         console.log("not checked anymore!");
     } */
 
 
function showOptions(option){
        var optionsList; //at the end this will consist of all options that are needed to know to do the generation

        if(option == "face"){
            showFaceOptions(true);
            showBodyOptions(false);
        } else if (option == "body") {
            showBodyOptions(true);
            showFaceOptions(false);
        } 
        
        if(option == "color"){
            showColorOptions(true);
        } else if(option == "randomColor"){
            showColorOptions(false);
        }

        if (option == "allcustom"){
            showBodyOptions(true);
            showFaceOptions(true);
            showColorOptions(true);
        }

        if (option == "none"){
            showFaceOptions(false);
            showBodyOptions(false);
            showColorOptions(false);
        }
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

function buildRandomJson(listOfOptions){

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
