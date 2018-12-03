var InventarioViews = [];
var PedidoViews = [];
var Books = new Backbone.Collection;
Books.url = '/api/productos';

Books.fetch({async:true}).done(function(){
 	Books.each(function(producto){
		InventarioViews.push(new InventarioItemView({model:producto}));
		PedidoViews.push(new productosForm({model:producto}));
	});
	_.each(InventarioViews,function(view){
		$('#tb-inventario').append(view.render().el)
	})
	_.each(PedidoViews,function(view){
		$('#pedidos div#total').before(view.render().el)
	});
});
setInterval(function() {
  Books.fetch().done(function(){
  	_.each(InventarioViews,function(view){
		(view.render().el)
	});
  })
  	;
}, 10000);
var InventarioItemView = Backbone.View.extend({
	tagName: "tr",
	template: _.template("<td><%= nombre %></td><td><%= inventario %></td>"),  
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var productosForm = Backbone.View.extend({
	tagName: "div",
	template: _.template("<%= nombre %>: <input id=\"<%= id %>\" type=\"number\" value=\"0\" min=\"0\" max=\"10\">"), 
	events:{
		"change input":"actualizaCosto"
	}, 
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	getValue: function(){
		return this.$("input").val();
	},
	getId: function(){
		return this.$("input")[0].id;
	}

});

var pedido;
var PedidoModel = Backbone.Model.extend({
	defaults:{
	  "productos": [],
	  "ubicacion": "",
	  "detalles": "",
	  "nombre": "",
	  "estado": "En espera",
	  "aceptada": false
	}, 
	url : "/api/pedidos",
	check:function(){
		if (this.get("nombre") && this.get("ubicacion")) { return true}
		return false;
	}

});
var pedidoView = Backbone.View.extend({
	events:{
		"click button":"crearYEnviarPedido",
		'change input[type="number"]':"calculaTotal",
		'click input[type="number"]':"calculaTotal"
	},
	template:_.template("<div>Total: $<%= total %>.00</div>"),
	calculaTotal:function () {
		var total = 0;
		_.each(PedidoViews,function(view, i){
			var numP = view.getValue();
			var precio = view.model.get("precio");
			total+= numP*precio;
		});
		this.$("div#total").html(this.template({'total':total}));
	},
	crearYEnviarPedido:function(){
		pedido = new PedidoModel({nombre: this.$("#nombreCl").val(),ubicacion:this.$("#salonCl").val(),detalles:this.$("#comment").val()})
		if(pedido.check()){
			var masDe1 = false;
			var productosArray = [];
			_.each(PedidoViews,function(view, i){
				var numP = view.getValue();
				productosArray.push(new Object());
				productosArray[i].id  = view.getId();
				productosArray[i].cantidad = parseInt(numP);
				if(numP >0){masDe1 = true}
			});
			pedido.set({productos:productosArray})
			if(masDe1){
				pedido.save().done(function(){
					window.location.hash = (pedido.get("id"));
					window.location.pathname = '/estado-de-pedido.html';
				});
			}
			else{
				alert("El pedido no puede estar vacio");
			}
		}
		else{
			alert("Es necesario que ingrese su nombre y ubicacion")
		}
		return false;
	}
});


var forma = new pedidoView({el:$("form#pedidos")});