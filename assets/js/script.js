const translatedText = document.querySelector('#translated-text');
const translateBtn = document.querySelector("#translate-button");
const userInputArea = document.querySelector("#text-area");

// TODO: give translateThis the contents of whatever the user wants to translate
let translateThis;

// gets translated text string from data
function getString(response) {
    let dataResponse = response.data.translatedText;
    console.log(dataResponse);
    return dataResponse;
}
// splits string by spaces into an array
function stringToArray(string) {
	let arrayedTranslation = string.split(" ");
	return arrayedTranslation;
}

// fetches API data and sends returned data into a text box
function getTranslation() {
	translateThis = userInputArea.value; // grabs user input from textbox and sets translateThis for the API
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
		translatedText.replaceChildren(); // empties out last translation
		for (let i = 0; i < translationArray.length; i++) {
			let wordSpan = document.createElement('span');
			// if the last word, don't add a space
			if (translationArray[i] === translationArray.length-1) {
				wordSpan.textContent = translationArray[i];
			// otherwise add a space
			} else {
				wordSpan.textContent = translationArray[i] + " ";
			}
			translatedText.append(wordSpan);
		}
    })
	.catch(err => console.error(err));
}
//translate buttons event listener
translateBtn.addEventListener("click", getTranslation)

