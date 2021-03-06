Router.map(function(){
  this.route('home', {path: '/'});
  this.route('textiles', {path: '/textiles'});
  this.route('vendors', {path: '/vendors'});
  this.route('addVendor', {path: '/add-vendor'});
  this.route('clients', {path: '/clients'});
  this.route('sales', {path: '/sales'});
});

Textiles = new Mongo.Collection("textiles"); //real world item: textile units for sale
Vendors = new Mongo.Collection("vendors"); //real world sellers of textiles
Clients = new Mongo.Collection("clients"); //real world buyers
Sales = new Mongo.Collection("sales"); //tracker of the transaction between seller and buyer for a textile

//common code
Meteor.methods({
  addTextile: function(name, vendor_id, unit, price, inventory){
    Textiles.insert({
      name: name,
      vendor_id: vendor_id,
      unit: unit,
      price: price,
      inventory: inventory
    });
  },
  addSale: function(textile_id, volume, client_id){
    Sales.insert({
      textile: textile_id,
      volume: volume,
      client: client_id
    });
    var inventory = Textiles.findOne({"_id": textile_id}).inventory;
    inventory = inventory - volume;
    Textiles.update({"_id": textile_id}, {$set: {"inventory": inventory}});
  },
  addClient: function(name){
    Clients.insert({
      name: name
    });
  },
  addVendor: function(name){
    Vendors.insert({
      name: name
    })
  }
});
