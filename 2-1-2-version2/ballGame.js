// expand or hide note area
document.querySelector('.unfinished').addEventListener('click', toggleNoteArea);
function toggleNoteArea() {
document.querySelector('.unfinished').classList.toggle('clicked');
}
// ******* use "overwrite class" approach to switch between simple animations, no add/remove class or toggle, no need to refresh page. other approaches see below. ******* //
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
        })
    };
    // ball bounce sound
    function ballBounceSound() {
        ballAudio.play();
        ballAudio.volume = .3;
    };
    // ball fall audio
    function ballFall() {
        fallAudio.play();
        fallAudio.volume = .7;
        fallAudio.playbackRate = 1.07;
    }
    // night audio
    function nightBackground(){
        nightAudio.play();
        nightAudio.volume = .3;
    }
// *********** animations ***********//
    if (clicked !== "") { //remove the possibility to stop animation when user click anywhere on the page, like sound control, position control etc
        resetFakeBall();
        stopOtherAudio();
        let movement = clickedElem.target.id;
        background.className = ("scene");
        shadow.className = ("shadow");
        wind.className = ("wind");
        eyes1Position.className = ("");
        eyes2Position.className = ("");
        if (movement !== "fallDown") {
            ball.className = movement;
            ballGotShot.className = "";
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
            } else if (movement == "fade") {
                stopOtherAudio();
                toggleVolume();
                setTimeout(nightBackground, 2000);
                background.className = ("scene bg" + movement);
            } else if (movement == "glow"){
                toggleVolume();
                stopOtherAudio();
                ball.className = (""); //reset ball
                night2Audio.play();
                background.className = ("scene bg" + movement);
                eyes1Position.className = (movement);
                eyes2Position.className = (movement);
                eyes2Position.addEventListener('animationend', eyesMoveClose);
                function eyesMoveClose(){
                    eyes1Position.className = ("eyes1MoveClose");
                    eyes2Position.className = ("eyes2MoveClose");
                    ball.className = (movement);
                }
            } else if (movement == "mirror") {
                toggleVolume();
                chuAudio.play();
                chuAudio.playbackRate = 1.05;
                fakeBallPositionH.style = "left: 23vw";
            } else if (movement == "shake") {
                toggleVolume();
                shakeAudio.play();
                shakeAudio.playbackRate = 3.7;
            }
        } else if (movement == "fallDown"){ //single this out, cuz need to have tha ball on stage, then fire gun, then wait, then start original animation
            ball.className = "onStage";
            toggleVolume();
            document.querySelector('#shot').play();
            document.querySelector('#shot').volume = .2;
            document.querySelector('#shot').addEventListener('ended', startAnimation);
            function startAnimation() {
                ball.className = "";
                ballGotShot.className = "ballGotShot"+movement;
                setTimeout(ballFall, 130);
            }
        }
    }
})
