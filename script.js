// Get the element
const priceElement = document.querySelector('.price');
const targetValue = 200.00;
let animationTriggered = false; // Track if animation has already been triggered

// Function to check if the element is in view
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Function to animate only the integer part of the number
function animateNumber() {
  const duration = 3000; // Total duration for animation in milliseconds (3 seconds)
  const startTime = performance.now(); // Time when animation starts
  const interval = 10; // Interval in milliseconds (update every 10ms)
  const steps = duration / interval; // Number of steps for the animation
  let currentIntegerValue = 0;
  
  function update() {
    const elapsedTime = performance.now() - startTime;
    if (elapsedTime < duration) {
      // Calculate the current integer value based on the elapsed time
      currentIntegerValue = Math.floor((elapsedTime / duration) * targetValue);
      priceElement.textContent = `$${currentIntegerValue}.${targetValue.toFixed(2).split('.')[1]}`; // Update only the integer part
      requestAnimationFrame(update); // Request the next frame
    } else {
      priceElement.textContent = `$${Math.floor(targetValue)}.${targetValue.toFixed(2).split('.')[1]}`; // Ensure it ends exactly at the target integer value
    }
  }

  update(); // Start the animation
}

// Detect when the element is in the viewport and start the animation only once
window.addEventListener('scroll', () => {
  if (!animationTriggered && isInViewport(priceElement)) {
    animateNumber();
    animationTriggered = true; // Mark the animation as triggered
    window.removeEventListener('scroll', arguments.callee); // Remove the scroll event listener
  }
});

// Initial time setup: 8 days, 4 hours, 46 minutes, and 35 seconds
let days = 8;
let hours = 4;
let minutes = 46;
let seconds = 35;

// Function to update the countdown display
function updateTime() {
    // Decrement the time by 1 second
    if (seconds > 0) {
        seconds--;
    } else {
        // If seconds reach 0, reset seconds and decrement minutes
        seconds = 59;
        if (minutes > 0) {
            minutes--;
        } else {
            // If minutes reach 0, reset minutes and decrement hours
            minutes = 59;
            if (hours > 0) {
                hours--;
            } else {
                // If hours reach 0, reset hours and decrement days
                hours = 23;
                if (days > 0) {
                    days--;
                }
            }
        }
    }

    // Update the DOM with the new values for days, hours, minutes, and seconds
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Call the updateTime function every second (1000ms)
setInterval(updateTime, 1000);
