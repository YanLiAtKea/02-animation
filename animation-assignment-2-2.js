document.addEventListener('click', function(elemID){
    let movement = elemID.target.id;
    let ball = document.querySelector('img');
    let background = document.querySelector('div');
    let shadow = document.querySelector('div.shadow');
    ball.className = movement;
    background.className = ("scene bg"+movement);
    document.querySelector('p').innerHTML = "#" + movement;
});

