let dragObject = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function drag(ev) {
    dragObject = ev.target;
    dragOffsetX = ev.clientX - dragObject.getBoundingClientRect().left;
    dragOffsetY = ev.clientY - dragObject.getBoundingClientRect().top;
    ev.dataTransfer.setData('text/plain', ''); // This line is added
}
function move(elementId, dx, dy) {
    var element = document.getElementById(elementId);
    var rect = element.getBoundingClientRect();
    var parentRect = element.parentNode.getBoundingClientRect();

    var newX = rect.left - parentRect.left + dx;
    var newY = rect.top - parentRect.top + dy;

    // Ensure the element stays within the bounds of the parent
    newX = Math.max(0, Math.min(newX, parentRect.width - rect.width));
    newY = Math.max(0, Math.min(newY, parentRect.height - rect.height));

    element.style.left = newX + 'px';
    element.style.top = newY + 'px';
}
document.getElementById('movableRectangle').addEventListener('dragover', function (event) {
    event.preventDefault();
});

document.getElementById('movableRectangle').addEventListener('drop', function (event) {
    event.preventDefault();
    if (dragObject != null) {
        dragObject.style.left = (event.clientX - dragOffsetX) + 'px';
        dragObject.style.top = (event.clientY - dragOffsetY) + 'px';
        dragObject = null;
    }
});