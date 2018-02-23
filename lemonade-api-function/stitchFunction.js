exports = function(data){
  
    var lemonadeSvc = context.services.get("lemonade");
    
    console.log(data.city);
    console.log(data.first_name);
    console.log(data.last_name);
    
    var lemonadePayload = {};
    lemonadePayload.type = data.type;
    lemonadePayload.address = {};
    lemonadePayload.address.street_number = data.street_number;
    lemonadePayload.address.street = data.street;
    lemonadePayload.address.city = data.city;
    lemonadePayload.address.state = data.state;
    lemonadePayload.address.postal_code = data.postal_code;
    lemonadePayload.user = {};
    lemonadePayload.user.first_name = data.first_name;
    lemonadePayload.user.last_name = data.last_name;
    var dob = new Date(data.date_of_birth);
    lemonadePayload.user.date_of_birth = dob.getTime()/1000|0;
    lemonadePayload.user.email = data.email;
    lemonadePayload.dog_biting_history = data.dog_biting_history;
    lemonadePayload.type = data.type;
    
    console.log("payload is: " + JSON.stringify(lemonadePayload))
     
      var response;
    
    var res = lemonadeSvc.post({ 
      "url": context.values.get("LemonadeAPIHost") + "/v1/quotes",
      "headers": {'Accept': ['application/json'], 'Cache-Control':['no-cache'], 'Content-Type': ['application/json'], 'Authorization': ['Token '+ context.values.get("LemonadeAPIKey")]},
      "body": JSON.stringify(lemonadePayload)
    });
  
    response = EJSON.parse(res.body.text());
    console.log("the Lemonade quote is: " + JSON.stringify(response));
    
    return {res: response};
  };