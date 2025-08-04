const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const input_field = document.getElementById("inp-word");

input_field.addEventListener('keyup', (event)=> {
    if(event.key === "Enter"){
        if (input_field.value.search(/^\S+$/) !== -1){
            fetchData(input_field.value);
        } else {
            alert("Fill the input field");
        }   
    }
});

btn.addEventListener("click", () => {
    let inpWord = input_field.value;
    if(inpWord.search(/^\S+$/) !== -1){
        fetchData(inpWord);
    } else {
        alert("Fill the input field");
    }
    
});

function fetchData(input_word){
    fetch(`${url}${input_word}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${input_word}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;

                for (var aud of data[0].phonetics){
                    if(aud.audio != ''){
                        sound.setAttribute("src", `${aud.audio}`);
                        break;
                    }
                }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
}
function playSound() {
    sound.play();
}
