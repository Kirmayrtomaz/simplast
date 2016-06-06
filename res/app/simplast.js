
 $( document ).ready(function(){
     
     
     $(".dropdown").dropdown( { hover: true } );
     
       $('.slider').slider({full_width: true});
       
  var nav = $('header.navegacao');
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            nav.addClass("small-menu");
        } else {
            nav.removeClass("small-menu");
        }
    });
      
 }); 
 
 
 
 