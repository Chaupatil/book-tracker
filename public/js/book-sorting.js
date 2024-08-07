function getBooks() {
    var books = [];
    var nl = document.querySelectorAll('div.abook');
    var len = nl.length;
    for (var i = 0; i < len; i++) {
        books[i] = nl[i];
    }
    return books;
}

function by(propName) {
    return function(obj1, obj2) {
        var v1 = obj1.getAttribute('data-' + propName);
        var v2 = obj2.getAttribute('data-' + propName);
        if (propName === 'rating') {
            v1 = parseInt(v1);
            v2 = parseInt(v2);
        } else if (propName === 'title') {
            var tmp = v2;
            v2 = v1;
            v1 = tmp;
        }
        if (v1 > v2) { return -1; }
        else if (v1 < v2) { return 1; }
        else { return 0; }
    }
}

function showBooks(books) {
    var len = books.length, nu = document.createElement('section');
    nu.id = 'allbooks';
    for(var i = 0; i < len; i++) {
        nu.appendChild(books[i]);
    }
    document.getElementsByTagName('main')[0].replaceChild(nu, document.getElementById('allbooks'));
}

function changeIfMatch(reg, str) {
    var matches = reg.exec(str);
    if(matches) {
        var books = getBooks();
        books.sort(by(matches[1]));
        showBooks(books);
    }
}

function sortBooks(event) {
    if(event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    var target = event.target || window.event.srcElement;
    changeIfMatch(/^sort-(rating|title|date)$/, target.id);
}

if(location.search) {
    changeIfMatch(/\?sort=(rating|title|date)$/, location.search);
}

var sorters = document.getElementById('sorters');
if(sorters.addEventListener) {
    sorters.addEventListener('click', sortBooks, false);
} else {
    sorters.attachEvent('onclick', sortBooks);
}
