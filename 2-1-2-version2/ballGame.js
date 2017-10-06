document.addEventListener('click', function(clickedElem){
    let clicked = clickedElem.target.id;
    let ball = document.querySelector('#ball');
    let ball2 = document.querySelector('#ball2');
    let ball2Vertical = ball2.parentElement;
    let ball2Horizontal = ball2Vertical.parentElement;
    let ball3 = document.querySelector('#ball3');
    let background = document.querySelector('.scene');
    let shadow = document.querySelector('.shadow');
    let wind = document.querySelector('.wind');
    let blood = document.querySelector('.blood');
    //different animation
    if ( clicked !== ""){
        let movement = clickedElem.target.id;
        ball.className = movement;
        ball2Vertical.className = ("ball2Vertical" + movement);
        ball2Horizontal.className = ("ball2Horizontal" + movement);
        background.className = ("scene bg" + movement); shadow.className = ("shadow shadow" + movement);
        wind.className = ("wind"); // need this to reset wind to original state, otherwise won't be fired when click moveFrom30 then something new then click moveFrom30 again
        if (ball.className == "moveFrom30"){
            let windAudio = document.querySelector('audio#wind');
            windAudio.play();
            windAudio.volume = .7;
            let movement = clickedElem.target.id;
            ball.className = movement;
            wind.className = ("wind wind" + movement);
            shadow.className = ("shadow");
        }
    }
});
