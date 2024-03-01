// document.addEventListener("DOMContentLoaded", ()=> {
    
var logout = document.querySelector('#logOut') as HTMLButtonElement;
const navLinks = document.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>;
const contentDivs = document.querySelectorAll('.content div') as NodeListOf<HTMLDivElement>;

logout.addEventListener('click', () => {
    // sessionStorage.clear();
    window.location.href = "../index.html";
})

navLinks.forEach(link => {
	link.addEventListener('click', (event:Event) => {
        event.preventDefault();

		// Remove active class from all nav links
		navLinks.forEach(navLink => navLink.classList.remove('active'));

		// Add active class to clicked nav link
		link.classList.add('active');

		// Hide all content divs
		contentDivs.forEach(div => div.classList.remove('active'));

		// Show content div with matching ID
		const target = link.getAttribute('data-target');
        if(target) {
            const targetDiv = document.getElementById(target);
            if(targetDiv) {
                targetDiv.classList.add('active');
            }
        }
	});
});

