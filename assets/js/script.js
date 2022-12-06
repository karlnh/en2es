const translatedText = document.querySelector('#translated-text');

let translateThis = "What is your name?";

// taken from rapidapi's text-translator2 documentation
// parameters for translation API
const encodedParams = new URLSearchParams();
encodedParams.append("source_language", "en");
encodedParams.append("target_language", "es");
encodedParams.append("text", translateThis);
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '276bc129c1mshe50f6ba758e004fp1891f2jsnee846cd827fa',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: encodedParams
};

function getString(response) {
    let dataResponse = response.data.translatedText;
    console.log(dataResponse);
    return dataResponse;
}

function stringToArray(string) {
	let arrayedTranslation = string.split(" ");
	return arrayedTranslation;
}

function getTranslation() {
    fetch('https://text-translator2.p.rapidapi.com/translate', options)
	.then(response => {
		console.log(response)
		return response.json()
	})
	.then(response => getString(response))
    .then(function (dataResponse) {
        console.log(dataResponse);
		// create span elements for each word in the translated sentence
		let translationArray = stringToArray(dataResponse);
		for (let i = 0; i < translationArray.length; i++) {
			let wordSpan = document.createElement('span');
			if (translationArray[i] === translationArray.length-1) {
				wordSpan.textContent = translationArray[i];
			} else {
				wordSpan.textContent = translationArray[i] + " ";
			}
			translatedText.append(wordSpan);
		}
    })
	.catch(err => console.error(err));
}
//translate buttons event listener
document.querySelector("#translate-button").addEventListener("click",getTranslation)

