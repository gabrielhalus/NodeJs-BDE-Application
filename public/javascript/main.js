const togglePassword = document.getElementById('toggle-password')
const password = document.getElementById('password-input')

togglePassword.addEventListener('click', function() {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
    password.setAttribute('type', type)
    // toggle slashed eye
    const path = togglePassword.getAttribute('src') === '/assets/visibile.svg' ? '/assets/invisibile.svg' : '/assets/visibile.svg'
    togglePassword.setAttribute('src', path)
})