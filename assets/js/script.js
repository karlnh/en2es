const translatedText = document.querySelector('#translated-text');
const translateBtn = document.querySelector("#translate-button");
const userInputArea = document.querySelector("#text-area");

const log = console.log;

let textWarningBool = false;

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
	if (!userInputArea.value || userInputArea.value === " ") {
		textWarningBool = true;
		const addText = $('<p id="add-text-warning" style="color: red;">Please add some text to translate.</p>');
		$('#translate-header').after(addText);
		return
	}
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
			const translationText = translationArray[i];
			if (translationArray[i] === translationArray.length-1) {
				wordSpan.textContent = translationText;
				cons
				// otherwise add a space
			} else {
				wordSpan.textContent = translationText;
			}
			$(wordSpan).addClass("word");
			translatedText.append(wordSpan);
		}
	})
	.catch(err => console.error(err));
}
	// displays character count limit
	$('textarea').keyup(function() {
		// checks to see if there is a "no text" error message.
		if (textWarningBool) { // If so...
			$("#add-text-warning").empty(); // Clear the message.
			textWarningBool = false;
		}
		let characterCount = $(this).val().length,
			current = $('#current'),
			maximum = $('#max'),
			theCount = $('#count');
		current.text(characterCount);	
	  });	  
	//translate buttons event listener
	translateBtn.addEventListener("click", getTranslation)

// clickable translation
$(translatedText).on('click', function (event) {
	if ($(event.target).hasClass('word')) {
		// PUT THINGS YOU WANT TO HAPPEN AFTER CLICKING A WORD HERE
		//
		//
		//
		let cleanedWord = event.target.textContent
		.toLocaleLowerCase()
			.replace(/[!¡?¿,.;'":;—()“” ]|_/g,"")
			// Inspired by https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
		console.log(cleanedWord);
	}
})
