var Pedidos = new Backbone.Collection;
var Productos = new Backbone.Collection;
var PedidosViews = [];
Pedidos.url = '/api/pedidos';
Productos.url = '/api/productos';
Pedidos.fetch().done(function(){
	Productos.fetch().done(function(){
	 	Pedidos.each(function(producto){
			PedidosViews.push(new PedidoView({model:producto}));
		});
		_.each(PedidosViews,function(view){
			$('#pedidos-list').append(view.render().el)
		});
	});
});
setInterval(function() {
	Pedidos.fetch().done(function(){
		Productos.fetch().done(function(){
		 	Pedidos.each(function(producto){
				PedidosViews.push(new PedidoView({model:producto}));
			});
			_.each(PedidosViews,function(view){
				(view.render().el)
			});
		});
	});
}, 3000);


var PedidoView = Backbone.View.extend({
	tagName:"tr",
	template:_.template("<td><%= nombre %></td><td id='pedido'></td><td><%= ubicacion %></td><td><%= detalles %></td><td id='total'> TOTAL </td><td>"+
		
		'<select>'+
		  '<option value="Rechazado" <% estado == "Rechazado" ? print("selected") : "" %> >Rechazado</option>'+
		  '<option value="En Espera" <% estado == "En espera" ? print("selected") : "" %> >En espera</option>'+
		  '<option value="Cocinando" <% estado == "Cocinando" ? print("selected") : "" %> >Cocinando</option>'+
		  '<option value="En camino" <% estado == "En camino" ? print("selected") : "" %> >En camino</option>'+
		  '<option value="En el destino" <% estado == "En el destino" ? print("selected") : "" %> >En  el destino</option>'+
		  '<option value="Entregado" <% estado == "Entregado" ? print("selected") : "" %> >Entregado</option>'+
		'</select>'

		+"</td>"),
	render:function () {
		this.$el.html(this.template(this.model.attributes));
		var total =0;
		var lista = _.template("<%= nombre %>:	<%= cantidad %>;");
		var self = this;
		_.each(this.model.get("productos"),function(producto,index){
			if (producto.cantidad > 0) {
				self.$("#pedido").append(lista({nombre:Productos.get(producto.id).get("nombre"), cantidad:producto.cantidad}));
				total+=Productos.get(producto.id).get("precio") * producto.cantidad;
			}
		});
		this.$("#total").html("<b>Total:</b> $"+total+".00");
		return this;
	}, 
	events:{
		'change select': 'cambiarEstado'
	},
	cambiarEstado:function(){
		if (this.$("select").val()=="Entregado") {
			var self = this;
			_.each(this.model.get("productos"),function(producto,index){
				if (producto.cantidad > 0) {
					Productos.get(producto.id).save({inventario:Productos.get(producto.id).get("inventario") - producto.cantidad});
				}
			});
		}
		if (this.$("select").val() == "Rechazado" || this.$("select").val() == "En espera") {
			this.model.set({aceptada:false})
		}else{
			this.model.set({aceptada:true})			
		}
		this.model.save({estado:(this.$("select").val())});

	}
});

