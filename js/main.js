var stackedCard = new stackedCards({
    selector: '.content-cards',
    layout: "slide",
    transformOrigin: "center",
});

stackedCard.init();

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
        console.log
        item.classList.remove('selected');
    })
    return window.location.hash;
}

window.onhashchange = function(){
    switch(resetBreadcrumbs()){
        case "#Skills":
        navLinks[0].classList.add('selected');
        pageLinks[0].click();
        break;
        case "#Portfolio":
        navLinks[1].classList.add('selected');
        pageLinks[1].click();
        break;
        case "#Experience":
        navLinks[2].classList.add('selected');
        pageLinks[2].click();
        break;
        case "#Education":
        navLinks[3].classList.add('selected');
        pageLinks[3].click();
        break;
        default:
        break;
    }
}