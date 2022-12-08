//Definition API
const Definition = document.querySelector('#definition');

let translateThis = 'Hola, mi nombre es'


const getData = fetch('https://dictionaryapi.com/api/v3/references/spanish/json/nombre?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
.then( response => {
  if (response.ok) {console.log('Sucessful Fetch')}
  else console.log('Fetch Failed')
  return response
})
.then(response => response.json())
.then(data => handleData(data))
.catch(error => console.log('error')) 

function handleData(data) {
  console.log(data);
  console.log('definition: ' + data[0].shortdef)
  console.log('word type: ' + data[0].fl)
  console.log('offensive: ' + data[0].meta.offensive)
}


const define = fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/name?key=a684f181-0e00-415d-82ed-ee71ef088989')
.then(response => {
    if (response.ok) {console.log('Sucessful Fetch')}
    else console.log('Fetch Failed')
    return response
})
  .then(response => response.json())
  .then(word => handleWord(word))
  .catch(error => console.log('error'))

function handleWord(word) {
    console.log(word);
    console.log('definition' + word[0].shortdef)
    console.log('word type: ' + word[0].fl)
    console.log('etymology: ' + word[0].et[0][1])

}





