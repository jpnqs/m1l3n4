/**
 * The main setup script for the whole christmas card
 * @author Jonas Grümpel
 */

var navUn = false;

document.title = 'Merry Christmas Milena! 🎄';

responsiveDesign.then(() => {

    var oPageManager = setupPageManager();
    applyInputControl(oPageManager);

    oPageManager.openHash();

    setTimeout(function() {
        q(!navUn, showSwipeHint);
        setTimeout(function() {
            q(!navUn, showHelper);
        }, 5000);
    }, 10000);

});

/**
 * Setup the paga manager and bind it to its event handlers
 * @returns {PageManager} binded page manager
 */
function setupPageManager() {

    var oPageManager = new PageManager();

    oPageManager.onPageOpen('', function(oPage, oPageManager) {
        hideSwipeHint();
        navUn = true;
    });

    oPageManager.onPageOpen('merry-xmas', function(oPage, oPageManager) {

    });

    window.oPageManager = oPageManager;

    return oPageManager;

}

/**
 * Apply input controls for input handling for 
 * smartphones on the christmas card
 * @param {PageManager} oPageManager binded page manager
 * @returns {void}
 */
function applyInputControl(oPageManager) {

    var oInput = new TouchInput();

    oInput.onSwipe((sDir) => {
        if (sDir == TouchInput.LEFT) {
            oPageManager.next();
        } else if (sDir == TouchInput.RIGHT) {
            oPageManager.previous();
        }
    });

    oInput.render();

}