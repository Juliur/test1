$('.trigger').on('click', (function (){
  $('.popupForm').fadeIn(300);
}));

$('.popupForm, .close').on('click', (function () { 
  $('.popupForm').fadeOut(300); 
}));

$('.show-alert').on('click', (function () {
  $('.popupForm').fadeOut(500, function(){
    alert("DONE")
  })}
));