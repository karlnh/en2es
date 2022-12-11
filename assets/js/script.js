const translatedText = document.querySelector('#translated-text');
const translateBtn = document.querySelector("#translate-button");
const userInputArea = document.querySelector("#text-area");
const wordModal = document.querySelector(".modal");
const wordListEl = document.querySelector('#word-list-ul');
const savedWordsContainer = document.querySelector('#saved-words-container');
const clearStorageBtn = document.querySelector('#clear-saved-words-btn');
let spanishWord = document.getElementById('spanishWord');
let englishDefinition = document.getElementById('englishDefinition');
let partOfSpeech = document.getElementById('partOfSpeech');
let translateThis;
let textWarningBool = false;
// Initializing localStorage if empty
let wordsJSON = JSON.parse(localStorage.getItem("words"));
if (wordsJSON === null) { // if no local storage
	$(savedWordsContainer).css("visibility", "hidden");
	wordsJSON = [];
	localStorage.setItem("words", JSON.stringify(wordsJSON));
} else { // if local storage HAS SOMETHING,
	if (!wordsJSON.length > 0) { // if empty,
		$(savedWordsContainer).css("visibility", "hidden");
	} else { // otherwise do stuff
		$(savedWordsContainer).css("visibility", "visible");
		for (let i = 0; i < wordsJSON.length; i++) {
			if (i < 4) {
				let wordEl = document.createElement('li');
				wordEl.textContent = wordsJSON[i].word;
				$(wordListEl).append(wordEl);
			}
		$(clearStorageBtn).on('click', function () {
			localStorage.clear();
			$(wordListEl).empty();
		})
		}
	}
}
// Setting localstorage with string input
function setLocalStorage(string) {
	const newWord = {
		word: string
	};
	wordsJSON.unshift(newWord); // adds new word to FRONT of wordJSON
	if (wordsJSON.length > 5) { //6
		for (let i = wordsJSON.length; i > 5; i--) {
			wordsJSON.pop();
		}
	}
	localStorage.setItem("words", JSON.stringify(wordsJSON));
}
// Gets translated text string from data
function getString(response) {
	let dataResponse = response.data.translatedText;
    return dataResponse;
}
// Splits string by spaces into an array
function stringToArray(string) {
	let arrayedTranslation = string.split(" ");
	return arrayedTranslation;
}
// Fetches API data and sends returned data into a text box
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
		return response.json()
	})
	.then(response => getString(response))
    .then(function (dataResponse) {
		// create span elements for each word in the translated sentence
		let translationArray = stringToArray(dataResponse);
		translatedText.replaceChildren(); // empties out last translation
		for (let i = 0; i < translationArray.length; i++) {
			let wordSpan = document.createElement('span');
			$(wordSpan).addClass('word');
			// if the last word, don't add a space
			let translationText = translationArray[i];
			if (translationArray[i] === translationArray.length - 1) {
				wordSpan.textContent = translationText;
			// otherwise add a space
			} else {
				wordSpan.textContent = translationText + " ";
			}
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
// Translate button's event listener
translateBtn.addEventListener("click", getTranslation)
// clickable translation
$(translatedText).on('click', function (event) {
	if ($(event.target).hasClass('word')) {
		let cleanedWord = event.target.textContent.toLocaleLowerCase().replace(/[!¡?¿,.;'":;—()“” ]|_/g,"");
		// PUT THINGS YOU WANT TO HAPPEN AFTER CLICKING A WORD HERE
		// local storage object
		setLocalStorage(cleanedWord);
		//make modal visible and invisible
		$(wordModal).addClass('is-active');
		$(wordModal).on('click', function (event) {
			if ($(event.target).hasClass("delete")) {
				$(wordModal).removeClass('is-active');
			}	
		});
		// fetching dictionary entry of clicked word
		fetch('https://dictionaryapi.com/api/v3/references/spanish/json/' + cleanedWord + '?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
		.then( response => {
		if (response.ok) {
			console.log('Sucessful Fetch')
		}
		else {
			console.log('Fetch Failed');
		}
		return response;
		})
		.then(response => response.json())
		.then(data => handleData(data))
		.catch(err => console.error(err));
	   // putting data into html
		function handleData(data) {
		 spanishWord.textContent = 'Spanish Word: ' + data[0].meta.id;
		 englishDefinition.textContent = 'Definition in English: ' + data[0].shortdef;
		 partOfSpeech.textContent = 'Part of Speech: ' + data[0].fl;
	}
}
})