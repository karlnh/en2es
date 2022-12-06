const translatedText = document.querySelector('#translated-text');

let translateThis = "What is your name?";

// taken from rapidapi's text-translator2 documentation
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

function getTranslation() {
    fetch('https://text-translator2.p.rapidapi.com/translate', options)
	.then(response => {
		console.log(response)
		return response.json()
	})
	.then(response => getString(response))
    .then(function (dataResponse) {
        console.log(dataResponse);
		//dislpays the results on the page
		document.querySelector("#translated-text").textContent=dataResponse
    })
	.catch(err => console.error(err));
}
//translate buttons event listener
document.querySelector("#translate").addEventListener("click",getTranslation)

