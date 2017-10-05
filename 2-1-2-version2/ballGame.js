document.addEventListener('click', function(movementID){
    let movement = movementID.target.id;
    let ball = document.querySelector('img');
    let background = document.querySelector('.scene');
    let shadow = document.querySelector('.shadow');
    ball.className = movement;
    background.className = ("scene bg"+movement); shadow.className = ("shadow shadow"+movement); });
