function openModal(event) {
    const productItem = event.target.closest('.product_item');
    if (productItem) {
        const modalWindow = productItem.querySelector('.modal_window');

        if (modalWindow) {
            modalWindow.classList.toggle('show_modal_window');
        }
    }
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-ellipsis')) {
        openModal(event);
    }
});
