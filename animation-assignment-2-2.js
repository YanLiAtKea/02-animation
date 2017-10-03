document.addEventListener('click', function(getMovementID){
    let movement = getMovementID.target.id;
    let ball = document.querySelector('img');
    ball.classList.add(movement);
    document.querySelector('p').innerHTML = "#" + movement;
});

