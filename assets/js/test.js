//Spanish to English API
$(translatedText).on('click', function (event) {
	if ($(event.target).hasClass('word')) {
		// PUT THINGS YOU WANT TO HAPPEN AFTER CLICKING A WORD HERE
		//
		let cleanedWord = event.target.textContent
		.toLocaleLowerCase()
			.replace(/[!¡?¿,.;'":;—()“” ]|_/g,"")
			// Inspired by https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
		console.log(cleanedWord);

    let getData = fetch('https://dictionaryapi.com/api/v3/references/spanish/json/' + (cleanedWord) + '?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
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
       console.log(data);
       console.log('Spanish Word: ' + data[0].meta.id)
       console.log('Definition in English: ' + data[0].shortdef)
       console.log('Part of Speech: ' + data[0].fl)
       console.log('Is the word considered offensive: ' + data[0].meta.offensive)
     }
	}
})

//Text Content
let spanishWord = li1.textContent = 'Spanish Word: ' + data[0].meta.id;
let englishDefinition = li2.textContent = 'Definition in English: ' + data[0].shortdef;
let partOfSpeech = li3.textContent = 'Part of Speech: ' + data[0].fl;
let offensiveWord = li4.textContent = 'Is the word considered offensive: ' + data[0].meta.offensive;




// let getData = fetch('https://dictionaryapi.com/api/v3/references/spanish/json/confusión?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
// .then( response => {
//   if (response.ok) {console.log('Sucessful Fetch')}
//   else console.log('Fetch Failed')
//   return response
// })
// .then(response => response.json())
// .then(data => handleData(data))
// .catch(error => console.log('error')) 

// function handleData(data) {

//   console.log(data);
//   console.log('Spanish Word: ' + data[0].meta.id)
//   console.log('Definition in English: ' + data[0].shortdef)
//   console.log('Part of Speech: ' + data[0].fl)
//   console.log('Is the word considered offensive: ' + data[0].meta.offensive)
// }


// let define = fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/the?key=a684f181-0e00-415d-82ed-ee71ef088989')
// .then(response => {
//     if (response.ok) {console.log('Sucessful Fetch')}
//     else console.log('Fetch Failed')
//     return response
// })
//   .then(response => response.json())
//   .then(word => handleWord(word))
//   .catch(error => console.log('error'))

// function handleWord(word) {
//     console.log(word);
//     console.log('definition' + word[0].shortdef)
//     console.log('word type: ' + word[0].fl)
//     console.log('etymology: ' + word[0].et[0][1])

// }

// $(translatedText).on('click', function (event) {
// 	if ($(event.target).hasClass('word')) {
// 		// PUT THINGS YOU WANT TO HAPPEN AFTER CLICKING A WORD HERE
// 		console.log(event.target.textContent);
// 	}

//   const getData = fetch('https://dictionaryapi.com/api/v3/references/spanish/json/' + (event.target.textContent) + '?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
// .then( response => {
//   if (response.ok) {console.log('Sucessful Fetch')}
//   else console.log('Fetch Failed')
//   return response
// })
// .then(response => response.json())
// .then(data => handleData(data))
// .catch(error => console.log('error')) 

// function handleData(data) {
//   console.log(data);
//   console.log('definition: ' + data[0].shortdef)
//   console.log('word type: ' + data[0].fl)
//   console.log('offensive: ' + data[0].meta.offensive)
// }

// const define = fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + (event.target.textContent) + '?key=a684f181-0e00-415d-82ed-ee71ef088989')
// .then(response => {
//     if (response.ok) {console.log('Sucessful Fetch')}
//     else console.log('Fetch Failed')
//     return response
// })
//   .then(response => response.json())
//   .then(word => handleWord(word))
//   .catch(error => console.log('error'))

// function handleWord(word) {
//     console.log(word);
//     console.log('definition' + word[0].shortdef)
//     console.log('word type: ' + word[0].fl)
//     console.log('etymology: ' + word[0].et[0][1])

// }

// })




