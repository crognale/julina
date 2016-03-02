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

Template.artCritique.events({
	//TODO make secure
	"click .delete": function() {
		Images.remove({_id: this.imgId});
		Artworks.remove({_id: this._id});
	}
});
