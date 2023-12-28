const btn = document.querySelector('.converter__box-data-choose');

btn.addEventListener('click', () => {
	btn.nextElementSibling.classList.toggle('converter__box-choice-clicked');
});
