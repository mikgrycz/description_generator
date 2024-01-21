window.enlargeOnEnter = function (event) {
    if (event.key === 'Enter') {
        event.target.style.width = '200px';
        event.target.style.height = '200px';
    }
}

window.changeFontSize = function (textBoxId, change) {
    var textBox = document.getElementById(textBoxId);
    var currentSize = parseFloat(window.getComputedStyle(textBox).fontSize);
    var newSize = currentSize + change;
    textBox.style.fontSize = newSize + 'px';
}

window.changeFontStyle = function (textBoxId, font) {
    var textBox = document.getElementById(textBoxId);
    textBox.style.fontFamily = font;
}
window.toggleBold = function (textBoxId) {
    var textBox = document.getElementById(textBoxId);
    textBox.style.fontWeight = textBox.style.fontWeight === 'bold' ? 'normal' : 'bold';
}

window.changeImageSize = function (imageId, delta) {
    var image = document.getElementById(imageId);
    var width = image.offsetWidth;
    var height = image.offsetHeight;
    width += delta;
    height += delta;
    image.style.width = width + 'px';
    image.style.height = height + 'px';
}

window.moveImage = function (imageId, dx, dy) {
    var image = document.getElementById(imageId);
    var top = parseInt(image.style.top, 10);
    var left = parseInt(image.style.left, 10);
    top += dy;
    left += dx;
    image.style.top = top + 'px';
    image.style.left = left + 'px';
}

window.displayImageFromPath = function (imageBoxId, path) {
    var imageBox = document.getElementById(imageBoxId);
    imageBox.src = path;
    imageBox.style.display = 'block';
}

window.onload = function () {
    var imageBox = document.getElementById('logoImage');
    imageBox.src = 'uj_logo.png'; // replace 'logo.jpg' with the name of your image file
    imageBox.onerror = function () {
        //alert('Failed to load image');
    };
    imageBox.onload = function () {
        imageBox.style.display = 'block';
    };
}