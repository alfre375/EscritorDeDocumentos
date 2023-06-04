function getTextBox() {
    return document.getElementById("text")
}

function changeFont(selector) {
    textBox = document.getElementById("text")
    textBox.style.fontFamily = selector.value
}

let sizeLimit = 400;
function changeSize(selector) {
    textBox = getTextBox()
    if (selector.value > sizeLimit) {
        selector.value = sizeLimit
    }
    textBox.style.fontSize = selector.value
}

function changeColor(selector) {
    textBox = getTextBox()
    textBox.style.color = selector.value
}

function changeLanguage(html) {
    console.log("Cambiando Idioma")
}

charmap = undefined;

function onChangeAssistedTypingMode(ats) {
    let atsv = ats.value;
    if (atsv == "none") {
        charmap = undefined;
        return
    }
    let charmapFN = "./assets/assisted-typing/" + atsv + "-charmap.json"
    console.log("File name is", charmapFN)
    fetch(charmapFN).then(x => x.text()).
    then(x =>{
        charmap = JSON.parse(x)
    });
}
function replaceSpecialSequences(editor){
    if (charmap == undefined) {return;}
    let text = editor.value;
    let charTable = charmap;
    let newtext = text;
    for(let code in charTable){
        newtext = newtext.replaceAll(code, charTable[code]);
    }
    editor.value = newtext;
}
    