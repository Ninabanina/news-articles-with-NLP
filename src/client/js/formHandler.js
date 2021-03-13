const resultSection = document.getElementById('results');
const resultAgreement = document.getElementById('agreement');
const resultConfidence = document.getElementById('confidence');
const resultSubjectivity = document.getElementById('subjectivity');
const resultPolarity = document.getElementById('polarity');
const errMessage = document.getElementById('errorMessage');

function checkPolarity(tag) {
    if (tag === "P+"){
        return "Very Positive";
    } else if (tag === "P"){
        return "Positive";
    } else if (tag === "N+") {
        return "Very Negative";
    } else if (tag === "N") {
        return "Negative";
    } else if (tag === "NEU") {
        return "Neutral";
    } else {
        return "Non Sentimental";
    }
}

function handleSubmit(event) {
    event.preventDefault();

    const articleURL = document.getElementById('articleURL').value;
    showLoadingResults();

    if (Client.checkUrl(articleURL)) {

        fetch("http://localhost:8080/getResults", {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ articleURL: articleURL }),
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } throw new Error('Network response was not ok.');
        })
        .then((res) => {
            updateResults(res);
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
}

function showLoadingResults() {
    // Show results loading text
    showResults();
    resultAgreement.innerText = "Loading...";
    resultConfidence.innerText = "Loading...";
    resultSubjectivity.innerText = "Loading...";
    resultPolarity.innerText = "Loading...";
}

async function updateResults(res) {
    if(res) {
        resultAgreement.innerText = res.agreement;
        resultConfidence.innerText = res.confidence + "%";
        resultSubjectivity.innerText = res.subjectivity;
        resultPolarity.innerText = checkPolarity(res.score_tag);
    }
}

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

export { handleSubmit, checkPolarity }