document.addEventListener('click', function(elemID){
    let movement = elemID.target.id; //avoid repeat code to fire each animation
    let ball = document.querySelector('img');
    let background = document.querySelector('div');
    let shadow = document.querySelector('div.shadow');
    ball.className = movement; // so when click another button, animation of that clicked button will start, overwrite the last clicked.
    background.className = ("scene bg"+movement); //same as above. Also, trigger the whole set of animation(ball, background, shadow) at once
});
