const form = document.querySelector('form');
const modules = document.querySelector('.modules');

form.addEventListener('submit', e => {
	e.preventDefault();
	const module = e.target[0].value;
	const duration = e.target[1].value;
	if (module && duration) {
		const moduleItem = document.createElement('div');
		moduleItem.classList.add('module');
		moduleItem.textContent = `${module} (${duration} hours)`;
		moduleItem.addEventListener('click', () => {
			modules.removeChild(moduleItem);
		});
		modules.appendChild(moduleItem);
	}
});