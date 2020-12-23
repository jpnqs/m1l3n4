/**
 * Automatically formats the screen for responsive design on smartphones (isn't that cool? :D)
 * @author Jonas Grümpel
 */

var responsiveDesign = new $.Deferred();

(function() {
    var responsive = new $.Deferred();

    window.addEventListener('load', makeReponsive);
    window.addEventListener('resize', makeReponsive);

    function makeReponsive() {
        var objs = $('.responsible-obj');
        var width = objs.width();
        objs.css('height', width * 1.5);
        if (responsive.state() == 'pending') {
            setTimeout(() => {
                $('#card').css('opacity', 1)
            }, 1000);
            responsive.resolve();
        }
        stopTheSnow();
        letItSnow();
    }

    responsive.then(responsiveDesign.resolve);
    
})();