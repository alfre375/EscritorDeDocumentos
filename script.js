function getTextBox() {
    return document.getElementById("text")
}

function changeFont(selector) {
    textBox = document.getElementById("text")
    textBox.style.fontFamily = selector.value
}

function changeSize(selector) {
    textBox = getTextBox()
    textBox.style.fontSize = selector.value
}

function changeColor(selector) {
    textBox = getTextBox()
    textBox.style.color = selector.value
}

function changeLanguage(html) {
    console.log("Cambiando Idioma")
}