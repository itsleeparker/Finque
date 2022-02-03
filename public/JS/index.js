$(document).ready(function (){
	$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    autoplay:true,
    autoplayTimeout:2000,
    stagePadding:70,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    },
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
   autoHeight:true
})
});

//APPLICANT CARD 
$(".applicant-card").hover(function(){
    $(this).css({'width':'50%'  ,'height':'280px'}) 
    $(this).addClass('active');
 $('.applicant-card+.active .info .bio').fadeIn().css('display' ,'block');
  } , function(){
      $(this).css({'width':'35%'  ,'height':'auto'});
      
          $('.applicant-card+.active .info .bio').fadeOut().css('display' ,'none');
  $(this).removeClass('active');
});
