// define a variable to store url
let formUrl = '';

function checkForUrl(inputUrl) {
    const tip = document.getElementById('tip');

    // vertify url
    const httpRex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if(!inputUrl) {
        tip.innerHTML = 'Please input a URL';
        tip.style.color ='red';
        return false
    }
    if(httpRex.test(inputUrl)) {
      tip.innerHTML = ''
      return true
    }else {
      tip.innerHTML = 'Please input a right URL';
      tip.style.color ='red';
      return false
    }
}

// when cursor'focus leave input element
function onBlur() {
    formUrl = document.getElementById('name').value;
    checkForUrl(formUrl);
}

export { checkForUrl, onBlur }
