const form = document.querySelector('form');
const message = document.querySelector('.message');

form.addEventListener('submit', e => {
	e.preventDefault();
	const password = e.target[1].value;
	if (password === '11111') {
		message.textContent = 'Welcome';
		message.style.color = '#0f0';
		message.style.display = 'block';
	} else {
		message.textContent = 'Account not exist';
		message.style.display = 'block';
	}
});