var user;
if (navigator.onLine) {
    user = firebase.auth().currentUser;
    HideInit();
} else {
    offLineHideCards();
}


function HideInit(){
if(user){
        var user_data = database.ref('Users/'+user.uid);
        var favArray = user_data.child('hidden');
        favArray.once('value').then(function(snapshot){
           snapshot.forEach(function(company_id){
               // console.log(company_id.val());       
               //  console.log("in foreach loop");
                var company = Company_Data.child(company_id.val());
                company.once('value').then(function(currentCompany){

                    var clone = $('#cardtemplate').clone().prop({ id: company_id.val() }).appendTo("#hide_content");
                    clone.removeAttr('style');
                    
                    var cl = clone.find('.companyLogo');
                    cl.attr('src', currentCompany.child('CompanyLogo').val());

                    var desc = clone.find('.companyDescription');
                    desc.text(currentCompany.child('Description').val());

                    var cn = clone.find('.companyName');
                    cn.html(currentCompany.child('name').val());
                    
                    var cn = clone.find('.tags');
                    currentCompany.child('Tag').forEach(function (tagIndex) {
                        cn.append('<li class=\"tag ' + tagIndex.val() + '\">' + tagIndex.val() + "<\/li>");
                    })
                })
            })
        })
    }else{
        console.log("YOU SHALL NOT PASS!!!!");
}
}

function showHidden(item){
    var user = firebase.auth().currentUser;
    if (user) {
        var par = $(item).parents('[id]:eq(0)').attr("id");
        var hide = database.ref('Users/' + user.uid + "/hidden");

        hide.once("value").then(function (snapshot) {
            hide.child(parseInt(par)).remove();            
        })

        document.getElementById(par).remove();
        Materialize.toast('Unhidden', 800);


    } else {
        alert("Must be logged in to hide");
    }
}

function offLineHideCards(){
    var company = localStorage.getItem('company_data');
    var company = JSON.parse(company);

    var userO = localStorage.getItem('user');
    var favO = JSON.parse(userO).hidden;

    $("#hide_content").empty();
    $.each(favO, function (index, value) {
        var clone = $('#cardtemplate').clone().prop({ id: value }).appendTo("#hide_content");
        clone.removeAttr('style');
        value = value.toString();
        companyInfo = company[value];
        var cl = clone.find('.companyLogo');
        cl.attr('src', companyInfo.CompanyLogo);
        var cn = clone.find('.companyName');
        cn.html(companyInfo.name);
        var link = clone.find('.applyButton');
        link.attr('href', companyInfo.URL);
        var desc = clone.find('.companyDescription');
        desc.text(companyInfo.Description);

        var cn = clone.find('.tags');
        $.each(companyInfo.Tag, function (index, value) {
            cn.append('<li class=\"tag ' + value + '\">' + value + "<\/li>");
        })
    })
}