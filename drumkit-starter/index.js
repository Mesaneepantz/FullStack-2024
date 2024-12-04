// Function to play sound based on key
function playSound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("crash.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("kick-bass.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("snare.mp3");
      audio.play();
      break;
    default:
      console.log("Invalid key: " + key);
  }
}

// Function to handle button animation
function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100); // Remove the class after 100ms
  }
}

// Add event listener for button clicks
document.querySelectorAll(".drum").forEach(button => {
  button.addEventListener("click", () => {
    var buttonInnerHTML = button.innerHTML;
    playSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
});

// Add event listener for key presses
document.addEventListener("keydown", event => {
  playSound(event.key); // Play sound for the pressed key
  buttonAnimation(event.key); // Trigger animation for the pressed key
});


