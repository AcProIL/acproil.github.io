var dict;

var from_select = document.getElementById('from-select');
var to_select = document.getElementById('to-select');

show = function(i) {
    document.getElementById('to').innerHTML = '';
    for (var j = 0; j < dict[i][to].length; j++) {
        var tr = dict[i][to][j];
        document.getElementById('to').innerHTML += '<li><strong>' + tr["pos"] + '</strong> ' + tr["translation"] + '</li>';
    }

    $('#examples').html('');
    $('#examples-col').addClass('is-hidden');
    if (dict[i].examples) {
        $('#examples-col').removeClass('is-hidden');
        for (var j = 0; j < dict[i].examples.length; j++) {
            document.getElementById('examples').innerHTML +=
                "<li>" + dict[i].examples[j][from] + " → " + dict[i].examples[j][to] + "</li>";
        }
    }
}

// S E A R C H
search = function() {
    from = from_select.options[from_select.selectedIndex].text;
    to = to_select.options[to_select.selectedIndex].text;

    $.getJSON('dicts/' + from + '-' + to + '.json', function(data) {
        dict = data;
        query = document.getElementById('search_input').value;
        if (query == '') {
            return;
        }
        $('#query').html(query);
        found = -1; // false
        for (var i = 0; i < dict.length; i++) {
            if (query == dict[i][from]) {
                found = i;
                break;
            }
        }
        if (found < 0) {
            document.getElementById('to').innerHTML = '';
            document.getElementById('examples').innerHTML = '';
        } else {
            show(found);
        }
    });
}

document.getElementById('search_input').onkeypress = function(event) {
    if (event.keyCode == 13 || event.which == 13) {
        search();
    }
};