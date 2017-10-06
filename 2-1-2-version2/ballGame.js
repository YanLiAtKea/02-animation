let simpleAnimation = document.querySelector('.buttonAreaSimple');
simpleAnimation.addEventListener('click', function (clickedElem) {
    let clicked = clickedElem.target.id;
    let ball = document.querySelector('#ball');
    let background = document.querySelector('.scene');
    let shadow = document.querySelector('.shadow');
    let wind = document.querySelector('.wind');
    let blood = document.querySelector('.blood');
    let allAudios = document.querySelectorAll('audio');
    let windAudio = document.querySelector('audio#wind');
    let ballAudio = document.querySelector('audio#bounce');
    let volumeOn = document.querySelector('#volumeOn');
    let volumeOff = document.querySelector('#volumeOff');
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
    //hide volumeIcons when click on STOP.
    // probably shouldn't clear this, otherwise lose sight of if sound is on or off
/*document.querySelector('#stop').addEventListener('click', hideVolumeIcon);
    function hideVolumeIcon(){
        document.getElementById('volumeOn').style.display = "none";
        document.getElementById('volumeOff').style.display = "none";
    } */
    // stop and reset all audio, so even click back this button, audio won't just resume
    function stopOtherAudio() {
        allAudios.forEach(function (playing) {
            playing.pause();
            playing.currentTime = 0;
            playing.loop = false;
        });
    };
    // ball bounce sound, reusable
    function ballBounceSound() {
        ballAudio.play();
        ballAudio.volume = .3;
    };
    //start animation
    if (clicked !== "") { //remove the possibility to stop animation when user click anywhere on the page, like sound control, position control etc
        stopOtherAudio();
        let movement = clickedElem.target.id;
        ball.className = movement;
        background.className = ("scene");
        shadow.className = ("shadow");
        wind.className = ("wind");

        if (movement == "moveFrom30") {
            toggleVolume();
            stopOtherAudio();
            windAudio.play();
            wind.className = ("wind wind" + movement);
        } else if (movement == "oneJump") {
            toggleVolume();
            stopOtherAudio();
            shadow.className = ("shadow shadow" + movement);
            setTimeout(ballBounceSound, 870);
            ballBounceSound;
            ballAudio.loop = false; // in case JUMP has set loop to true
        } else if (movement == "jump") {
            toggleVolume();
            stopOtherAudio();
            shadow.className = ("shadow shadow" + movement);
            setTimeout(ballBounceSound, 500);
            ballAudio.playbackRate = 1.37;
            ballAudio.loop = true;
        } else if (movement == "fade" || movement == "glow") {
            background.className = ("scene bg" + movement);
        }
    }
})
