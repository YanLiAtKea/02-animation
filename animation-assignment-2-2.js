document.addEventListener('click', function(getMovementID){
    let movement = getMovementID.target.id;
    let ball = document.querySelector('img');
    let bg = document.querySelector('div');
    ball.classList.add(movement);
    bg.classList.add("bg"+movement);
    document.querySelector('p').innerHTML = "#" + movement;
});

