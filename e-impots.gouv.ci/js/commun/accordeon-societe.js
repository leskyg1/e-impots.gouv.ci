$( document ).ready(function() {
    
   function toggleBandeau($init) {
        $('.js-bandeau-societe').fadeToggle("fast");
        if ($('.societe-fermeture i').hasClass('fa-arrow-up')) {
            $('.societe-fermeture i').addClass('fa-arrow-down').removeClass('fa-arrow-up');
            $('.bandeau-societe').css('background-color','rgba(128, 128, 128, 0.06)');
            $.ajax({
                url: oConstantes.baseUrl+'/services/index/toggle-bandeau-societe',
                type: 'post',
                data:  {actif:0}  
            });
        } else {
            $('.societe-fermeture i').addClass('fa-arrow-up').removeClass('fa-arrow-down');
            $('.bandeau-societe').css('background-color','rgba(128, 128, 128, 0.06)');
            $.ajax({
                url: oConstantes.baseUrl+'/services/index/toggle-bandeau-societe',
                type: 'post',
                data:  {actif:1}  
            });
        }
   }  
   
    
    
    function initBandeau ($init) {
        if ( $init == 1 ) {       
            $('.js-bandeau-societe').fadeIn("fast");
            $('.societe-fermeture i').addClass('fa-arrow-up').removeClass('fa-arrow-down');
            $('.bandeau-societe').css('background-color','rgba(128, 128, 128, 0.06)');

        } 
        
        if ( $init == 0 ) {       
            $('.js-bandeau-societe').fadeOut("fast");
            $('.societe-fermeture i').addClass('fa-arrow-down').removeClass('fa-arrow-up');
            $('.bandeau-societe').css('background-color','rgba(128, 128, 128, 0.06)');
        } 
        
    }      
    
    
   $('.societe-fermeture').click(toggleBandeau);
   $init = $('#bandeauSociete').val();
   initBandeau($init);
   ;
});