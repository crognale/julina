Router.route('/', function() {
	this.response.writeHead(302, {
		'Location': "http://julina.instapage.com/"
	});
	this.response.end();
}, {where: 'server'});


Router.route('/app', function() {
	this.render('Julina_body', {
		data: {content: "App"},
	}, {
		waitOn: function() {
			return [
		Meteor.subscribe("artworks"),
		Meteor.subscribe("images"),
		Meteor.subscribe("users")
		];
		}
	});
});

Router.route('/critiques', {
	template: 'Julina_body',
	data: {
		content: "Critiques"
	}
});

Router.route('/login');
