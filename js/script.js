window.onload=function(){
  $('.slider').slick({
  autoplay:false,
  draggable: true,
  infinite: false,
  arrows:false,
  centerMode: false,
  slidesToShow:1,
  slidesToScroll:1
  });

  $( "#messages" ).click(function() {
  $( ".messages" ).animate({

    opacity: "toggle"
  }, 100, "linear", function() {
    $( this ).after( "<div>Animation complete.</div>" );
  });
});

};
