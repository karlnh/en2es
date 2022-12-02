const translatedText = document.querySelector('#translated-text');

const encodedParams = new URLSearchParams();

let translateThis = "What is your name?";

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
	.then(response => response.json())
	.then( function (response) {
    // console.log(response.data.translatedText);
    let translation = response.data.translatedText;
    })
	.catch(err => console.error(err));

    translatedText.textContent = translation;