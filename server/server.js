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
	},
	'remove': function() {
		//TODO improve security
		return true;
	}
});

Meteor.publish("images", function() {
	return Images.find();
});

Meteor.publish("prompts", function() {
	return Prompts.find();
});

Meteor.publish("artworks", function() {
	return Artworks.find();
});

Artworks.allow({
	'update': function() {
		return true;
	},
	'insert': function() {
		return true;
	},
	'remove': function() {
		//TODO improve security
		return true;
	}
});
