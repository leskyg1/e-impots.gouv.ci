$( document ).ready(function( $ ) {

         $('.switchLocaleLink a').click(function(){
          
            $locale = $(this).attr('locale');
            $.ajax({
                url: oConstantes.baseUrl+'/services/locale/switch-locale',
                type: 'post',
                data:  {locale:$locale}  
            }).done(function(content) {
                window.location.reload();
            });
          return false;
      });
    
});