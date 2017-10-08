// expand or hide note area
document.querySelector('.unfinished').addEventListener('click', toggleNoteArea);
function toggleNoteArea() {
document.querySelector('.unfinished').classList.toggle('clicked');
}
// FOR SIMPLE ANIMATIONS, use "overwrite className" approach to switch between them, no add/remove class or toggle, no need to refresh page. Other approaches see below.
let simpleAnimation = document.querySelector('.buttonAreaSimple');
simpleAnimation.addEventListener('click', function (clickedElem) {
    let clicked = clickedElem.target.id;
    let ball = document.querySelector('#ball');
    let ballGotShot = document.querySelector('#ballGotShot');
    let fakeBallPositionH = document.querySelector('.fakeBallWrapper');
    let background = document.querySelector('.scene');
    let shadow = document.querySelector('.shadow');
    let wind = document.querySelector('.wind');
    let eyes1Position = document.querySelector('#eyes1');
    let eyes2Position = document.querySelector('#eyes2');
    let allAudios = document.querySelectorAll('audio');
    let chuAudio = document.querySelector('audio#chu');
    let fallAudio = document.querySelector('audio#fall');
    let windAudio = document.querySelector('audio#wind');
    let shakeAudio = document.querySelector('audio#shake');
    let snorringAudio = document.querySelector('audio#snorring');
    let nightAudio = document.querySelector('audio#night');
    let night2Audio = document.querySelector('audio#night2');
    let ballAudio = document.querySelector('audio#bounce');
    let volumeOn = document.querySelector('#volumeOn');
    let volumeOff = document.querySelector('#volumeOff');
// *********** some reusable functions *********** //
    // reset fakeBall
    function resetFakeBall() {
        fakeBallPositionH.style = "left: -7vw";
    }
    // show/hide volume icon and toggle, call this only when selected animation has sound
    function toggleVolume() {
        volumeOn.style.display = "block";
        volumeOn.addEventListener('click', toggleVolumeOff);
        function toggleVolumeOff() {
            volumeOn.style.display = "none";
            volumeOff.style.display = "block";
            allAudios.forEach(function (playing) {
                playing.muted = true;
            })
        }
        volumeOff.addEventListener('click', toggleVolumeOn);
        function toggleVolumeOn() {
            volumeOn.style.display = "block";
            volumeOff.style.display = "none";
            allAudios.forEach(function (playing) {
                playing.muted = false;
            })
        }
    }
    // stop all audio, so won't disturb the new one. and reset audio so when click back this button, audio won't just resume.
    function stopOtherAudio() {
        allAudios.forEach(function (playing) {
            playing.pause();
            playing.currentTime = 0;
            playing.loop = false;
        })
    };
    // ball bounce sound
    function ballBounceSound() {
        ballAudio.play();
        ballAudio.volume = .3;
    };
    // ball fall sound
    function ballFall() {
        fallAudio.play();
        fallAudio.volume = .7;
        fallAudio.playbackRate = 1.07;
    }
    // night sound
    function nightBackground(){
        nightAudio.play();
        nightAudio.volume = .3;
    }
    function startSnorring() {
        snorringAudio.play();
        snorringAudio.loop = true;
    }
    // reset scene
    function resetScene(){
        resetFakeBall();
        background.className = ("scene");
        shadow.className = ("shadow");
        wind.className = ("wind");
        eyes1Position.className = ("");
        eyes2Position.className = ("");
        toggleVolume();
        stopOtherAudio();
    }
// ******* start animation, start with reset scene ******* //
    resetScene();
    if (clicked !== "fallDown"){
        ball.className = clicked;
        ballGotShot.className = "";
        if (clicked == "moveTo30") {
            chuAudio.play();
        } else if (clicked == "moveFrom30") {
            windAudio.play();
            wind.className = ("wind wind" + clicked);
        } else if (clicked == "oneJump") {
            shadow.className = ("shadow shadow" + clicked);
            setTimeout(ballBounceSound, 870);
        } else if (clicked == "jump") {
            shadow.className = ("shadow shadow" + clicked);
            setTimeout(ballBounceSound, 470);
            ballAudio.playbackRate = 1.37;
            ballAudio.loop = true;
        } else if (clicked == "fade") {
            stopOtherAudio();
            setTimeout(nightBackground, 2000);
            background.className = ("scene bg" + clicked);
        } else if (clicked == "glow"){
            stopOtherAudio();
            ball.className = (""); //reset ball
            night2Audio.play();
            background.className = ("scene bg" + clicked);
            eyes1Position.className = (clicked);
            eyes2Position.className = (clicked);
            eyes2Position.addEventListener('animationend', eyesMoveClose);
            function eyesMoveClose(){
                eyes1Position.className = ("eyes1MoveClose");
                eyes2Position.className = ("eyes2MoveClose");
                ball.className = (clicked);
                ball.addEventListener('animationend', snorring);
            }
            function snorring(){
                if (ball.className == "glow"){
                    startSnorring();
                    ball.className = ("snorring");
                    } else {
                        return;
                    }
                }
//                eyes1Position.className = ("eyes1BackOff");
//                eyes2Position.className = ("eyes2BackOff");
        } else if (clicked == "mirror") {
            chuAudio.play();
            chuAudio.playbackRate = 1.05;
            fakeBallPositionH.style = "left: 23vw";
        } else if (clicked == "shake") {
            shakeAudio.play();
            shakeAudio.volume = .3;
            shakeAudio.playbackRate = 3.7;
        }
    } else if (clicked == "fallDown"){ //single this cuz more events, need to have a good ball on stage, then fire gun, then wait, then switch to a broken ball and start original animation
        ball.className = "onStage";
        document.querySelector('#shot').play();
        document.querySelector('#shot').volume = .2;
        document.querySelector('#shot').addEventListener('ended', startAnimation);
        function startAnimation() {
            ball.className = "";
            ballGotShot.className = "ballGotShot"+clicked;
            setTimeout(ballFall, 110);
        }
    }
})
/*
let moreAnimation = document.querySelector('.buttonAreaMore');
moreAnimation.addEventListener('click', function (clickedElem) {
    let clicked = clickedElem.target.id;
    let ball = document.querySelector('#ball');
    let background = document.querySelector('.scene');
    if(clicked == "sneak") {
        ball.className = clicked;
        background.className = ("scene bg"+clicked);
    }
})*/
