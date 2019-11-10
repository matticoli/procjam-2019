console.log("Test");              

//define original filter and update
var thing = Filtrr2("#change", function() {  
    console.log("Test2");      
    
    var dup = this.dup().expose(80);
    this.layer('overlay', dup).fill(255, 0, 0);
    //this.saturate(-70).render();
});
var pickerColor;
$("#picker").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showPalette: true,
    palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]],
 
    move: function(color){
       
        console.log(color);
    }
    
});

function applyFilter(){
    console.log("asdfasdfasdfas");

    thing.update(function(){
        this.fill(255, 255, 255).render();
    });
    var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', "./assets/_0001s_0000_flower-face-skin.png");
    img.css('position', 'absolute');
    img.appendTo('#doll');//console.log(color.toHexString());
    console.log($("#picker").spectrum("get")._r);
    console.log($("#picker").spectrum("get")._g);
    console.log($("#picker").spectrum("get")._b);
    console.log($("#picker").spectrum("get")._a);
    var r = $("#picker").spectrum("get")._r;
    var g = $("#picker").spectrum("get")._g;
    var b = $("#picker").spectrum("get")._b;

    //   Filtrr2.fx("fill", function(r, g, b) {
    //     this.process(function(rgba)
    //     {
    //         rgba.r = r;
    //         rgba.g = g;
    //         rgba.b = b;
    //     }); 
    // });

    // $("#picker").spectrum({
    //     fill: [0, 0, 0]
    // })

    console.log($("#picker").spectrum("option", "color")); //returns original value only
    
}

//  Filtrr2.fx("fill", function(r, g, b) {
//      this.process(function(rgba)
//      {
//          rgba.r = r;
//          rgba.g = g;
//          rgba.b = b;
//      });
// });
