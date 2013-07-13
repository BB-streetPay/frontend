// URL Params
var sp_urlParams = {};
(function () {
    var match,
        pl     = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query  = window.location.search.substring(1);

    while (match = search.exec(query)) {
       sp_urlParams[decode(match[1])] = decode(match[2]);
    }
})();

// Searh
$$('document').ready(function(){
    Lungo.dom('input[type=search]').on('keyup', function() {
        Lungo.dom('li[data-action=search]').each(function() {
            toSearch = Lungo.dom('input[type=search]').val().toLowerCase();
            elementText = $$(this).text().toLowerCase();
            if (elementText.match(toSearch)) {
                $$(this).show();
            } else {
                $$(this).hide();
            };
        });
    });
});

// Date format date
var sp_dateFormat = "DD/MM/YYYY HH:mm:ss";

// Date to string
var sp_dateToString = function(date) {
    if(!date) {
        return "--"
    } else {
        return moment(date).format(cm_dateFormat);
    }
};

// SERVER URL
var sp_server_url = "http://arcane-forest-9458.herokuapp.com";