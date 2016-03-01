Meteor.subscribe("images");
Meteor.subscribe("artworks");

Template.Critiques.helpers({
	userArtworks: function() {
		return Artworks.find({username: Meteor.user().username});
	},
});

Template.artCritique.helpers({
	image: function() {
		return Images.find({_id: this.imgId}).fetch()[0];
	},

	critiques: function() {
		return this.critiques;
	}
});
