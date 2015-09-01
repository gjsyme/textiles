Meteor.subscribe("textiles");
Meteor.subscribe("clients");
Meteor.subscribe("vendors");
Meteor.subscribe("sales");

Template.registerHelper("vendor_by_id", function(id){
  return Vendors.findOne({_id: id}).name;
});
Template.registerHelper("client_by_id", function(id){
  return Clients.findOne({_id: id}).name;
});
Template.registerHelper("textile_by_id", function(id){
  return Textiles.findOne({_id: id}).name;
});
//data representation helpers
Template.textiles.helpers({
  textiles: function(){
      return Textiles.find();
  }
});
Template.addTextile.helpers({
  vendors: function(){
    return Vendors.find();
  }
});
Template.textile.helpers({
  // moved to global
  // vendor_by_id: function(id){
  //   return Vendors.findOne({_id: id}).name;
  // }
})
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
Template.addSale.helpers({
  vendors: function(){
    return Vendors.find();
  },
  clients: function(){
    return Clients.find();
  },
  textiles_for_vendor: function(){
    if(Template.instance().vendorID.get()!==0){
      return Textiles.find({"vendor_id": Template.instance().vendorID.get()});
    }else{
      //return Textiles.find();
      //match functionality for now, but maybe will have desire to list all when no vendor selected and react to fill in vendor?
      return Textiles.find({"vendor_id": Template.instance().vendorID.get()});
    }
  },
  unit_for_textile: function(){
    var textile = Template.instance().textileID.get();
    // console.log("textile: "+textile);
    // console.log("units for textile: "+Textiles.findOne({"_id":textile}));
    var lookup = Textiles.findOne({"_id":textile});
    // console.log(lookup);
    if(lookup===undefined){
      return "";
    }else{
      return lookup.unit;
    }
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
  "submit form#add": function(event){
    console.log("addTransaction submit");
    var textile = event.target.textile_id.selectedOptions[0].value;
    var volume = event.target.volume.value;
    var client = event.target.buyer.selectedOptions[0].value;
    //vendor is tied to textile 1:1
    Meteor.call("addSale", textile, volume, client);
    //prevent default
    return false;
  },
  "change select#vendor": function(event){
    var vendor = event.target.selectedOptions[0].value;
    Template.instance().vendorID.set(vendor);
  },
  "change select#textile": function(event){
    var textile = event.target.selectedOptions[0].value;
    Template.instance().textileID.set(textile);
  }
});
Template.addTextile.events({
  "submit form": function(event){
    var name = event.target.name.value;
    var unit = event.target.unit.value;
    var vendor = event.target.vendor.selectedOptions[0].value;
    Meteor.call("addTextile", name, vendor, unit);
    return false;
  }
});

//onCreated Events
Template.addSale.onCreated(function(){
  this.vendorID = new ReactiveVar(0);
  this.textileID = new ReactiveVar(0);
});
