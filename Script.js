document.getElementById('subscription-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const responseMessage = document.getElementById('response-message');
    
    try {
        const response = await fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
            responseMessage.textContent = 'Subscription successful! Check your email for confirmation.';
        } else {
            responseMessage.textContent = 'Subscription failed. Please try again.';
        }
    } catch (error) {
        responseMessage.textContent = 'An error occurred. Please try again later.';
    }
});
