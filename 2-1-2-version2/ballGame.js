let simpleAnimation = document.querySelector('.buttonAreaSimple');
simpleAnimation.addEventListener('click', function (clickedElem) {
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
    let allAudios = document.querySelectorAll('audio');
    let windAudio = document.querySelector('audio#wind');
    let ballAudio = document.querySelector('audio#bounce');

    function ballBounceSound() {
        ballAudio.play();
        ballAudio.volume = .3;
    };
    // stop and reset all audio, so even click back this button, audio won't just resume
    function stopOtherAudio() {
        allAudios.forEach(function (playing) {
            playing.pause();
            playing.currentTime = 0;
            playing.loop = false;
        });
    };
    if (clicked !== "") { //remove the possibility to stop animation when user click anywhere on the page
        stopOtherAudio();
        let movement = clickedElem.target.id;
        ball.className = movement;
        background.className = ("scene");
        shadow.className = ("shadow");
        wind.className = ("wind");

        if (movement == "moveFrom30") {
            stopOtherAudio();
            windAudio.play();
            wind.className = ("wind wind" + movement);
        } else if (movement == "oneJump") {
            stopOtherAudio();
            shadow.className = ("shadow shadow" + movement);
            setTimeout(ballBounceSound, 870);
            ballBounceSound;
            ballAudio.loop = false; // in case JUMP has set loop to true
        } else if (movement == "jump") {
            stopOtherAudio();
            shadow.className = ("shadow shadow" + movement);
            setTimeout(ballBounceSound, 500);
            ballAudio.playbackRate = 1.37;
            ballAudio.loop = true;
        } else if (movement == "fade" || movement == "glow"){
            background.className = ("scene bg" + movement);
        }
    }
})
