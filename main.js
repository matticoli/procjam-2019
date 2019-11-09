console.log("Test");              

//define original filter and update
var thing = Filtrr2("#img", function() {  
    console.log("Test2");      
    
    var dup = this.dup().expose(80);
    this.layer('overlay', dup).render();
    //this.saturate(-70).render();
});

function help(){
    console.log("asdfasdfasdfas");

    thing.update(function(){
        this.saturate(-80).render();
    });
    // thing.ready(function(){
    //     this.saturate(80).render();
    // });
}