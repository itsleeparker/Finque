//APPLICANT CARD 
$(".applicant-card").hover(function(){
    $(this).css({'width':'50%'  ,'height':'280px'}) 
    $(this).addClass('active');
 $('.applicant-card+.active .info .bio').fadeIn().css('display' ,'block');
  } , function(){
          $(this).css({'width':'30%'  ,'height':'auto'});
      
          $('.applicant-card+.active .info .bio').fadeOut().css('display' ,'none');
  	  $(this).removeClass('active');
});

//applicant list

$('.applicant-list').click(function(){
    $(this).find('.a-info').toggleClass('hidden');
    $(this).addClass('active');
    $('li').not(this).toggleClass('hidden');
   });
 
