var InventarioForm = [];
var Productos = new Backbone.Collection;
Productos.url = '/api/productos';

Productos.fetch().done(function(){
 	Productos.each(function(producto){
		InventarioForm.push(new ProductoView({model:producto}));
	});
	_.each(InventarioForm,function(view){
		$('#productos').append(view.render().el)
	});
});

var InventarioItemView = Backbone.View.extend({
	tagName: "tr",
	template: _.template("<td><%= nombre %></td><td><%= inventario %></td>"),  
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var ProductoView = Backbone.View.extend({
	template: _.template("<%= nombre %>:<br> <input type=\"number\" name=\"pizza\" value=\"<%= inventario %>\"><br>"),  
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	events:{
		'change input[type="number"]':"setCantidad",
		'click input[type="number"]':"setCantidad"
	},
	setCantidad:function(){
		this.model.save({inventario:this.$("input").val()});
	}
});
