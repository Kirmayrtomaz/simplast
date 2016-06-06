
App = new (Model({
	conf : {
		apiHost : "https://api.vieiralves.com",
		originalMapCenter : [-3.1059760833333, -60.019821166667],
		originalMapZoom : 16,
	}
}))();


App.busca = (function(){
	
	var categoriaSelecionada = '';

	var pesquisar = function() {

		App.trigger('topo.ativarCarregando');

		var query = prepararBusca();
		
		$.get( App.conf.apiHost + '/mapa?' + query, function(resposta) {})
		.done(function(resposta) {
	    	App.trigger('mapa.exibirPins', resposta.resposta);
	  	})
	  	.fail(function(resposta) {
	    	App.trigger('erro.mostrar', {titulo : "Ooooops", subtitulo : "Algo inesperado aconteceu o/", mensagem : "Mas nao se preocupe, estamos corrigindo :D"});
	  	})
	  	.always(function(resposta) {
			App.trigger('topo.desativarCarregando');
	  	});

	}

	var prepararBusca = function() {
		var query = '';

		var termo = $('.js-busca-termo').val();
		if(termo !== undefined) {
			query += 'termo=' + termo;
		}

		var categoria = categoriaSelecionada;
		if(categoriaSelecionada !== '') {
			query += '&categoria=' + categoria;
		}

		return query;
	}

	var selecionarCategoria = function(categoria) {
		categoriaSelecionada = categoria;
	}

	var limparCategoria = function() {
		categoriaSelecionada = '';
	}

	App.on('busca.pesquisar', pesquisar);
	App.on('categoria.selecionarCategoria', selecionarCategoria);
	App.on('categoria.limparCategoria', limparCategoria);
	

	// categoriaAtiva = "";


	// termoDigitado = function ()
	// {
	// 	return document.querySelector(".js-busca-termo").value;
	// }

	// prepararBusca = function()
	// {
	// 	var busca = {};
	// 	if(self.categoriaAtiva)
	// 	{
	// 		busca.categoria = self.categoriaAtiva;
	// 	}

	// 	if(self.termoDigitado())
	// 	{
	// 		busca.termo = self.termoDigitado();
	// 	}

	// 	return busca;
	// }

	// adicionarCategoria = function(categoria)
	// {
	// 	App.trigger("topo.adicionarTag", categoria);

	// 	var ativos = document.querySelectorAll(".js-categoria-link.ativo");
	// 	for (var i = ativos.length - 1; i >= 0; i--) 
	// 	{
	// 		ativos[i].classList.remove("ativo");
	// 	};

 //        var categorias = document.querySelectorAll(".js-categoria-link");
 //        for (var i = categorias.length - 1; i >= 0; i--) 
 //        {
 //        	var categoriaTemp = categorias[i].getAttribute("data-categoria");
 //        	if(categoriaTemp == categoria)
 //        	{
 //        		categorias[i].classList.add("ativo");
 //        	}
 //        };

 //        self.categoriaAtiva = categoria;
 //        App.trigger('topo.adicionarTag', categoria);
 //        App.trigger("mapa.pesquisar", self.prepararBusca());
	// }

	// removerCategoria = function()
	// {
 //        categoriasAtivas = document.querySelectorAll(".js-categoria-link.ativo");
 //        for (var i = categoriasAtivas.length - 1; i >= 0; i--) {
 //        	categoriasAtivas[i].classList.remove("ativo");
 //        };
 //        self.categoriaAtiva = "";
	// }

	// App.on("busca.adicionarCategoria", self.adicionarCategoria);
	// App.on("busca.removerCategoria", self.removerCategoria);

	return {
		// prepararBusca : prepararBusca
	}

})();


