const reservationForm = document.getElementById('reservation-form');


const successMessage = document.getElementById('success-message');


const closeButton = document.getElementById('close-message');


reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();


    const fakeOrderNumber = generateFakeOrderNumber();


    document.getElementById('order-number').textContent = fakeOrderNumber;


    successMessage.style.display = 'block';


    reservationForm.reset();
});


closeButton.addEventListener('click', function() {

    successMessage.style.display = 'none';
});


function generateFakeOrderNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderNumber = '';

    for (let i = 0; i < 8; i++) {
        orderNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return orderNumber;
}