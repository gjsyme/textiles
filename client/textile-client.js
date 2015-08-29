Meteor.subscribe("textiles");
Meteor.subscribe("clients");
Meteor.subscribe("vendors");
Meteor.subscribe("sales");

//data representation helpers
Template.textiles.helpers({
  textiles: function(){
      return Textiles.find();
  }
});
Template.clients.helpers({
  clients: function(){
    return Clients.find();
  }
});
Template.vendors.helpers({
  vendors: function(){
    return Vendors.find();
  }
});
Template.sales.helpers({
  sales: function(){
    return Sales.find();
  }
});

//event handlers
Template.textiles.events({

});
Template.clients.events({

});
Template.vendors.events({

});
Template.sales.events({

});
Template.addVendor.events({
  "submit form":function(event){
    Meteor.call("addVendor", event.target.name.value)
    event.target.name.value="";
    //prevent default
    return false;
  }
});
Template.addClient.events({
  "submit form":function(event){
    Meteor.call("addClient", event.target.name.value)
    event.target.name.value="";
    //prevent default
    return false;
  }
});
Template.addSale.events({
  "submit form": function(event){
    var textile = event.target.textile_id.value;
    var volume = event.target.volume.value;
    var client = event.target.client_id.value;
    Meteor.call("addSale", textile, volume, client);
    //prevent default
    return false;
  }
})
