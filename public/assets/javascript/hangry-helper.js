$(document).ready(function(){
   $("#scrollToContentImage").click(function(){
      $('html, body').animate({
       scrollTop: $($(this).attr('href')).offset().top
      }, 2000);
   });
});
