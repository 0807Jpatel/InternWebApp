var database = firebase.database();
var Company_Data = database.ref('Company_Data');
var user = firebase.auth().currentUser;

    if(user){
        var user_data = database.ref('Users/'+user.uid);
        var favArray = user_data.child('favorites');
        favArray.once('value').then(function(snapshot){
           snapshot.forEach(function(company_id){
               // console.log(company_id.val());       
               console.log("in foreach loop");
                var company = Company_Data.child(company_id.val());
                company.once('value').then(function(currentCompany){

                    var clone = $('#cardtemplate').clone().prop({ id: company_id.val() }).appendTo("#user_content");
                    clone.removeAttr('style');
                    
                    var cl = clone.find('.companyLogo');
                    cl.css("background-image", "url(" + currentCompany.child('CompanyLogo').val() + ")");
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
