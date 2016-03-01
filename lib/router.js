FlowRouter.route('/', {
	name: 'home',
	action: function(params) {
		BlazeLayout.render('Julina_body', {content: "App"});
	}
});

FlowRouter.route('/critiques', {
	name: 'critiques',
	action: function(params) {
		BlazeLayout.render('Julina_body', {content: "Critiques"});
	}
});
