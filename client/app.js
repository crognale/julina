Meteor.subscribe("images");
Meteor.subscribe("Meteor.users.images");

Template.imageUpload.events({
	'change .fileInput': function(event, template) {
		console.log("fileInput changed")
		var files = event.target.files;
		Images.insert(files[0], function (err, fileObj) {
			//Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
			console.log("inserted now file with id: ", fileObj._id);
			console.log("err: " + err);
			console.log("user: "+ Meteor.user().username);
			console.log("userId: " + Meteor.userId());
			Meteor.users.update(Meteor.userId(), {
				$push: {
					images: fileObj._id
				}
			});
		});
	}
});


Template.App.helpers({
	images: function() {
		return Images.find({});
	}
});

Template.image.helpers({
	filename: function() {
		return this.name();
	},

	username: function() {
		query = {
			images: {$in: [this._id]}
		};

		fields = {
			username: 1
		};

		doc = Meteor.users.find(query, fields).fetch()[0];
		return doc.username
	}
});
