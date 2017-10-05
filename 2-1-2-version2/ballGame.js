document.addEventListener('click', function(movementID){
    let movement = movementID.target.id;
    let ball = document.querySelector('#ball');
    let ball2 = document.querySelector('#ball2');
    let ball2Vertical = ball2.parentElement;
    let ball2Horizontal = ball2Vertical.parentElement;
    let ball3 = document.querySelector('#ball3');
    let background = document.querySelector('.scene');
    let shadow = document.querySelector('.shadow');
    let wind = document.querySelector('.wind');
    let blood = document.querySelector('.blood');
    ball.className = movement;
    ball2Vertical.className = ("ball2Vertical" + movement);
    ball2Horizontal.className = ("ball2Horizontal" + movement);
    background.className = ("scene bg" + movement); shadow.className = ("shadow shadow" + movement);
    wind.className = ("wind wind" + movement);
});
