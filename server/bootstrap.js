Meteor.startup(function () {
	Artworks._ensureIndex({random: 1}); //Speed up random query
});
