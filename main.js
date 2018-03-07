'use strict';

/////////////////////////////////////////////////////////////////////////////////////////
// FONCTIONS                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////

    function GetChapter(data){
        if (data != '') {
            for(var index = 0; index < data.length; index++){
                var balise = $('<balise>');
                var h3 = $('<h3>');
                var p = $('<p>');
                var div1 = $('<div>');
                var div2 = $('<div>');
                var a = $('<a>');
                var li = $('<li>');

                a.attr("href","#chapter"+data[index].id);
                a.attr("class","link");
                li.text("chapitre "+data[index].chapter_number);
                a.append(li);
                $('#link-list').append(a);

                div1.attr("class","slide");
                balise.attr("id","chapter"+data[index].id);
                h3.text(data[index].chapter_number+". "+data[index].titre);
                p.text(data[index].contenu);
                div2.append(h3).append(p);
                balise.append(div1);
                balise.append(div2);
                $('#chapter-list').append(balise);
            }
            offset -= 5;
            $(window).data('ajaxready', true);
        }
    }

    function FirstLoad(data){
        offset = data[0].id;
        GetChapter(data);
    }

    function showMenu() {
        faside.classList.toggle("slide-menu");
        haside.classList.toggle("slide-menu");
        burgercolor.classList.toggle("burger-color");
    }



/////////////////////////////////////////////////////////////////////////////////////////
// CODE PRINCIPAL                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////

var offset = 0;

$(window).data('ajaxready', true);

var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/);

$.getJSON('http://shaptr.damorax.fr/index.php/load', FirstLoad);

$(window).scroll(function() {

    if ($(window).data('ajaxready') == false) return;

    if(($(window).scrollTop() + $(window).height()) == $(document).height()
        || agentID && ($(window).scrollTop() + $(window).height()) + 150 > $(document).height()) {
        $(window).data('ajaxready', false);
        $.getJSON('http://shaptr.damorax.fr/index.php/chapter?offset=' + offset, GetChapter);
    }
});

var faside = document.querySelector('.faside');
var haside = document.querySelector('.haside');
var burgercolor = document.querySelector('#burger');
var menuBurger = $('#burger');
menuBurger.on('click', showMenu);

