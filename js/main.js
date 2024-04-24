
// Courtesy of https://github.com/junedchhipa/stacked-cards
let StackedCard = new stackedCards({
    selector: '.stacked-cards-slide',
    layout: "slide",
    transformOrigin: "center",
});
StackedCard.init();

// Linking up the stacked cards to the nav bar links
let navLinks = [
    document.querySelector("a[href='#Skills']"),
    document.querySelector("a[href='#Portfolio']"),
    document.querySelector("a[href='#Experience']"),
    document.querySelector("a[href='#Education']")
]
let pageLinks = [ 
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

let scrollDest = window.innerWidth < 820 ? "end" : "center";
window.addEventListener('hashchange', function(){
    let obj = {block: scrollDest};
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
pageLinks.forEach(item => item.addEventListener('click', function(e) {
    if(!e.isTrusted) return;
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
 let form = document.querySelector('#ajax-contact');
 let formMsg = document.querySelector('#form-feedback');
 function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}
 if(getParam('submit') === 'success') {
     formMsg.classList.remove('hidden');
     setTimeout(() => window.scrollTo(0, window.innerHeight), 100);
 }

// add recaptcha and akismet

//  form.addEventListener('submit', function(event) {
//     event.preventDefault;
//  })

 let email = document.querySelector('#email');
 let msg = document.querySelector('#message');
 let live = document.querySelector('#time');
 live.value = new Date();

// https://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework
//  https://plainjs.com/javascript/ajax/serialize-form-data-into-an-array-46/
 function serializeArray(form) {
    let field, s = [];
    if (typeof form !== 'object' && form.nodeName !== "FORM") return s
    for (let i=0; i<form.elements.length; i++) {
        field = form.elements[i];
        if (field.name && !field.disabled && !['file', 'reset', 'submit', 'button'].includes(field.type)) {
            if (field.type == 'select-multiple') {
                for (let j=0; j<form.elements[i].options.length; j++) {
                    if(field.options[j].selected)
                        s[s.length] = { name: field.name, value: field.options[j].value };
                }
            } else if (!['checkbox', 'radio'].includes(field.type) || field.checked) {
                s[s.length] = { name: field.name, value: field.value };
            }
        }
    }
    return s;
}