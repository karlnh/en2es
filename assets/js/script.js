const translatedText = document.querySelector('#translated-text');
const translateBtn = document.querySelector("#translate-button");
const userInputArea = document.querySelector("#text-area");
const wordModal = document.querySelector(".modal");
let spanishWord = document.getElementById('spanishWord');
let englishDefinition = document.getElementById('englishDefinition');
let partOfSpeech = document.getElementById('partOfSpeech');
let translateThis;

// Initializing localStorage if empty
let wordsJSON = JSON.parse(localStorage.getItem("words"));
console.log(wordsJSON);
if (wordsJSON === null) {
	wordsJSON = [];
	localStorage.setItem("words", JSON.stringify(wordsJSON));
} else {
	console.log("Loading words...")
	for (let i = 0; i < wordsJSON.length; i++) {
		console.log(wordsJSON[i]);
	}
}

function setLocalStorage(string) {
	const newWord = {
		word: string
	};
	wordsJSON.push(newWord);
	console.log(wordsJSON);
	localStorage.setItem("words", JSON.stringify(wordsJSON));
}

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
			console.log("Adding span...")
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
		let cleanedWord = event.target.textContent.toLocaleLowerCase().replace(/[!¡?¿,.;'":;—()“” ]|_/g,"");
		console.log(cleanedWord);
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
		fetch('https://dictionaryapi.com/api/v3/references/spanish/json/' + cleanedWord + '?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
		.then( response => {
		console.log(response);
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
	   
		function handleData(data) {
		 //Modal stuff goes here
		 spanishWord.textContent = 'Spanish Word: ' + data[0].meta.id;
		 englishDefinition.textContent = 'Definition in English: ' + data[0].shortdef;
		 partOfSpeech.textContent = 'Part of Speech: ' + data[0].fl;

		  console.log(data);
		  console.log('Spanish Word: ' + data[0].meta.id)
		  console.log('Definition in English: ' + data[0].shortdef)
		  console.log('Part of Speech: ' + data[0].fl)
		// getLocalStorage(event.target.textContent)
	}
}
})
