/**
 * Jonas-typisch muss alles reusable sein (der typ muss autismus oder so haben)
 * deswegen, feel free es wieder zu verwenden und etwas eigenes daraus zu machen :)
 * @license MIT
 */
const text = $("#text");
const body = $("#body");
const image = $("#image");
const i = $("#i");

/**
 * Presenter für alles was mit der anzeige der nachrichten und den übergängen, bildern
 * und allem anderen zu tun hat (das Herz dieser Seite :))
 */
const Presenter = {

    lastPanelImage: false,

    /**
     * Dummy laden von bildern, damit diese sich im browser cache
     * befinden und beim zweiten mal laden schneller verfübgar sind
     * @param {Array<String>} arr URLs zu den Bildern
     * @static
     */
    dummyLoad: (arr) => {
        Presenter.dummyLoad.images = [];
        arr.forEach(url => {
            let dummy = new Image()
            dummy.src = url;
            Presenter.dummyLoad.images.push(dummy);
        });
    },

    image: async ({url, duration}) => {
        Presenter.lastPanelImage = true;
        return new Promise(async resolve => {
            text.animate({
                fontSize: "4rem",
                opacity:"0"
            })
            body.animate({
                backgroundColor: "#ffffff"
            }, 200)
            i.prop("src", url);
            i.on("load",async () => {
                image.animate({
                    opacity: "1"
                }, 400,async _ => {
                    await wait(duration);
                    image.animate({
                        opacity: "0"
                    }, 400, resolve);
                })
            });
        });
    },

    /**
     * Ändern der hintegrund farbe
     * @static
     */
    background: async (color) => {
        return new Promise(resolve => {
            body.animate({
                backgroundColor: color
            }, 200, resolve)
        });
    },

    /**
     * Beenden des präsentations durchlaufs. Zeigt am ende 
     * auch den repeat button an
     * @static
     */
    end: async () => {
        // heart
        text.animate({
            fontSize: "4rem",
            opacity:"0"
        })
        body.animate({
            backgroundColor: "#ffffff"
        }, 200)
        body.animate({
            backgroundColor: "#ffffff"
        }, 400)
        text.html("<span class=\"emoji\">❤️</span>")
        .animate({
            fontSize: "5rem",
            opacity: "1"
        }, 300)
        .animate({
            fontSize:"4.8rem"
        }, 200);
        await wait(2500);
        text.animate({
            fontSize: "4rem",
            opacity:"0"
        })
        body.animate({
            backgroundColor: "#ffffff"
        }, 200)
        await wait(500);
        button.prop("disabled", false);
        button.animate({
            opacity: 1
        }, 400);
    },

    /**
     * Anzeigen von neuem text
     * setze: 
     * - angezeigte nachricht (content)
     * - die hintegrundfarbe (color)
     * - und die anzeige dauer in millisekunden (duration)
     * @param {Object} {content, color, duration}
     * @static
     */
    text: async ({content, color, duration}) => {
        Presenter.lastPanelImage = false;
        return new Promise(resolve => {
            // neue zeile mit <br> für html ersetzen
            content = content.replace(/\n/g, "<br>");

            // text zu standard css werten setzen
            // (kleiner als der spätere text für coolen zoom effekt :))
            text.css({
                fontSize: "4rem",
                opacity:"0"
            })
            // setze den neuen text der angezeigt werden soll!
            .html(content)

            let end = async _ => {
                // animiere den hintegrund zur mitgegebenen farbe
                body.animate({
                    backgroundColor: color
                }, 400)
                // kleiner delay das die schrift nicht gleich mit kommt
                await wait(250)
                // animiere das einfaden des textes (mit coolem plop effekt am ende)
                text.animate({
                    fontSize: "5rem",
                    opacity: "1"
                }, 300)
                .animate({
                    fontSize:"4.8rem"
                }, 200, 
                async _ => {
                    // warte die angegebene zeit, damit die 
                    // Nachricht auch gelesen werden kann...
                    await wait(duration);

                    // lass die nachricht wieder mit einer 
                    // coolen weißblende verschwinden!
                    text.animate({
                        fontSize: "4rem",
                        opacity:"0"
                    }, resolve);
                });

            }

            if (!Presenter.lastPanelImage) {
                // animiere den hintegrund zu weiß (für coolen white-fade effekt :))
                body.animate({
                    backgroundColor: "#ffffff"
                }, 200, end)
            } else {
                end();
            }

        });
    },

    wait: (ms) => {
        return new Promise(resolve => {
            setTimeout(_ => {
                resolve();
            }, ms);
        });
    },

    /**
     * Sammlung aller screen effekte
     */
    Effects: {}

}

/**
 * Regen effekt
 */
Presenter.Effects.Rain = {
    /**
     * Flag das anzeigt ob es gerade
     * regnet oder nicht
     */
    isRaining: false,

    drop: () => {

        let x = Math.floor(Math.random() * window.innerWidth)
    
        let cl = "drop" + Math.floor(Math.random() * 5);
        let speed = cl == "drop2" ? 2000 : cl == "drop1" ? 1000 : 500;
    
        // create rain drop
        let drop = $(`
            <div class="drop ${cl}"></div>
        `)
        
        drop.css({
            top: "0px",
            left: x + "px"
        })
        drop.appendTo(body);
    
        drop.animate({
            top: window.innerHeight + "px"
        }, speed, 'linear',function () {
            this.remove();
        }.bind(drop))
    
    },

    rain: async () => {
        if (!Presenter.Effects.Rain.isRaining) return;
        let x = Math.floor(Math.random() * 50) + 100;
        await wait(x);
        Presenter.Effects.Rain.drop();           
        Presenter.Effects.Rain.rain();
    },

    removeAllDrops: () => {
        let drops = document.getElementsByClassName("drop");
        for (let i=0;i <drops.length; i++) {
            let drop = drops[i];
            drop.classList.add("dropInvisible");
        }
    },

    start: () => {
        let rain = Presenter.Effects.Rain;
        rain.isRaining = true;
        rain.rain();
    },

    end: () => {
        let rain = Presenter.Effects.Rain;
        rain.isRaining = false;
        rain.removeAllDrops();
    }
    
}

/**
 * Sonnenschein effekt
 */
Presenter.Effects.Sun = {

    sunElement: $("#sun"),

    show: async _ => {
        await wait(500);
        Presenter.Effects.Sun.sunElement
        .css({
            display: "block"
        })
        .animate({
            opacity: "0.9"
        }, 400)
    },

    hide: _ => 
        Presenter.Effects.Sun.sunElement
        .animate({
            opacity: "0"
        }, 400, () => {
            Presenter.Effects.Sun.sunElement
            .css({
                display: "none"
            })
        })

}

Object.freeze(Presenter);