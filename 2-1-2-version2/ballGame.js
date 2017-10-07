document.querySelector('.unfinished').addEventListener('click', toggleNoteArea);

function toggleNoteArea() {
    document.querySelector('.unfinished').classList.toggle('clicked');
}
//use "overwrite class" approach to switch between simple animations, no add/remove class or toggle, no need to refresh page. other approaches see below.
let simpleAnimation = document.querySelector('.buttonAreaSimple');
simpleAnimation.addEventListener('click', function (clickedElem) {
    let clicked = clickedElem.target.id;
    let ball = document.querySelector('#ball');
    let fakeBallPositionH = document.querySelector('.fakeBallWrapper');
    let background = document.querySelector('.scene');
    let shadow = document.querySelector('.shadow');
    let wind = document.querySelector('.wind');
    let blood = document.querySelector('.blood');
    let allAudios = document.querySelectorAll('audio');
    let chuAudio = document.querySelector('audio#chu');
    let fallAudio = document.querySelector('audio#fall');
    let windAudio = document.querySelector('audio#wind');
    let ballAudio = document.querySelector('audio#bounce');
    let volumeOn = document.querySelector('#volumeOn');
    let volumeOff = document.querySelector('#volumeOff');
    // *********** some reusable functions *********** //
    // reset fakeBall
    function resetFakeBall() {
        fakeBallPositionH.style = "left: -7vw";
    }
    // show/hide volume icon and toggle, call only when animation has sound
    function toggleVolume() {
        volumeOn.style.display = "block";
        volumeOn.addEventListener('click', toggleVolumeOff);

        function toggleVolumeOff() {
            volumeOn.style.display = "none";
            volumeOff.style.display = "block";
            allAudios.forEach(function (playing) {
                playing.muted = true;
            });
        }
        volumeOff.addEventListener('click', toggleVolumeOn);

        function toggleVolumeOn() {
            volumeOn.style.display = "block";
            volumeOff.style.display = "none";
            allAudios.forEach(function (playing) {
                playing.muted = false;
            });
        }
    }
    // stop and reset all audio, so won't disturb the new one and so when click back this button, audio won't just resume.
    function stopOtherAudio() {
        allAudios.forEach(function (playing) {
            playing.pause();
            playing.currentTime = 0;
            playing.loop = false;
        });
    };
    // ball bounce sound
    function ballBounceSound() {
        ballAudio.play();
        ballAudio.volume = .3;
    };
    // ball fall
    function ballFall() {
        fallAudio.play();
        fallAudio.volume = .7;
        fallAudio.playbackRate = 1.07;
    }
    // *********** animations ***********//
    if (clicked !== "") { //remove the possibility to stop animation when user click anywhere on the page, like sound control, position control etc
        resetFakeBall();
        stopOtherAudio();
        let movement = clickedElem.target.id;
        background.className = ("scene");
        shadow.className = ("shadow");
        wind.className = ("wind");
        if (movement !== "fallDown") {
            ball.className = movement;
            if (movement == "moveTo30") {
                toggleVolume();
                chuAudio.play();
            } else if (movement == "moveFrom30") {
                toggleVolume();
                windAudio.play();
                wind.className = ("wind wind" + movement);
            } else if (movement == "oneJump") {
                toggleVolume();
                shadow.className = ("shadow shadow" + movement);
                setTimeout(ballBounceSound, 870);
            } else if (movement == "jump") {
                toggleVolume();
                shadow.className = ("shadow shadow" + movement);
                setTimeout(ballBounceSound, 500);
                ballAudio.playbackRate = 1.37;
                ballAudio.loop = true;
            } else if (movement == "fade" || movement == "glow") {
                resetFakeBall();
                background.className = ("scene bg" + movement);
            } else if (movement == "mirror") {
                chuAudio.play();
                chuAudio.playbackRate = 1.05;
                fakeBallPositionH.style = "left: 23vw";
            }
        } else if (movement == "fallDown"){ //single this out, cuz need to have tha ball on stage, then fire gun, then wait, then start original animation
            ball.className = "onStage";
            toggleVolume();
            document.querySelector('#shot').play();
            document.querySelector('#shot').volume = .2;
            document.querySelector('#shot').addEventListener('ended', startAnimation);
            function startAnimation() {
                ball.className = movement;
                setTimeout(ballFall, 200); // if have audio.play()inside the setTimeout, no effect. why
            }
        }
    }
})
