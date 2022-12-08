//Definition API
const Definition = document.querySelector('#definition');


// const getData = fetch('https://dictionaryapi.com/api/v3/references/spanish/json/test?key=97335289-85ec-42ac-8ab6-d1b79ac4a8df')
// .then 


const define = fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/crater?key=a684f181-0e00-415d-82ed-ee71ef088989')
.then( res => {
    if (res.ok) {console.log('Sucessful Fetch')}
    else console.log('Fetch Failed')
    return res
})
  .then(res => res.json())
  .then(data => handleData(data))
  .catch(error => console.log('error'))

function handleData(data) {
    console.log(data);
    console.log('definition' + data[0].shortdef[0])
    console.log('etymology: ' + data[0].et[0][1])
    console.log('word type: ' + data[0].fl)

}





