let it = '❄️'; // 😉

const spawnTime = 500;
var spawnerId = '';

const sfSize = {
    large: 2,
    medium: 1,
    small: 0
};

const sfDuration = {
    [sfSize.large]: 12000, // 11000,
    [sfSize.medium]: 14000, // 13000,
    [sfSize.small]: 16000 // 15000
};

const sfClasses = {
    [sfSize.large]: 'sf-large',
    [sfSize.medium]: 'sf-medium',
    [sfSize.small]: 'sf-small'
};

const snowflakeBase = [
    '❅',
    '❅',
    '❅',
    '❆'
];

function sf(size) {

    var flake = $(`<div sf sf-size="${size}">${snowflakeBase[Math.floor(Math.random()*snowflakeBase.length)]}</div>`);

    var sizeClass = sfClasses[size];

    flake.addClass('sf');
    flake.addClass(sizeClass);

    var flakeWrapper = $(`<div sf class="sf-wrapper"/>`);

    flakeWrapper.append(flake);

    return flakeWrapper;

}

function animateSf(sf, parent) {

    var size = sf.children().attr('sf-size');

    sf.appendTo(parent);

    var width = parent.innerWidth();
    var height = parent.innerHeight() + 50;
    
    var x = Math.floor(Math.random() * (width - 10 + 1)) + 10

    sf.css({
        left: `${x}px`,
        top: '-300px'
    });

    var duration = sfDuration[size];

    sf.animate({
        top: `${height}px`,
    }, duration, function() {
        sf.remove();
    });

    setTimeout(() => {
        sf.children().fadeOut(1500);
    }, duration * 0.65);

    sf.addClass(`snowflake-${Math.floor(Math.random() * 5)}`);

}

function letItSnow() {
    if (spawnerId) {
        clearInterval(spawnerId);
    }
    var parent = $('#snow');
    spawnerId = setInterval(() => {
        var size = Math.floor(Math.random() * 3);
        animateSf(sf(size), parent);
    }, spawnTime);
}

function stopTheSnow() {
    clearInterval(spawnerId);
    spawnerId = '';
    $('[sf]', $('#snow')).remove();
}