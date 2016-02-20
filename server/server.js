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
