var project_id;

$$('document').ready(function(){

    project_id = sp_urlParams["project_id"];
    
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
    Lungo.Service.get(url, data, success, dataType);

});