  const successMessage = document.getElementById('success-message');

        setTimeout(() => {
            successMessage.classList.add('fade-in');

            setTimeout(() => {
                successMessage.classList.remove('fade-in');
                successMessage.classList.add('fade-out');
            }, 2000);
        }, 1000);


        document.getElementById('continue-btn').addEventListener('click', () => {
            window.location.href = '/logout';
            
        });