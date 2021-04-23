const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next-btn");
const prevBtn = document.querySelectorAll("form .previous-btn");
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
    parent = button.parentNode;
    div = parent.parentNode;

    const rbs = document.querySelectorAll('#'+div.id+' input[name="'+div.id+'"]');
    let selectedValue;
    for (let rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }

    let errMsg = document.querySelector(".error-message");
    if (selectedValue == undefined) {
      errMsg.classList.remove("hide");
      errMsg.classList.add("show");
    } else {
      errMsg.classList.remove("show");
      errMsg.classList.add("hide");
      changeStep("next");
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

  for (let i = 0; i < results.length; i++) {
    document.querySelector("."+results[i]).innerText = inputs[i].value;
  }
  console.log(inputs)
  form.reset();
});

// Change to next or previous slide
function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(".active");
  index = steps.indexOf(active);

  let skipStep = getUrlParameter(window.location.href, "skip");
  skipStep--;
  
  steps[index].classList.remove("active");
  steps[index].classList.remove("fade-in");
  
  if (btn === "next") {
    index++;
    if (index == skipStep) {
      index++;
    }
  } else if (btn === "prev") {
    index--;
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
