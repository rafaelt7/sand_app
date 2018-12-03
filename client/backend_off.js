var Estado = new Backbone.Collection;
Estado.url = '/api/estados';
Estado.fetch({async:true}).done(function(){
	if (!Estado.at(0).get("estado")) {
		window.location.pathname = '/off.html';
}});

setInterval(function() {
 Estado.fetch({async:true}).done(function(){
	if (!Estado.at(0).get("estado")) {
		window.location.pathname = '/off.html';
}})
		
}, 10000);
