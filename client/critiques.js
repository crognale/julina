Meteor.subscribe("images");
Meteor.subscribe("artworks");
Meteor.subscribe("promptsPerArtwork");

clientPromptsPerArtwork = new Mongo.Collection("clientPromptsPerArtwork");

Template.Critiques.helpers({
	userArtworks: function() {
		return Artworks.find({username: Meteor.user().username});
	},
});

Template.artCritique.helpers({
	image: function() {
		return Images.find({_id: this.imgId}).fetch()[0];
	},

	prompts: function() {
		return clientPromptsPerArtwork.find({_id: this._id}).fetch()[0]["prompts"];
	}
});


Template.artCritique.events({
	//TODO make secure
	"click .delete": function() {
		Images.remove({_id: this.imgId});
		Artworks.remove({_id: this._id});
	}
});
