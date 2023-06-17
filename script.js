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

function downloadPlainTxt(val) {
    //get the name of the file
    let n = prompt("Ingresa nombre sin terminación");
    //create a file and put the content, name and type
    var file = new File(["\ufeff" + val], `${n}.txt`);
    //create a ObjectURL in order to download the created file
    url = window.URL.createObjectURL(file);
    //create a hidden link and set the href and click it
    var a = document.createElement('a');
    a.style = "display: none";
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
}

function uploadAndRead(fs){
    console.log(fs.files[0].name)
    console.log(fs.files)
    let extension = "." + fs.files[0].name.split('.')[1];
    console.log(extension)
    let file = fs.files[0]
    console.log(file)
    if (extension == ".txt") {
        conf = confirm("¿Estas seguro? Se remplazara el texto actual.")
        if (conf == true) {
            const reader = new FileReader();
            reader.addEventListener(
                "load",
                () => {
                  // this will then display a text file
                  document.getElementById('text').innerText = reader.result;
                },
                false
            );
            if (file) {
                reader.readAsText(file)
            }
        }
    } else {
        file.value = null;
        alert("Solo se acceptan .txt. Usted uso " + extension)
    }
}