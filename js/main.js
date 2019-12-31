
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

var scrollDest = window.innerWidth < 820 ? "end" : "center";
window.addEventListener('hashchange', function(){
    var obj = {block: scrollDest};
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
 var form = document.querySelector('#ajax-contact');
 var formMsg = document.querySelector('#form-feedback');
 function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

 if(getParam('submit') === 'success') {
     formMsg.classList.remove('hidden');
 }

// add recaptcha and akismet

//  form.addEventListener('submit', function(event) {
//     event.preventDefault;
//  })

 var email = document.querySelector('#email');
 var msg = document.querySelector('#message');

// https://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework
//  https://plainjs.com/javascript/ajax/serialize-form-data-into-an-array-46/
 function serializeArray(form) {
    var field, l, s = [];
    if (typeof form == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;
        for (var i=0; i<len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                if (field.type == 'select-multiple') {
                    l = form.elements[i].options.length; 
                    for (j=0; j<l; j++) {
                        if(field.options[j].selected)
                            s[s.length] = { name: field.name, value: field.options[j].value };
                    }
                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[s.length] = { name: field.name, value: field.value };
                }
            }
        }
    }
    return s;
}