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
    console.log('vendor lookup');
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
    console.log(event.target.name.value);
    Meteor.call("addVendor", event.target.name.value)

    event.target.name.value="";
    //prevent default
    return false;
  }
});
