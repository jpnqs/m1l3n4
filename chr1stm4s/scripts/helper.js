const helperId = 'santas-little-helper';
const helperMsgId = 'santas-little-helpers-message';

function showHelper() {

    var oBtn = $('<div id="' + helperId + '"><span class="material-icons" style="font-size: 60pt">help_outline</span></div>');

    oBtn.css({
        'position': 'absolute',
        'right': '2rem',
        'top': '2rem',
        'font-size': '80pt',
        'color': 'white',
        'background-color': 'rgba(0,0,0,0)',
        'border': 'none',
        'opacity': 0,
        'z-index': 100,
        'text-align': 'center'
    });

    oBtn.on('click', function() {
        hideHelper();
        showHelperMessage();
    });

    $(document.body).append(oBtn);

    oBtn.animate({
        'opacity': 1
    }, 'slow');

}

function hideHelper() {

    var oBtn = $('#'+helperId);

    oBtn.animate({
        'opacity': 0
    }, 'slow', function() {
        oBtn.remove();
    });

}

function showHelperMessage() {

    var oPlane = $('<div id="santas-little-helpers-message"><div id="help-msg-container">Per wisch nach links/rechts umblättern :D</div></div>');

    oPlane.css({
        'background-color': 'rgba(0,0,0,0.5)',
        'position': 'absolute',
        'height': '100%',
        'width': '100%',
        'top': '0',
        'left': '0',
        'color': 'white',
        'opacity': 0,
        'font-family': 'Comic Neue',
        'z-index': 100
    });

    oPlane.on('touchstart', function() {
        hideHelperMessage();
    });

    $(document.body).append(oPlane);

    oPlane.animate({
        'opacity': 1
    }, 'slow');


}

function hideHelperMessage() {

    var oPlane = $('#santas-little-helpers-message');

    oPlane.animate({
        'opacity': 0
    }, 'slow', function() {
        oPlane.remove();
    });

}