console.log("Test");              

//define original filter and update
var thing = Filtrr2("#img", function() {  
    console.log("Test2");      
    
    var dup = this.dup().expose(80);
    this.layer('overlay', dup);
    //this.saturate(-70).render();
});



function applyFilter(){
    console.log("asdfasdfasdfas");

    thing.update(function(){
        this.saturate(-80).render();
    });
    var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', "./assets/_0001s_0000_flower-face-skin.png");
    
    img.appendTo('#doll');
    img.css('position', 'absolute');
}