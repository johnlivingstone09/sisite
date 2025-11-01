// Go back to main page
function goBack() {
    window.location.href = 'index.html';
}

// Form Submission
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');

    if (name && email && phone) {
        alert(`Registration Successful!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nYou will receive workshop details via email shortly.`);
        // Here you would normally process the payment
        // For demo purposes, we'll just show success
        
        // Optionally redirect back to main page after successful registration
        // setTimeout(() => {
        //     window.location.href = 'index.html';
        // }, 2000);
    }
});