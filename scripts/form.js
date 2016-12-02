function addSuggest(){
    // get ids
    var Name = document.getElementById("NameField");
    var Email = document.getElementById("EmailField");
    var CompanyName = document.getElementById("CompanyName");
    var urllink = document.getElementById("URL");
    var Deadline = document.getElementById("DeadLine");
    var Locations = document.getElementById("Locations");
    var Description = document.getElementById("Description");
    var dateReg = /^\d{2}\/\d{2}\/\d{2}$/ ;
    var urlReg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(Name.value == "" || Email.value == "" || CompanyName.value == "" || urllink.value == ""){
        alert("Fields cointaning * are mandatory");
    }else if(!emailReg.test(Email.value)){
        alert("Invalid Email");
    }else if(!urlReg.test(urllink.value)){
        alert("Invalid URL");
    }else if (!dateReg.test(Deadline.value) && Deadline.value != ""){
        alert("Invalid Date Format");
    }
    else{
        var user = firebase.auth().currentUser;
        var database = firebase.database();
        var suggestions = database.ref('Suggestions/');
        suggestions.push({
            name: Name.value,
            email: Email.value,
            CompanyName: CompanyName.value,
            urllink: urllink.value,
            deadline: Deadline.value,
            location: Locations.value,
            Description: Description.value
        });
        LoadUser();
        alert("Thank you!");
    }
}