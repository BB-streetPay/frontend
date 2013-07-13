$$('document').ready(function(){

    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var project_id = sp_urlParams["project_id"];
    
    var url = sp_server_url+'/project/'+project_id;

    var data = {};
    
    var dataType = 'json';
    
    var success = function(json) {

        if(!json || json.error) {
        
            console.log('ERROR retrieving project: ' + json.error);
            Lungo.Notification.show('ERROR retrieving project', 'warning', 2);
        
        } else {
        
            var project = json;


        }
    }

    // AJAX callback
    //Lungo.Service.get(url, data, success, dataType);
    
    //Money Stepper

    var changeMoney = function(delta){
        var actualNumber = parseFloat($$("#moneyInput").val().replace(",","."));
        $$("#moneyInput").val(Math.max(0,(actualNumber+delta).toFixed(2))+"€");
    }

    $$('#plusButton').tap(function(){
        changeMoney(0.2);
    });

    $$('#minusButton').tap(function(){
        changeMoney(-0.2);
    });

    //User image getter

    function searchImages(){
        function gravatarImage(email){
            email = email.toLowerCase().trim();
            return 'http://www.gravatar.com/avatar/' + md5(email) + '?s=200';
        }

        var src;
        if (validateEmail($$("#emailInput").val())) {
            src = gravatarImage($$("#emailInput").val());
            $$("#userImage").css("width","200px");
            $$("#userImage").css("height","200px");
        }else{
            src = "http://"+($$("#emailInput").val().replace(" ","."))+".jpg.to";
            $$("#userImage").css("max-width","200px");
            $$("#userImage").css("max-height","200px");
        }

        $$("#userImage").attr("src",src);
        $$("#userImage").css("visibility","visible");
        

    };

    $$('#searchButton').tap(function(){
        searchImages();
    });



});