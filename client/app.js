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
				random: Math.random()
				//, critique questions, comments, etc
			});
		});
	}
});


Template.App.helpers({
	randArtworks: function() {
		if (Artworks.find().count() < 1) {
			console.log("no artworks");
			return [];
		}

		while(true) {
			start = Math.random();
			console.log("start: " + start);
			results = Artworks.find({random: {$gt: start}}, {sort: {random:1}, limit: 1});
			if(results.count() >= 1) {
				return results;
			}
		}
	}
});

Template.artwork.helpers({
	username: function() {
		return this.username;
	},
	image: function() {
		return Images.find({_id: this.imgId}).fetch()[0];
	}
});
