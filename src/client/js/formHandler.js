const resultSection = document.getElementById('results');
const resultAgreement = document.getElementById('agreement');
const resultConfidence = document.getElementById('confidence');
const resultSubjectivity = document.getElementById('subjectivity');
const resultPolarity = document.getElementById('polarity');
const errMessage = document.getElementById('errorMessage');

function handleSubmit(event) {
    event.preventDefault();

    // Show results loading text
    showResults();
    resultAgreement.innerText = "Loading...";
    resultConfidence.innerText = "Loading...";
    resultSubjectivity.innerText = "Loading...";
    resultPolarity.innerText = "Loading...";


    let formUrl = document.getElementById('urlInput').value;
    if (Client.checkUrl(formUrl)) {

        fetch("http://localhost:8080/getResults", {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ formUrl }),
        })
        .then((res) => {
            if(res.ok) {
                return res.json()
            } throw new Error('Network response was not ok.');
        })
        .then((res) => {
            updateUI(res);
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
            hideResults();
            errMessage.classList.remove('hidden');
            errMessage.innerText = "Something went wrong, please try again."
        });
    } else {
        hideResults();
        errMessage.classList.remove('hidden');
        errMessage.innerText = "Invalid URL"
    }

    console.log("::: Form Submitted :::")
}

async function updateUI(res) {
    if(res) {
        resultAgreement.innerText = res.agreement;
        resultConfidence.innerText = res.confidence;
        resultSubjectivity.innerText = res.subjectivity;
        resultPolarity.innerText = polarity(res.score_tag);
    }
}

export const polarity= (score_tag) => {
    if (score_tag === "P+" || score_tag === "P") {
        return "Positive";
    } else if (score_tag === "N+" || score_tag === "N") {
        return "Negative";
    } else if (score_tag === "NEU") {
        return "Neutral";
    } else {
        return "Non Sentimental";
    }
};

function showResults() {
    errMessage.classList.add('hidden');

    if(resultSection) {
        resultSection.classList.remove('hidden');
    }
}

function hideResults() {
    errMessage.classList.add('hidden');

    if(resultSection) {
        resultSection.classList.add('hidden');
    }
}

export { handleSubmit }