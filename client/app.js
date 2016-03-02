Meteor.subscribe("images");
Meteor.subscribe("artworks");

Template.imageUpload.events({
	'change .fileInput': function(event, template) {
		console.log("fileInput changed")
		var files = event.target.files;
		Images.insert(files[0], function (err, fileObj) {
			//Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
			Artworks.insert({
				imgId: fileObj._id,
				username: Meteor.user().username,
				random: Math.random(),
				critiques: []
				//, critique questions, comments, etc
			});
		});
	}
});


Template.App.helpers({
	randArtworks: function() {
		var artwork_id = Session.get("currentArtwork");
		console.log("artwork_id: " + artwork_id);
		if (artwork_id == undefined) {
		 	artwork_id = randArtworkId();
			Session.set("currentArtwork", artwork_id);
		}
		var artwork = Artworks.find({_id: artwork_id});
		return artwork;
	}
});

function randArtworkId() {
	var unseenArtworksQuery = {
		$or: [
		{"critiques":  []},
		{"critiques.user": {$nin: [Meteor.user().username]}}
		]
	};

	if (Artworks.find(unseenArtworksQuery).count() < 1) {
		console.log("no artworks");
		return [];
	}

	while(true) {
		var start = Math.random();
		console.log("start: " + start);
		var results = Artworks.find({
			$and: [unseenArtworksQuery, {
					random: {$gt: start}
				}
			]},
			{
				sort: {random:1}, limit: 1, _id: 1
		});

		if (results.count() >= 1){
		return results.fetch()[0]._id;
		}
	}
}

Template.artwork.helpers({
	username: function() {
		return this.username;
	},
	image: function() {
		return Images.find({_id: this.imgId}).fetch()[0];
	}
});

Template.artwork.events({
	"submit .feedbackForm": function(event) {
		event.preventDefault();

		var text = event.target.feedbackInput.value;
		console.log(text);
		Artworks.update({_id: this._id},{
			$push: {
				critiques: {
					response: text,
					user: Meteor.user().username
				}
			}
		});

		Session.set("currentArtwork", randArtworkId);
	}
});
