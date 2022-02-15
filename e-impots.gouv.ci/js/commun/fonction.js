var allTranslations = null;

// Evite d'avoir des null qui s'affichent dans les tableaux datatable
function formNull ($elem) {    
    if ($elem == null || $elem == 'null') {
        return '';
    } else {
        return $elem;
    }

}

// Fonction qui permet de couper un chaine si elle depasse la taille maximum et d'ajouter des ... 
// Ne coupe pas un mot entier
function cutContenuElement($elem,$length) {
    $str = $elem.html();
    if ($str.length > $length) {
        $str = $str.substr(0,$length);
        $pos = $str.lastIndexOf(" ");
        if ($pos > 0) {
            $elem.html($str.substr(0,$pos)+'...');
        } 
    } 
}

// fonction qui traduit des 0 et 1 en Non et Oui
function formatStatut ($elem) {
    if ($elem == 0) {
        return 'Inactif';
    } else {
        return 'Actif';
    }
}

// fonction qui traduit des 0 et 1 en Non et Oui
function formatBinaire ($elem) {
    if ($elem == 0) {
        return 'Non';
    } else {
        return 'Oui';
    }
}


function formatLettrage ($elem) {
    if ($elem == 0) {
        return 'Non affecté';
    } else if ($elem == 1){
        return 'Affecté';
    } else if ($elem == 3){
        return 'Pré-affecté';
    } else if ($elem == 4){
        return 'Encaissement hors-périmètre';
    }
}


function ajoutDivClasse($elem,$class) {
    return '<div class="'+$class+'">'+$elem+'</div>';
}

function truncate($elem,$size) {
    var shortText = jQuery.trim($elem).substring(0, $size)
    .split(" ").slice(0, -1).join(" ") + "...";
    
    return shortText;
}

// Fonction permettant l'alignement centrer dans les tableaux
function alignCenter($elem, $align) {
    return '<div align="'+'center'+'">'+$elem+'</div>';
}

// Fonction permettant l'alignement à droite avec séparateur dans les tableaux
function alignRight($elem) {
    return '<div align="right">'+$elem+'</div>';
}

// Fonction permettant l'alignement à gauche avec séparateur dans les tableaux
function alignLeft($elem) {
    return '<div align="left">'+$elem+'</div>';
}
function formatNull ($elem,$remplacant) {
    if ($elem == null || $elem == 'null' || !$elem) {
        return $remplacant;
    } else {
        return $elem;
    }
}
// fonction qui remplace une valeur spécifique ($cond) de $elem par une autre ($new) 
function replaceValue($elem,$cond,$new) {
    if ($elem == $cond) {
        return $new;
    } else {
        return $elem;
    }   
}

// format une civilité (!! ici le code dépend des codes affectées aux civilités, doit être bouger au besoin )
function formatCivilite ($elem) {
    if ($elem == 0) {
        return 'Mr';
    } else {
        if ($elem == 1) {
            return 'Mme';
        }    else {
            return 'Mlle';
        }
    }
}


// fonction d'affichage des détails des emails en partant d'un attribut href
function getModalHref(obj) {
    
    displayUrl = obj.attr('href');
    
    $.post(
        displayUrl
    ).done(function(content){
        $(".modal-body").html(content);
        $('.modal').modal('show');
    });
    
    return false;
}


function formatInd(ind) {
    return '<span style="color:#428bca">'+ind+'</span>';
}

function getLanguageUrl() {
    if ($('#locale_layout').val() == 'en') {
        $languageUrl = oConstantes.baseUrl + "/js/jquery.dataTables/jquery.dataTables.en.json";
    } else {
        $languageUrl = oConstantes.baseUrl + "/js/jquery.dataTables/jquery.dataTables.fr.json"; 
    }
    
    return  $languageUrl;
}

$languageUrl = getLanguageUrl();

// format une date mysql au format français sans les heures/minutes/secondes
function formatDateMysql ($elem) {
    if (!$elem) return '-';
    $part = $elem.split(' ');
    $part_date = $part[0].split('-');
    return $part_date[2]+'/'+$part_date[1]+'/'+$part_date[0];
}

// format une date mysql au format français avec les heures/minutes/secondes
function formatDateTimeMysql ($elem) {
    if (!$elem) return '';
    $part = $elem.split(' ');
    $part_date = $part[0].split('-');
    return $part_date[2]+'/'+$part_date[1]+'/'+$part_date[0]+' '+$part[1];
}

// format une date mysql au format français avec les heures/minutes
function formatDateTimeMysqlNoSecond ($elem) {
    if (!$elem) return '';
    $part = $elem.split(' ');
    $part_date = $part[0].split('-');
    $horaires = $part[1].split(':');
    return $part_date[2]+'/'+$part_date[1]+'/'+$part_date[0]+' '+$horaires[0]+':'+$horaires[1];
}

function formatDateTimeOracleNoHour ($elem) {
    if (!$elem) return '';
    $part = $elem.split(' ');
    
    return $part[0];
}

// Fonction permettant l'alignement centrer dans les tableaux
function alignCenter($elem, $align) {
    return '<div align="'+'center'+'">'+$elem+'</div>';
}

// Fonction permettant d'afficher des séparateurs des milliers dans les tableaux
function formatDevise(num, thousands, decimal, symbolBefore, symbolAfter,symbolIfNull) {
    // definition d'un param par default
    if (num == 0) {
        return 0;
    }    
    symbolIfNull = (typeof symbolIfNull !== 'undefined') ? symbolIfNull : '0';
    // affichage si la valeur est nulle et non zero
    if (num == null) {
        return symbolIfNull
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) {
        num = symbolIfNull;
    }
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) {
        cents = "0" + cents;
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + thousands + num.substring(num.length - (4 * i + 3));
    }
    return ((sign) ? '' : '-') + symbolBefore + num /*+ decimal + cents*/ + symbolAfter;
}

// fonction permettant d'ajouter un séparateurs des milliers et de remplacer le séparateur décimal
function formatNombre(num, thousands, decimal) {
    if (num !== null && num !== '') {
        num = num.replace(/,/g, '.');
        num = num.replace(/[^\d.-]/g, '');
        var parts = num.split('.');
        nombre = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
        parts.splice(0,1);
        if (num.indexOf('.') !== -1) {
            nombre += decimal;
        }
        if (parts.length > 0) {
            var decimales = parts.join();
            decimales = decimales.replace(/\./g, '');
            decimales = decimales.slice(0,2);
            if (decimales.length > 0) {
                nombre += decimales;
            }
        }
        return nombre;
    }
    return null;
}

// fonction pour verifier qu'il s'agit d'un nombre qui est saisi et le formater
function verifNombre(elem) {
    if (elem.value !== null && elem.value !== '') {
        var start = elem.selectionStart, end = elem.selectionEnd;
        var oldSize = elem.value.length;
        elem.value = formatNombre(elem.value, ' ', ',', start);
        var diff = elem.value.length - oldSize;
        elem.setSelectionRange(start + diff, end + diff); // pour remettre le curseur à la bonne position quand des espaces on été ajoutés
    }
}

/**
 * Fonction d'affichage d'une popup de confirmation sur le onclick d'un lien
 * @param {type} $message
 * @returns {Boolean}
 */
function confirmLink($message) {
    if (window.confirm($message)) {
        return true;
    } else {
        return false;
    }
}

// soumet un formulaire, utile si on a un bouton button ou un formulaire caché a soumettre
function submitForm($nameForm) {
    $('[name='+$nameForm+']').submit(); 
}

function formatTypePersonne($elem) {
    
    if ($elem === 'P') { 
        return 'Personne physique'; 
    }
    if ($elem === 'M') { 
        return 'Personne Morale';
    } else {
        return '';
    }
    
}

function moveToId($id) {
    $('html, body').animate({
        scrollTop: $($id).offset().top
    }, 500);
}

function getPersonneByType($type,$nom,$prenom,$raisonSocialeTiers,$nccTiers) {
    
     if ($type === 'P') { 
         return $prenom+' '+$nom;
     }
     if ($type === 'M') { 
        return $raisonSocialeTiers+' '+$nccTiers;
    } else {
        return '';
    }
}

var mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre" ];

// $date est au format français
function periodeTaxe($date,$idTaxePeriodicite){
    
    if (!$date) {
        return '';
    }
    
    // pas d'appel ajax mais un doublon avec le helper PHP, a cause de soucis de performance. les historiques contiendront trop d'appels
    $aDate = $date.split('/'); 
    var $oDate = new Date($aDate[1]+'/'+$aDate[0]+'/'+$aDate[2]);

    switch($idTaxePeriodicite) {
        case '1':  // mensuel
        case '3':  // bi-annuel
//        case '7':  // tri-annuel    
            $periode = mois[$oDate.getMonth()]+' '+$oDate.getFullYear();
        break;    
        case '2':  // annuel
            $periode = $oDate.getFullYear();
        break;
        case '5':  //  mensuel/trimestriel en fonction du regime
//            if ($regime == 1) { // réel
                $periode = mois[$oDate.getMonth()]+' '+$oDate.getFullYear();
//            } else {
//                $periode = getTrimestre($oDate.getMonth()+1)+' '+$oDate.getFullYear();
//            }
        break;
        case '6':  //  30 jours apres signature
            //@todo A faire
        break;
        case '4':  // tri-annuel   
             $periode = getTrimestre($oDate.getMonth()+1)+' '+$oDate.getFullYear();
             $periode = 'trimestre '+($oDate.getMonth()+1)+' '+$oDate.getFullYear();
        break;
        case '7':
            $periode = 'tiers '+($oDate.getMonth()+1)+' '+$oDate.getFullYear();
        break;
        case '9':
            $periode = 'fraction '+($oDate.getMonth()+1)+' '+$oDate.getFullYear();
        break;
        case '11':
            $periode = 'période libre';
        break;
        default:
            $periode = 'N.A.';
            //@todo A voir
        break;
    }

    $periode = $periode.toString().charAt(0).toUpperCase() + $periode.toString().substr(1);

    return $periode;
   
}

function getTrimestre($mois) {

    if ($mois <=3 && $mois >0) {
        return 'TRIMESTRE 1';
    }
    if ($mois <=6 && $mois >3) {
        return 'TRIMESTRE 2';
    }
    if ($mois <=9 && $mois >6) {
        return 'TRIMESTRE 3';
    }
    if ($mois <=12 && $mois >9) {
        return 'TRIMESTRE 4';
    }

}

function getBiAnnuel($mois) {

    if ($mois <=6 && $mois >0) {
        return 'MOITIÉ ANNÉE 1';
    }
    if ($mois <=12 && $mois >6) {
        return 'MOITIÉ ANNÉE 1';
    }

}

function getTriAnnuel($mois) {

    if ($mois <=4 && $mois >0) {
        return 'TIERS 1';
    }
    if ($mois <=8 && $mois >4) {
        return 'TIERS 2';
    }
    if ($mois <=12 && $mois >8) {
        return 'TIERS 3';
    }

}

function zeroSiDifferenceNegative(valeur1,valeur2) {

    $valeur1 = myParseFloat(valeur1); //   bien que ormalement sur ce projet on ne devrait avoir que de l'entier
    $valeur2 = myParseFloat(valeur2);

    $soustraction = $valeur1 - $valeur2; 

    if ($soustraction <0 ) {
        return 0;
    } else {
        return $soustraction; 
    }

}

function myParseFloat($elem) {

    if ($elem) {
        $elem = String($elem);
        $number = $elem.replace(/ /g, "");
        return parseFloat($number);
    } else {
        return 0;
    }

}

function myParseInt($elem) {

    if ($elem) {
        $elem = String($elem);
        $number = $elem.replace(/ /g, "");
        return parseInt($number);
    } else {
        return 0;
    }

}

function translate(keyName, strict)
{
    strict = (strict !== undefined && strict === true ? true : false);

    var translation = (strict ? null : keyName);

    if (allTranslations === null)
    {
        $.ajax({
            url: (oConstantes.baseUrl + '/services/traduction/trad-file?file=all'),
            dataType: 'JSON',
            async: false
        }).done(function(data) {
            allTranslations = data;
        });
    }

    $.each(allTranslations, function(file, values) {
        $.each(values, function(key, value) {
            if (key == keyName)
                translation = value;
        });
    });

    return (translation);
}

// a mettre dans le parent
function intersection(arr1, arr2) {
   var results = [];
    for (var i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) !== -1) {
            results.push(arr1[i]);
        }
    }
    return results;
}

function duplicateEnsembleInputFile() {

        var $DuplicateElement_cpt=0;

    $('.duplicateEnsembleInputFile').click(function(){
        
        var $duplicateEnsemble_cpt = parseInt($("#numeroEnregistrement").val())+1;
        $DuplicateElement_cpt= $DuplicateElement_cpt+1;

        $composant = $(this).parents('.ensembleInputFile');
        
        
        $clone = $composant.clone().css('margin-top','0px').css('margin-bottom','0px');
        $clone.addClass("ensembleElementFacultatif").removeClass('ensembleInputFile');
        $clone.find('.duplicateEnsembleInputFile').remove();
        $clone.find('.title_orange').css('color','#957782').html('Élement supplémentaire similaire');



        $inputFile = $clone.find('.inputFile');

        //renommage de l'input file name
        $inputFile.attr('filename',$inputFile.attr('name')+'_ELEMENT_'+$DuplicateElement_cpt);
        
        //renommage de l'input name fichier
        $inputFile.attr('name',$inputFile.attr('name')+'_ELEMENT_'+$DuplicateElement_cpt);

      
        //vider l'input file
        $inputFile.val("");

        //renommage de l'input du commentaire
        $inputCommentaire = $clone.find('.inputCommentaire');
        $inputCommentaire.attr('name',$inputCommentaire.attr('name')+'_ELEMENT_'+$duplicateEnsemble_cpt);

        //renommage de l'input fichier type document
        $inputDocType = $clone.find('.inputDocType');
        $inputDocType.attr('name',$inputDocType.attr('name')+'_ELEMENT_'+$DuplicateElement_cpt);

        $duplicateEnsemble_cpt++;

        $composant.after($clone);

        return false;    
    });
}

function gestionTaxesDependance(elementName, selector, dependanceLinkName) {

    checkboxes = document.getElementsByName(elementName);

    for(i=0;i<checkboxes.length;i++) {
        if (checkboxes[i].hasAttribute(dependanceLinkName) ){
            $lien= checkboxes[i].getAttribute(dependanceLinkName);
            $id= checkboxes[i].getAttribute(selector);
                biToggle($id,$lien);
          }
    }
}

function biToggle(id1, id2) {
     $("#"+id1).change(function(){
           toggle(this, id2);
    });
     $("#"+id2).change(function(){
           toggle(this, id1);
    });
}

function toggle(source, $id) {
    checkbox = document.getElementById($id);
    checkbox.checked = source.checked;
}

function stringToNumber(str) {
    str = str.replace(/\s/g, '');
    return parseInt(str);
}

// @param : dtId = l'id de la table
function convertToDataTable(dtId) {

    $params = {
        sDom: "<'row '<'col-xs-6'l><'col-xs-6'f>r>" + "t" + "<'row'<'col-xs-12'pi>>",
        bLengthChange: false,
//        iDisplayLength: 10,
        bFilter: true,
        bSort: true,
        bPaginate: true,

       oLanguage: {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher :",
            "sLengthMenu":     "Afficher _MENU_ éléments",
            "sInfo":           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
            "sInfoEmpty":      "Affichage de l'élément 0 à 0 sur 0 élément",
            "sInfoFiltered":   "(filtré de _MAX_ éléments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun élément à afficher",
            "sEmptyTable":     "Aucune donnée disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Précédent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
            }
        }
    };

    if (typeof oTable == 'undefined') {
        oTable = $('#'+dtId).dataTable($params);
    } else {
        oTable.fnClearTable(0);
        oTable.fnDraw();
    }

}


function generatePdfWithCharts(idButton){
    $("#"+idButton).click(function (e){
        captureCharts(e);
    });
}

function captureCharts(e){
    var allCharts = AmCharts.charts;
    allCharts.forEach(function(chart) {
        var tmp = new AmCharts.AmExport(chart);
            tmp.init();
            tmp.output({
                output: 'datastring',
                format: 'jpg',
                dpi:'30',
            },function(blob) {

            var image = new Image();
            image.src = blob;

            var formData = new FormData();
            formData.append("imageChart", image.src);
            formData.append("imageChartName", chart.div.id);

            urlExport= oConstantes.baseUrl + '/services/admin-technique/capture-chart';

            $.ajax(urlExport, {
                method: "POST",
                data : formData,
                processData: false,
                contentType: false,
                success: function (content) {
                },
                error: function () {
                }
            });
            e.preventDefault();
        });
    });

    pdf_url =  oConstantes.baseUrl + '/services/admin-technique/export-pdf-chart';
    window.open(pdf_url, '_blank');

}

function pushDatatableParams($aoData,$params) {
    Object.keys($params).map(function(key) {
        if($params[key]){
             $aoData.push({
                "name":"pushed-param"+key, "value": $params[key]
            });
        }
    });    
    
    return $aoData;
}

function hideEmptyDataTable(content, dtId) {
    if(content['iTotalRecords'] == 0){
        $('#'+dtId).parent('div').html('<div> Aucune donnée à afficher </div>');
        $('#'+dtId).parent().hide();
    }
}


function formatDateOracleSansHoraire($elem) {
    if (!$elem) return '-';
    $part = $elem.split(' ');
    
    return $part[0];
}

function formatDateOracleNosecond($elem) {
    if (!$elem) return '-';
    $part = $elem.split(' ');
    $horaires = $part[1].split(':');
    return $part[0]+' '+$horaires[0]+':'+$horaires[1];
}

function formatDateOracleJJMMAAAA($elem){
    if (!$elem) return '-';
    $part = $elem.split(' ');
    $horaires = $part[1].split(':');
    return $part[0];   
}

function formatDateOracleJJMMAA($elem){
    if (!$elem) return '';
    $part = $elem.split(' ');
    $part_date = $part[0].split('/');
    $horaires = $part[1].split(':');
    return $part_date[0]+'/'+$part_date[1]+'/'+$part_date[2].substring(2,$part_date[2].length);
}

function formatDateOracleJJMMAAAAHMS($elem){
    if (!$elem) return '';
    $part_date = formatDateOracleJJMMAAAA($elem);
    $part = $elem.split(' ');
    $horaires = $part[1];
    return $part_date+' '+$horaires;
}

function formatDateOracleJJMMAAAAHM($elem){
    if (!$elem) return '';
    $part_date = formatDateOracleJJMMAAAA($elem);
    $part = $elem.split(' ');
    $horaires = $part[1].split(':');
    return $part_date+' '+$horaires[0]+':'+$horaires[1];
}

function formatDateOracleJJMMAAHMS($elem){
    if (!$elem) return '';
    $part_date = formatDateOracleJJMMAA($elem);
    $part = $elem.split(' ');
    $horaires = $part[1];
    return $part_date+' '+$horaires;
}

function formatDateOracleJJMMAAHM($elem){
    if (!$elem) return '';
    $part_date = formatDateOracleJJMMAA($elem);
    $part = $elem.split(' ');
    $horaires = $part[1].split(':');
    return $part_date+' '+$horaires[0]+':'+$horaires[1];
}

/**
 * cette fonction permet de controler la longueur maximum d'un champ
 * en affichant nombre de caractères restants à saisir
 * 
 * @param {string} id : id de l'element 
 * @param {int} maxLength : nombre de caractères autorisés
 * 
 * @returns {void}
 */
function controlMaxLength(id, maxLength) {
    // definition de l'attribut maxlength
     $('#'+id).attr('maxlength', maxLength);
     var formattedMaxLength = formatNumeric(maxLength, ' ', ',', '', '');
    // ajout du nombre caractères restants derriére le champs à controler
    $('#'+id).parent('div').append( "<p id="+id+"-counter class='max-length-counter'>"+formattedMaxLength+" caractères restants.</p>" );
    
    $('#'+id+'-counter').html(formatNumeric(maxLength - $('#'+id).val().length, ' ', ',', '', '')+" caractères restants.</p>");
    $('#'+id).keyup(function (e) {
        var max = maxLength;
        var val = $(this).val();
        var len = val.length;
        // new lines count as 2 chars
        var newLines = (val.match(/[\n\r]/g) || []).length;
        var char = max - len - newLines;
        while (len + newLines > maxLength) {
            if (val[len-1] === '\r') {
                val = val.substr(0, len-2);
            } else {
                val = val.substr(0, len-1);
            }
            len = val.length;
            newLines = (val.match(/[\n\r]/g) || []).length;
            char = 0;
        }
        var formattedChar = formatNumeric(char, ' ', ',', '', '');
        $('#'+id+'-counter').html(formattedChar +" caractères restants.</p>");
        $(this).val(val);
    });
}

// Fonction permettant d'afficher des séparateurs des milliers
function formatNumeric(num, thousands, decimal, symbolBefore, symbolAfter,symbolIfNull) {
    // definition d'un param par default
    if (num == 0) {
        return 0;
    }    
    symbolIfNull = (typeof symbolIfNull !== 'undefined') ? symbolIfNull : '0';
    // affichage si la valeur est nulle et non zero
    if (num == null) {
        return symbolIfNull
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) {
        num = symbolIfNull;
    }
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) {
        cents = "0" + cents;
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + thousands + num.substring(num.length - (4 * i + 3));
    }
    return ((sign) ? '' : '-') + symbolBefore + num /*+ decimal + cents*/ + symbolAfter;
}

/**
 * 
 * @param {type} $icon
 * @returns {undefined}
 */
function chevronToggle($icon){
    if($icon.hasClass('filtre-ouvert')) {
        $icon.removeClass('filtre-ouvert').addClass('filtre-ferme');
    }else{
        $icon.removeClass('filtre-ferme').addClass('filtre-ouvert');
    }
}

/**
 * fonction permet d'ouvrir la popup d'attente
 * @returns 
 */
function openBusyScreen(e){
   
    $.busyLoadFull("show",{ 
        maxSize: "50px",
        minSize: "50px",
        image: oConstantes.baseUrl+"/img/icone.png",
    });

}

/**
 * fonction permet d'ouvrir la popup d'attente avec message
 * @returns 
 */
function openBusyScreenUI(e){
    $.blockUI({ message: '<h1>Merci de patienter ... </h1>' });
}

/**
 * fonction permet de fermer la popup d'attente
 * @returns 
 */
function closeBusyScreen(){
    $.busyLoadFull("hide");
}
/**
 * fonction permet de fermer la popup d'attente avec message
 * @returns 
 */
function closeBusyScreenUI(){
    $.unblockUI();
}

/**
 * fonction permet de fermer le bloc filtre si click en dehors du filtre
 * @returns {undefined}
 */
function clickOutsideFiltreClosing(){
    $(document).click(function(event) { 
        
        if(!$(event.target).closest('#collapse-filtre-container').length) {
            $chevron_control = $('#collapse-filtre-container').find('#chevron-control');
            $chevron_class = $chevron_control.attr('class');
            
            if($chevron_class =="filtre-ferme"){
                $chevron_control.click();
            }
        }        
    });
}

function getClasseStatutLiasse(idStatut) {
    switch (idStatut) {
        case '1':
            return 'saisie';
        case '6':
            return 'a-attester';
        case '7':
            return 'a-transmettre';
        case '2':
            return 'transmis';
        default:
            return 'a-declarer';
    }
}

function getClasseStatutTableauLiasse(idStatut) {
    switch (idStatut) {
        case 'E':
            return 'erreur-non-bloquant';
        case 'X':
            return 'erreur-bloquant';
        case 'B':
            return 'brouillon';
        case 'V':
            return 'valide';
        case 'A':
            return 'atteste';
        default:
            return 'non-demarre';
    }
}

function switchMulticompte() {
    $('#multicompte-container').toggle();
}
function fermeMulticompte() {
    $('#multicompte-container').hide();
}

function getDateJJMMAAAA_HHIISS() {
    return (new Date()).toISOString().slice(0,19).replace(/-/g,'').replace(/_/g,'').replace('T','_');
}