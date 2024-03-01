// document.addEventListener("DOMContentLoaded", ()=> {
    
var logout = document.getElementById('logOut') as HTMLButtonElement;
const studentNavLinks = document.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>;
const studentContentDivs = document.querySelectorAll('.content div') as NodeListOf<HTMLDivElement>;
var welcome = document.getElementById('welcome-text') as HTMLElement;
var userName:any = sessionStorage.getItem('currentUser')
userName = JSON.parse(userName)
welcome.innerHTML = `Welcome ${userName.name} Sishya 👋`

logout.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
})

studentNavLinks.forEach(link => {
	link.addEventListener('click', (event:Event) => {
        event.preventDefault();

		// Remove active class from all nav links
		studentNavLinks.forEach(navLink => navLink.classList.remove('active'));

		// Add active class to clicked nav link
		link.classList.add('active');

		// Hide all content divs
		studentContentDivs.forEach(div => div.classList.remove('active'));

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