Router.route('/', function() {
	this.response.writeHead(302, {
		'Location': "http://julina.instapage.com/"
	});
	this.response.end();
}, {where: 'server'});


//Router.route('/app');
//
Router.route('/app', {
	template:'Julina_body',
	data: {
		content: "App"
	}
});

Router.route('/critiques', {
	template: 'Julina_body',
	data: {
		content: "Critiques"
	}
});

Router.route('/login');
