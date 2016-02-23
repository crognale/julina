Images.allow({
	'update': function() {
		//add custom authentication code here
		return true;
	},
	'insert': function() {
		//add custom authentication code here
		return true;
	},
	'download': function(userId, fileObj) {
		return true;
	}
});

Meteor.publish("images", function() {
	return Images.find();
});

Meteor.users.allow({
	//For the user.images query, may need to improve security
	'update': function() {
		return true;
	}
});


Meteor.publish("Meteor.users.images", function() {
	return Meteor.users.find({}, {username: 1, images: 1});
});

