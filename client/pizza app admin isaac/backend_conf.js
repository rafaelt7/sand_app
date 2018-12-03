var EstadoView =  Backbone.View.extend({
		template: _.template('<label><input type="radio" name="gender" value="Conectado" <% estado ? print("checked"):"" %>> Conectado<br></label>'+
			'<input type="radio" name="gender" value="Desconectado" <% !estado? print("checked"):"" %>> Desconectado<br>'
				  ),

		render:function(){
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		events:{
			'click' : 'cambiaEstado'	
		},
		cambiaEstado:function(){
			if(this.$("input:checked").val()=="Conectado"){
				this.model.save({estado:true})
			}else{
				this.model.save({estado:false})				
			}
		}
	});
var EstadoView1;
var Estado = new Backbone.Collection;
Estado.url = '/api/estados';
Estado.fetch().done(function(){
	EstadoView1 = new EstadoView({model:Estado.at(0),el:$("form#control")});
	EstadoView1.render();
});


