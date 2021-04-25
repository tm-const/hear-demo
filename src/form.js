const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll(".dev-next-btn");
const prevBtn = document.querySelectorAll(".dev-previous-btn");
const form = document.querySelector("form");

const results = [
  'prevention', 
  'old', 
  'daily-life', 
  'improve', 
  'status'
];

nextBtn.forEach((button) => {
  button.addEventListener("click", () => {  
    // Set parent node
    divX = button.parentNode;
    // Set child radio buttons with dynamic selector
    elementDivX = '#'+divX.id+' input[name="'+divX.id+'"]'

    // Select all radio elements with the id in current step ( IE11 : cleares Nodelist error )
    var currentStepRadioButtons = Array.prototype.slice.call(document.querySelectorAll(elementDivX)); 
    
    let selectedValue;
    for (const rbs of currentStepRadioButtons) {
      // See if radio button is checked
      if (rbs.checked) {
          selectedValue = rbs.value;
          break;
      }
    }

    let errMsg = document.querySelector(".error-message");
    // Toggle error message if selected values are all undefined : if is not undefined go to next step
    if (selectedValue == undefined) {
      errMsg.classList.remove("hide");
      errMsg.classList.add("show");
    } else {
      errMsg.classList.remove("show");
      errMsg.classList.add("hide");
      
      changeStep("next"); // Change next step
    }
  });
});

prevBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("prev");
  });
});

// Submit pushes checked options into array and console log object
form.addEventListener("submit", (e) => {

  e.preventDefault();
  const inputs = [];

  form.querySelectorAll("input[type='radio']:checked").forEach((input) => {
    const {
      name,
      value
    } = input;

    inputs.push({
      name,
      value
    });
  });

  // loop through checked radio buttons and get values
  for (let i = 0; i < results.length; i++) {
    document.querySelector("."+results[i]).innerText = inputs[i].value;
  }
  console.log(inputs)
  form.reset(); // reset form values
});

// Change to next or previous slide
function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(".active");
  index = steps.indexOf(active);

  // get URL param value
  let skipStep = getUrlParameter(window.location.href, "skip");
  skipStep--;
  
  steps[index].classList.remove("active");
  steps[index].classList.remove("fade-in");
  
  if (btn === "next") {
    index++;

    // check if next step equals URL param value (++)
    if (index == skipStep) {
      index++;
    }
  } else if (btn === "prev") {
    index--;

    // check if next step equals URL param value (--)
    if (index == skipStep) {
      index--;
    }
  }
  
  steps[index].classList.add("fade-in");
  steps[index].classList.add("active");
}

// Checks for Skip value
function getUrlParameter(location, name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
