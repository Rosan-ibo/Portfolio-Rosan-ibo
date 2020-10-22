// Animation sur le titre, trouvé sur internet

const htmlP = document.getElementById("anime-titre-header");
const txt = htmlP.dataset.label;
let i 	= 0 ;
function showLetters()
{
  let timeOut ;
  if(i < txt.length)
	{
	  htmlP.innerHTML += `<span>${txt[i]}</span>` ;
	  timeOut = setTimeout(showLetters,200)
	  i++
	}
	else
	{
	  clearTimeout(timeOut);
	  console.log("end")
	}
}
showLetters();



// animation menu hamburger
(function($) {

    const containerHambuger= $('.container-hamburger');
    const iconNav= $('.hamburger-nav')
    const menuBar= $('.list-hamburger');

$(window).scroll(function() {

	if ($(this).scrollTop() > 850) {
		containerHambuger.fadeIn(500);
	} 
	else { 
		containerHambuger.fadeOut(500);
	}
});
$(document).ready(function() {
    $(menuBar).fadeOut();
    $(iconNav).on('click', function() {
        $(menuBar).fadeToggle();
    });
})

// animation icon compétences

    $(document).ready(function(){
        $('.icon-skill').on('click', function() {
            $(this).toggleClass('clic-icon');
        });
    });

    // retour en haut de la page avec le bouton
    const scrollTopButton = $('.icon-return');
    scrollTopButton.click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');
    });
   

})(jQuery);