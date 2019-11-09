console.log("Test");              

//define original filter and update
var thing = Filtrr2("#img", function() {  
    console.log("Test2");      
    
    var dup = this.dup().expose(80);
    this.layer('overlay', dup);
    //this.saturate(-70).render();
});
var pickerColor;
$("#picker").spectrum({
    color: "#f00",
    showInput: true,
    move: function(color){
        color.toHexString(); 
    }
    
});

function applyFilter(){
    console.log("asdfasdfasdfas");

    thing.update(function(){
        this.saturate(-80).render();
    });
    var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', "./assets/_0001s_0000_flower-face-skin.png");
    img.css('position', 'absolute');
    img.appendTo('#doll');//console.log(color.toHexString());
    console.log($("#picker").spectrum("get")._r);
    console.log($("#picker").spectrum("get")._g);
    console.log($("#picker").spectrum("get")._b);
    console.log($("#picker").spectrum("get")._a);

    console.log($("#picker").spectrum("option", "color")); //returns original value only
    console.log(pickerColor);
    //console.log(document.getElementById('#picker').color.toHexString());
    
}

