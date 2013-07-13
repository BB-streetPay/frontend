$$('document').ready(function(){

    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var projectId = sp_urlParams["projectId"];
    
    var url = sp_server_url+'/project/'+projectId;

    var data = {};
    
    var dataType = 'json';
    
    var success = function(json) {

        if(!json || json.error) {
        
            console.log('ERROR retrieving project: ', json.error);
            Lungo.Notification.show('ERROR retrieving project', 'warning', 2);
        
        } else {
        
            var project = json;

            $$("#project-short").html(
                '<li class="light">'+
                    '<strong>'+project.name+'</strong>'+
                '</li>'
            );

            $$("#project-long").html(   
                '<ul>'+
                    '<li class="light">'+
                        '<strong>'+project.name+'</strong>'+
                    '</li>'+
                    '<li>'+
                        '<strong>'+project.description+'</strong>'+
                    '</li>'+
                '</ul>'+
                '<img style="margin-bottom:10px;" src="'+project.imageUrl+'" width="200" />'
            );

            var payments = project.payments;

            for (var i = 0; i < payments.length; i++) {

                var payment = payments[i];

                console.log(payment.imageUrl);

                $$("#contributions").append(
                    '<li data-action="search" class="thumb" style="text-align: left;"'+
                        'data-image="'+payment.imageUrl+'">'+
                            '<strong>'+payment.nick+'</strong>'+
                            '<small>'+payment.money+'€</small></li>');

            }

            Lungo.init();

        }
    }

    console.log(url);

    // AJAX callback
    Lungo.Service.get(url, data, success, dataType);
    
    //Money Stepper

    var changeMoney = function(delta){
        var actualNumber = parseFloat($$("#paymentMoney").val().replace(",","."));
        $$("#paymentMoney").val(Math.max(0,(actualNumber+delta).toFixed(2))+"€");
    }

    $$('#plusButton').tap(function(){
        changeMoney(0.2);
    });

    $$('#minusButton').tap(function(){
        changeMoney(-0.2);
    });

    //User image getter

    function showImage(src) {

        $$("#paymentImageUrl").val(src);
        $$("#userImage").attr("src",src);
        $$("#userImage").css("visibility","visible");
    }

    function searchImages(){

        function gravatarImage(email){
            email = email.toLowerCase().trim();
            return 'http://www.gravatar.com/avatar/' + md5(email) + '?s=200';
        }

        if (validateEmail($$("#paymentNick").val())) {
            
            var src = gravatarImage($$("#paymentNick").val());
            showImage(src);

        }else{

            var url = "https://ajax.googleapis.com/ajax/services/search/images?&v=1.0&q="+($$("#paymentNick").val().replace(" ","."));

            var getFirstImageGoogle = function(json) {

                var src = json.responseData.results[0].tbUrl;
                showImage(src);
            }

            // AJAX callback
            $.ajax({
                type: 'GET',
                data: {},
                url: url,
                success: getFirstImageGoogle,
                dataType: 'jsonp'
            });
        }  

    };

    $$('#searchButton').tap(function(){
        searchImages();
    });


    $$('#contributeButton').tap(function(){

        var newUrl = sp_server_url+'/payment/';

        var money = parseFloat($$("#paymentMoney").val().replace(",","."));
        money = Math.max(0,(money).toFixed(2));

        data = {
            paymentNick:     $$('#paymentNick').val(),
            paymentMoney:    money,
            paymentImageUrl: $$('#paymentImageUrl').val(),
            paymentProject:  projectId
        };

        var contribute = function(json) {

            if(!json || json.error) {

                console.log('ERROR contributing: ', json.error);
                Lungo.Notification.show('ERROR contributing', 'warning', 2);

            } else {

                var event = json;
                console.log('Contribution done');
                Lungo.Notification.show('Contribution done', 
                    'thumbs-up', 2, function() {
                        //window.location.replace("event-edit.html?eventId="+event._id);
                    });
            }
        }
        
        // AJAX callback
        Lungo.Service.post(newUrl, data, contribute, dataType);

    });


});