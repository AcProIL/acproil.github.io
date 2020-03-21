var dict;

$.getJSON('dicts/' + lang + '-dict.json', function(data) {
    dict = data['dict'];
    document.getElementById('num').innerHTML = dict.length;
    show(Math.floor(Math.random() * dict.length));
});

show = function(i) {
    document.getElementById('lsf').innerHTML = '';
    document.getElementById('search_input').value = dict[i][lang];
    for (var j = 0; j < dict[i].lsf.length; j++) {
        var tr = dict[i].lsf[j];
        document.getElementById('lsf').innerHTML += '<li><strong>' + tr["pos"] + '</strong> ' + tr["translation"] + '</li>';
    }

    document.getElementById('examples').innerHTML = '';
    if (dict[i].examples) {
        for (var j = 0; j < dict[i].examples.length; j++) {
            document.getElementById('examples').innerHTML +=
                "<li>" + dict[i].examples[j][lang] + " → " + dict[i].examples[j].lsf + "</li>";
        }
    } else {
        document.getElementById('examples').innerHTML = 'No example available.';
    }
}

// S E A R C H
search = function() {
    query = document.getElementById('search_input').value;
    if (query == '') {
        return;
    }
    found = -1; // false
    for (var i = 0; i < dict.length; i++) {
        if (query == dict[i][lang]) {
            found = i;
            break;
        }
    }
    if (found < 0) {
        document.getElementById('lsf').innerHTML = '';
        document.getElementById('examples').innerHTML = '';
    } else {
        show(found);
    }
}

document.getElementById('search_input').onkeypress = function(event) {
    if (event.keyCode == 13 || event.which == 13) {
        search();
    }
};