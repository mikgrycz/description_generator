document.getElementById('uploadButton').addEventListener('click', function () {
    var input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        var file = input.files[0];

        // Display the image
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '200px';  // Set a max width if desired
            img.style.maxHeight = '200px'; // Set a max height if desired
            img.style.position = 'absolute'; // Set position to absolute for moving the image

            var preview = document.getElementById('preview');
            preview.innerHTML = '';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
});