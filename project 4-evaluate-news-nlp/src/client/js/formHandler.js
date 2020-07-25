let formUrl = '';

// Post the url user inputs to server
const postFormUrl = async(url='', postUrl={}) => {
    const responseData = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postUrl)
    })

    try {
      if(responseData){
        const newData = await responseData.json();
        return newData;
      }
    }catch(error) {
      console.log('error', error);
    }
}

// When submitted, do a check
function handleSubmit(event) {
    event.preventDefault();
    formUrl = document.getElementById('name').value;
    if(Client.checkForUrl(formUrl)) {
      postFormUrl('http://localhost:8081/add', { url: formUrl }).then((res) => {
        if(!res) {
          alert('Not result!!!');
          return
        }else {
          updateUI(res);
        }
      })
    }
}

// update the html element when receive the data
const updateUI = (res) => {
    document.getElementById('text_polarity').innerHTML = `Text Polarity: ${res.polarity}`;
    document.getElementById('polarity_confidence').innerHTML = `Polarity Confidence: ${res.polarity_confidence}`;
    document.getElementById('text_subjectivity').innerHTML = `Text Polarity: ${res.subjectivity}`;
    document.getElementById('subjectivity_confidence').innerHTML = `Subjectivity Confidence: ${res.subjectivity_confidence}`;
    document.getElementById('some_text').innerHTML = `Some text: ${res.text.slice(0,100)}`;
}

export { handleSubmit }
