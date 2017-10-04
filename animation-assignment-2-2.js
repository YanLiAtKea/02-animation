document.addEventListener('click', function(elemID){ //avoid repeat code to fire each animation /stop
    let movement = elemID.target.id;
    let ball = document.querySelector('img');
    let background = document.querySelector('.scene');
    ball.className = movement; // so when click another button, animation of the clicked button will start, overwrite the last one clicked.
    background.className = ("scene bg"+movement); //same as above. Also, trigger the whole set of animation(ball, background, shadow etc) at once
});
