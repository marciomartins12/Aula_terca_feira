document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye-slash');
    });

    const form = document.getElementById('registerForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const terms = document.getElementById('terms');
    const successModal = document.getElementById('successModal');

    // Variável temporária para guardar os dados
    let formDataToSubmit = null;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        document.querySelectorAll('[id$="Error"]').forEach(el => {
            el.classList.add('hidden');
        });

        if (username.value.trim() === '') {
            document.getElementById('usernameError').textContent = 'Nome de usuário é obrigatório';
            document.getElementById('usernameError').classList.remove('hidden');
            username.classList.add('shake', 'border-red-500');
            isValid = false;
        } else if (username.value.trim().length < 3) {
            document.getElementById('usernameError').textContent = 'Nome de usuário deve ter pelo menos 3 caracteres';
            document.getElementById('usernameError').classList.remove('hidden');
            username.classList.add('shake', 'border-red-500');
            isValid = false;
        } else {
            username.classList.remove('shake', 'border-red-500');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('emailError').textContent = 'Por favor, insira um e-mail válido';
            document.getElementById('emailError').classList.remove('hidden');
            email.classList.add('shake', 'border-red-500');
            isValid = false;
        } else {
            email.classList.remove('shake', 'border-red-500');
        }

        if (passwordInput.value.length < 6) {
            document.getElementById('passwordError').textContent = 'A senha deve ter pelo menos 6 caracteres';
            document.getElementById('passwordError').classList.remove('hidden');
            passwordInput.classList.add('shake', 'border-red-500');
            isValid = false;
        } else {
            passwordInput.classList.remove('shake', 'border-red-500');
        }

        if (!terms.checked) {
            terms.parentElement.classList.add('shake');
            isValid = false;
            setTimeout(() => {
                terms.parentElement.classList.remove('shake');
            }, 500);
        }

        if (isValid) {
            // Armazena os dados do formulário antes de resetar
            formDataToSubmit = {
                userName: username.value,
                email: email.value,
                password: passwordInput.value
            };

            successModal.classList.remove('hidden');
            // NÃO resetar aqui ainda — só após envio
        }
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('animationend', function () {
            this.classList.remove('shake');
        });
    });


    document.getElementById('closeModal').addEventListener('click', function () {
        successModal.classList.add('hidden');

        if (formDataToSubmit) {
            fetch('/registerNewUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataToSubmit)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        alert('Erro ao registrar usuário.');
                    }
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });

        }
    });
});
