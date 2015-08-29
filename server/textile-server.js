  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.publish("Textiles", function(){
      return Textiles.find();
    });
    Meteor.publish("Vendors", function(){
      return Vendors.find();
    });
    Meteor.publish("Clients", function(){
      return Clients.find();
    });
    Meteor.publish("Sales", function(){
      return Sales.find();
    });    
  });
