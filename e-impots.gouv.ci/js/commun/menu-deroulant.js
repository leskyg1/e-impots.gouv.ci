// Sous menu navigation
// // activer la depth 1 dans le layout et charger ce fichier js pour que cela fonctionne.
// la propriété ->addPageClassToLi(true) doit aussi être presente. Enfin  le menu doit être configuré avec 'class' => 'dropdown' dans la navigation
$( document ).ready(function( $ ) {

    $( ".navbar-nav>li" ).each(function() {
        $( this ).children(":first.dropdown").addClass("dropdown-toogle");
        if ($( this ).children(":first").next().is("ul")){
            $( this ).children(":first").next().addClass("dropdown-menu");
        }
    });

    $('.dropdown-toogle').dropdown();

//    $('.navbar .dropdown > a').click(function(){
//        window.location.href = this.href ;
//    });

    //patch pour fonctionnemment sur hover
    $('.dropdown > a ').addClass('dropdown-toggle').attr("data-toggle","dropdown");

    $('li.dropdown').hover(function() {
        $(this).find('> .dropdown-menu').stop(true, true).fadeIn(1);
        $(this).addClass('open');
    }, function() {
        $(this).find('> .dropdown-menu').stop(true, true).fadeOut(1);
        $(this).removeClass('open');
    });
});
