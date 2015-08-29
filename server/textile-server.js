  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.publish("textiles", function(){
      return Textiles.find();
    });
    Meteor.publish("vendors", function(){
      return Vendors.find();
    });
    Meteor.publish("clients", function(){
      return Clients.find();
    });
    Meteor.publish("sales", function(){
      return Sales.find();
    });
  });
