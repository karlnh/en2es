const translatedText = document.querySelector('#translated-text');
const translateBtn = document.querySelector("#translate-button");
const userInputArea = document.querySelector("#text-area");
const wordModal = document.querySelector(".modal");
let spanishWord = document.getElementById('spanishWord');
let englishDefinition = document.getElementById('englishDefinition');
let partOfSpeech = document.getElementById('partOfSpeech');
let isOffensive = document.getElementById('isOffensive');

// let word = document.querySelectorAll('.word')
const log = console.log;

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
			const translationText = translationArray[i]
			.toLocaleLowerCase()
			.replace(
				/['!','¡','?','¿','.',',',';',"'",'"',':',';','—','(',')','“','”',' ']|_/g,
				""
				)
				if (translationArray[i] === translationArray.length-1) {
					wordSpan.textContent = translationText;
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
		$(wordModal).addClass('is-active');
		fetch('https://dictionaryapi.com/api/v3/references/spanish/json/' + event.target.textContent + '?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
		.then( response => {
		  if (response.ok) {console.log('Sucessful Fetch')}
		  else console.log('Fetch Failed')
		  return response
		})
		.then(response => response.json())
		.then(data => handleData(data))
		.catch(error => console.log('error')) 
	   
		function handleData(data) {
		 //Modal stuff goes here
		 spanishWord.textContent = 'Spanish Word: ' + data[0].meta.id;
		 englishDefinition.textContent = 'Definition in English: ' + data[0].shortdef;
		 partOfSpeech.textContent = 'Part of Speech: ' + data[0].fl;
		 offensiveWord.textContent = 'Is the word considered offensive: ' + data[0].meta.offensive;

		  console.log(data);
		  console.log('Spanish Word: ' + data[0].meta.id)
		  console.log('Definition in English: ' + data[0].shortdef)
		  console.log('Part of Speech: ' + data[0].fl)
		  console.log('Is the word considered offensive: ' + data[0].meta.offensive)
		
	   
		console.log(event.target.textContent);
		loacalStr(event.target.textContent)
	}
}
})

$(wordModal).on('click', function (event) {
	if ($(event.target).hasClass("delete")) {
	$(wordModal).removeClass('is-active')
}
	})

let saved = document.getElementById("translate-section");
saved.addEventListener("click", loacalStr);


function loacalStr(word){
	console.log(word)

	localStorage.setItem('key', word)
	

	// localStorage.getItem(key)
	console.log(localStorage.getItem('key'))
}
