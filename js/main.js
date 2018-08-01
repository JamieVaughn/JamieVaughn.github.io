
// Courtesy of https://github.com/junedchhipa/stacked-cards
var stackedCard = new stackedCards({
    selector: '.stacked-cards-slide',
    layout: "slide",
    transformOrigin: "center",
});
stackedCard.init();

// Linking up the stacked cards to the nav bar links
var navLinks = [
    document.querySelector("a[href='#Skills']"),
    document.querySelector("a[href='#Portfolio']"),
    document.querySelector("a[href='#Experience']"),
    document.querySelector("a[href='#Education']")
]
var pageLinks = [ 
    document.querySelector("#Skills"),
    document.querySelector("#Portfolio"),
    document.querySelector("#Experience"),
    document.querySelector("#Education")
];
function resetBreadcrumbs() {
    navLinks.forEach(function(item){
        item.classList.remove('selected');
    })
    return window.location.hash;
}
window.addEventListener('hashchange', function(){
    var obj = {block: "center"};
    switch(resetBreadcrumbs()){
        case "#Skills":
        navLinks[0].classList.add('selected');
        pageLinks[0].click()
        pageLinks[0].scrollIntoView(obj);
        break;
        case "#Portfolio":
        navLinks[1].classList.add('selected');
        pageLinks[1].click();
        pageLinks[1].scrollIntoView(obj);
        break;
        case "#Experience":
        navLinks[2].classList.add('selected');
        pageLinks[2].click();
        pageLinks[2].scrollIntoView(obj);
        break;
        case "#Education":
        navLinks[3].classList.add('selected');
        pageLinks[3].click();
        pageLinks[3].scrollIntoView(obj);
        break;
        default:
        break;
    }
}, false)
pageLinks.forEach(item => item.addEventListener('click', function() {
    history.pushState(null, null, "#" + this.id)
    switch(resetBreadcrumbs()) {
        case "#Skills":
        navLinks[0].classList.add('selected');
        break;
        case "#Portfolio":
        navLinks[1].classList.add('selected');
        break;
        case "#Experience":
        navLinks[2].classList.add('selected');
        break;
        case "#Education":
        navLinks[3].classList.add('selected');
        break;
        default:
        break;
    }
}))

 // Form Handler
 var email = document.querySelector('#email');
 var msg = document.querySelector('#message');
 var handler = () => email.style.visibility = "hidden";
 if(email.value && !email.activeElement) {
     handler();
 }
 function postMsg() {
     return;
 }