document.addEventListener('click', function(movementID){ //avoid repeating code to fire each animation/stop
    let movement = movementID.target.id;
    let ball = document.querySelector('img');
    let background = document.querySelector('.scene');
    let shadow = document.querySelector('.shadow');
    ball.className = movement; // set className, so when click another button, animation of the clicked button will start, overwrite the last animation. // won't fire twice if click twice, cuz no change in class // not a toggle, so won't stop animation with second click. // will stop when click on any place on the webpage other than the buttons, cuz assign empty class // according to task description, add a stop button and set stop class to the original state of all elements, so one stop button controls all.
    background.className = ("scene bg"+movement); //switch background with new click, same as above // set CSS class in this way, so one click can trigger the whole set of animations(ball, background, shadow etc)
    shadow.className = ("shadow shadow"+movement); //same as above
});
