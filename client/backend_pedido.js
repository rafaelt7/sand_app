var InventarioViews = [];
var PedidoViews = [];
var Books = new Backbone.Collection;
Books.url = '/api/productos';

Books.fetch({async:true}).done(function(){
 	Books.each(function(producto){
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
var forma;
var pedidoC = new Backbone.Model({id:window.location.hash.substr(1)});
pedidoC.urlRoot= 'api/pedidos';
pedidoC.fetch().done(function(){
	forma.render();
});

var pedidoView = Backbone.View.extend({
	template: _.template("<div><b>Estado:</b> <% estado == 'En espera' ? print(estado+ ' por ser aceptada'): aceptada ? print('Aceptada - '+ estado): print('Rechazada') %>	</div>"+
						"<div><b>A nombre de:</b> <%= nombre %>	</div>"+
						"<div><b>Destino:</b> <%= ubicacion %>	</div>"+
						"<div id=\"lista\"><b>Productos:</b><div>"+ 
						"</div></div>"+
						"<div id=\"total\"></div>"),
	render:function () {
		this.$el.html(this.template(this.model.attributes));
		var total =0;
		var lista = _.template("<div style=\"margin-left: 3%\">	<%= nombre %>:	<%= cantidad %></div>");
		_.each(this.model.get("productos"),function(producto){
			if (producto.cantidad > 0) {
				this.$("#lista").append(lista({nombre:Books.get(producto.id).get("nombre"), cantidad:producto.cantidad}));
				total+=Books.get(producto.id).get("precio") * producto.cantidad;
			}
		});
		this.$("#total").html("<b>Total:</b> $"+total+".00");
		return this;
	}
});

forma = new pedidoView({model:pedidoC, el:$("#pedido-info")});
setInterval(function() {
	forma.model.fetch().done(function(){
		forma.render();
	})
}, 5000);