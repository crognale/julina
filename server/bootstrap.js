Meteor.startup(function () {
	Artworks._ensureIndex({random: 1}); //Speed up random query

	if (Prompts.find().count() == 0) {
		var data = JSON.parse(Assets.getText("prompts.json"));

		data.forEach(function (item, index, array) {
			Prompts.insert(item);
		});
	}
});
