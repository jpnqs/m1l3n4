/**
 * Touch screen input
 */
class TouchInput {
    
    constructor() {
        this.oContainer = $(document.body);
        this.sSwipeDir;
        this.nStartX;
        this.nStartY;
        this.nDistX;
        this.nDistY;
        this.nThreshold = 150;
        this.nRestraint = 100;
        this.nAllowedTime = 300;
        this.nElapsedTime;
        this.nStartTime;
        this.fnSwipeHandler = function(){};
    }

    onSwipe(fnHandler) {

        this.fnSwipeHandler = fnHandler;

    }

    render() {

        var oOverlay = $('<div>', {
            class: 'shadow'
        });

        oOverlay.on('touchstart', oEvent => {
            var oTouch = oEvent.changedTouches[0];
            this.sSwipeDir = 'none';
            this.nStartX = oTouch.pageX;
            this.nStartY = oTouch.pageY;
            this.nStartTime = new Date().getTime() ;
            oEvent.preventDefault();
    
        });

        oOverlay.on('touchmove', oEvent => {
            oEvent.preventDefault();
        });

        oOverlay.on('touchend', oEvent => {
            var oTouch = oEvent.changedTouches[0]
            this.nDistX = oTouch.pageX - this.nStartX 
            this.nDistY = oTouch.pageY - this.nStartY 
            this.nElapsedTime = new Date().getTime() - this.nStartTime 
            if (this.nElapsedTime <= this.nAllowedTime){ 
                if (Math.abs(this.nDistX) >= this.nThreshold && Math.abs(this.nDistY) <= this.nRestraint){
                    this.sSwipeDir = (this.nDistX < 0)? 'left' : 'right' 
                }
                else if (Math.abs(this.nDistY) >= this.nThreshold && Math.abs(this.nDistX) <= this.nRestraint){ 
                    this.sSwipeDir = (this.nDistY < 0)? 'up' : 'down'
                }
            }

            if (this.sSwipeDir && this.sSwipeDir != 'none') {
                this.fnSwipeHandler(this.sSwipeDir)
            }
            
            oEvent.preventDefault()
    
        });

        
        oOverlay.appendTo(this.oContainer);

    }

}

TouchInput.LEFT  = 'left';
TouchInput.RIGHT = 'right';
TouchInput.UP    = 'up';
TouchInput.DOWN  = 'down';
