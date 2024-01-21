window.getFormContent = () => {
    const form = document.getElementById('movableRectangle');
    const textBox1 = form.querySelector('#textBox1');
    const textBox2 = form.querySelector('#textBox2');
    const logo = document.getElementById('logoImage');

    const formContent = `
        <div id="movableRectangle" style="width: 500px; height: 500px; position: relative; border: 1px solid black;">
            <textarea id="textBox1" style="position: absolute; resize: both; width: ${textBox1.style.width}; height: ${textBox1.style.height}; top: ${textBox1.style.top}; left: ${textBox1.style.left}; font-size: ${textBox1.style.fontSize}; font-family: ${textBox1.style.fontFamily}; font-weight: ${textBox1.style.fontWeight}; color: ${textBox1.style.color}; box-sizing: border-box;">${textBox1.value}</textarea>
            <textarea id="textBox2" style="position: absolute; resize: both; width: ${textBox2.style.width}; height: ${textBox2.style.height}; top: ${textBox2.style.top}; left: ${textBox2.style.left}; font-size: ${textBox2.style.fontSize}; font-family: ${textBox2.style.fontFamily}; font-weight: ${textBox2.style.fontWeight}; color: ${textBox2.style.color}; box-sizing: border-box;">${textBox2.value}</textarea>
            <img id="logoImage" src="${logo.src}" style="position: absolute; top: ${logo.style.top}; left: ${logo.style.left}; transform: translate(-50%, -50%); width: ${logo.style.width}; height: ${logo.style.height};" />
        </div>
    `;

    return formContent;
};
window.changeTextColor = function (id, color) {
    var textArea = document.getElementById(id);
    textArea.style.color = color;
};
window.printForm = function (formId, frameId) {
    var frame = document.getElementById(frameId);
    var formContent = window.getFormContent();

    // Add CSS for printing
    var printCss = '<style>@media print { textarea { border: none !important; color: black; } }</style>';

    frame.contentDocument.write('<html><head><title>Print</title>');
    frame.contentDocument.write(printCss);
    frame.contentDocument.write('</head><body>');
    frame.contentDocument.write(formContent);
    frame.contentDocument.write('</body></html>');
    frame.contentDocument.close();
    frame.contentWindow.print();
}

window.saveForm = function (formId) {
    var form = document.getElementById(formId);
    var textAreas = form.getElementsByTagName('textarea');
    var logo = document.getElementById('logoImage');

    var details = Array.from(textAreas).map(textArea => ({
        id: textArea.id,
        text: textArea.value,
        position: {
            top: textArea.style.top,
            left: textArea.style.left
        },
        size: {
            width: textArea.style.width,
            height: textArea.style.height
        },
        font: {
            size: textArea.style.fontSize,
            family: textArea.style.fontFamily,
            weight: textArea.style.fontWeight,
            color: textArea.style.color
        }
    }));

    details.push({
        id: logo.id,
        src: logo.src,
        position: {
            top: logo.style.top,
            left: logo.style.left
        },
        size: {
            width: logo.style.width,
            height: logo.style.height
        }
    });

    var blob = new Blob([JSON.stringify(details)], { type: 'application/json' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formDetails.json';
    link.click();
};

window.restoreForm = function (formId, file) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var details = JSON.parse(event.target.result);
        details.forEach(detail => {
            if (detail.id === 'logoImage') {
                var logo = document.getElementById(detail.id);
                logo.src = detail.src;
                logo.style.top = detail.position.top;
                logo.style.left = detail.position.left;
                logo.style.width = detail.size.width;
                logo.style.height = detail.size.height;
            } else {
                var textArea = document.getElementById(detail.id);
                textArea.value = detail.text;
                textArea.style.top = detail.position.top;
                textArea.style.left = detail.position.left;
                textArea.style.width = detail.size.width;
                textArea.style.height = detail.size.height;
                textArea.style.fontSize = detail.font.size;
                textArea.style.fontFamily = detail.font.family;
                textArea.style.fontWeight = detail.font.weight;
                textArea.style.color = detail.font.color;
            }
        });
    };
    reader.readAsText(file);
};