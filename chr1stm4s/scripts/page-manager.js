/**
 * The page manager is used for all interactions with the christmas card, like swiping and those stuff 
 * @author Jonas Grümpel
 */

/**
 * Manages the pages of the christmas card
 * @property {jQuery[]} oPages
 * @property {number} nPageCount
 * @property {jQuery} oActivePage
 * @property {number} nActivePage
 * @property {object} oPageOpenListener
 * @property {object} oPageCloseListener
 * @property {object} oPageShowCount
 * @property {number} nZIndex 
 */
class PageManager {

    /**
     * Page Manager
     * @public
     */
    constructor() {
        this.oPages = $('[page-id]');
        var aTemp = [];
        for (var i=this.oPages.length - 1; i>=0; i--) {
            aTemp.push(this.oPages[i]);
        }
        this.oPages = $(aTemp);
        this.nPageCount = this.oPages.length;
        this.nActivePage = 0;
        this.oActivePage = $(this.oPages[this.nActivePage]);
        this.sActivePageId = 'cover';
        this.oPageOpenListener = {
            '': function() {}
        };
        this.oPageCloseListener = {
            '': function() {}
        };
        this.oPageShowCount = {};
        this.nZIndex = 5;
    }

    /**
     * Open page by its id string
     * @param {string} sId page id
     * @returns {void}
     * @private
     */
    _openPageById(sId) {
        $(`[page-id="${sId}"]`).css('transform', 'rotateY(-150deg)');
    }

    /**
     * Close page by its id string
     * @param {string} sId page id
     * @returns {void}
     * @private
     */
    _closePageById(sId) {
        $(`[page-id="${sId}"]`).css('transform', 'rotateY(0deg)');
    }

    /**
     * Calculate next z-index
     * @returns {number} z-index
     * @private
     */
    _nextZIndex() {
        this.nZIndex++;
        return this.nZIndex;
    }

    /**
     * Add up counter when a page is shown
     * for statistics to improve usability
     * @param {string} sId page id
     * @returns {void}
     * @private
     */
    _pageShown(sId) {
        sId = sId || 'polaroid';
        window.location.hash = sId;
        if (!this.oPageShowCount[sId]) {
            this.oPageShowCount[sId] = 0;
        }
        this.oPageShowCount[sId] += 1;   
    }

    /**
     * Open next page 
     * @returns {void}
     * @public
     */
    next() {
        if ((this.nActivePage + 1) <= this.nPageCount) {

            this.nActivePage++;

            this.oActivePage.attr('page-open', true);

            this.oActivePage.parent().css('z-index', this._nextZIndex());
            if (this.nZIndex > 1000) {
                this.nZIndex = 5;
            }

            $('.flipable-site-front', this.oActivePage).css('z-index', this._nextZIndex());
            
            setTimeout(() => {
                $('.flipable-site-back', this.oActivePage).css('z-index', this._nextZIndex());
            }, 750);

            var sId = this.oActivePage.attr('page-id');

            this._openPageById(sId);

            var oCurrentPage = $(this.oPages[this.nActivePage]);

            this.oPageOpenListener[''](oCurrentPage);

            var sOpenId = oCurrentPage.attr('page-id');

            this._pageShown(sOpenId);
            this.sActivePageId = sOpenId;

            // try to call event handler
            var fnHandler = this.oPageOpenListener[sOpenId];
            if (fnHandler) {
                fnHandler(oCurrentPage, this);
            }

            this.oActivePage = oCurrentPage;

        }
    }

    /**
     * Open previous page
     * @returns {void}
     * @public
     */
    previous() {
        if ((this.nActivePage - 1) >= 0) {

            this.nActivePage--;

            this.oActivePage.attr('page-open', false);

            this.oActivePage.parent().css('z-index', '');

            $('.flipable-site-back', this.oActivePage).css('z-index', '');
            $('.flipable-site-front', this.oActivePage).css('z-index', '');

            this.oActivePage = $(this.oPages[this.nActivePage]);

            var sId = this.oActivePage.attr('page-id');

            this._closePageById(sId);
            this._pageShown(sId);
            this.sActivePageId = sId;

        }
    }

    /**
     * Add event handler for an opened page
     * @param {string} sId page id
     * @param {function} fnHandler handler function
     * @returns {void}
     * @public
     */
    onPageOpen(sId, fnHandler) {
        if (typeof fnHandler != 'function') {
            throw new TypeError();
        }
        this.oPageOpenListener[sId] = fnHandler;
    }

    /**
     * Add event handler for an closed page
     * @param {string} sId page id
     * @param {function} fnHandler handler function
     * @returns {void}
     * @public
     */
    onPageClose(sId, fnHandler) {
        if (typeof fnHandler != 'function') {
            throw new TypeError();
        }
        this.oPageCloseListener[sId] = fnHandler;
    }

    /**
     * Get show count of page
     * @param {string} sId page id
     * @returns {number} count
     * @public
     */
    getShowCount(sId) {
        if (!this.oPageShowCount[sId]) {
            this.oPageShowCount[sId] = 0;
        }
        return this.oPageShowCount[sId];
    }

    /**
     * Get current shown id 
     * @returns {string} page id
     * @public
     * @see PageManager.oActivePage
     */
    getCurrentId() {
        return this.oActivePage.attr('page-id');
    }

    /**
     * Open the current hash routing
     * @returns {void}
     * @public
     */
    openHash() {

        var sHash = window.location.hash.replace(/^\#/, '').trim();
        var nTry = 0;

        if (sHash == '') {
            return;
        }

        var fnNext = () => {
            nTry++;
            if (!(this.sActivePageId == sHash)) {
                this.next();
                setTimeout(() => {
                    if (nTry < this.oPages.length) {
                        fnNext();
                    }
                }, 500);
            }
        };

        fnNext();

    }

}