Meteor.subscribe("images");
Meteor.subscribe("artworks");
Meteor.subscribe("prompts");

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


/* Gets a session variable, or sets it persistently to a default value
 * if it doesn't exist.
 */
function sessionGetPersistent(sessionVar, defaultVal) {
	var result = Session.get(sessionVar);
	console.log(sessionVar, ": ", result);
	if (result == undefined) {
		result = defaultVal;
		if (result !== "") {
			Session.setPersistent(sessionVar, result);
		}
	}
	return result;
}

Template.App.helpers({
	randArtworks: function() {
		var artwork_id = sessionGetPersistent("currentArtwork", randArtworkId());
		var artwork = Artworks.find({_id: artwork_id});
		if (artwork.count() < 1) {
			artwork_id = randArtworkId();
		  artwork = Artworks.find({_id: artwork_id});
			Session.setPersistent("currentArtwork", artwork_id);
		}
		return artwork;
	}
});

function randArtworkId() {
	//TODO replace query. This is just a test to see if grouping works
	/*
	var unseenArtworksQuery = 
		{"critiques.user": {$nin: [Meteor.user().username]}};
		*/
	var unseenArtworksQuery = {};

	//TODO ACTUALLY NEED list of artworks with < (5) comments from user
	/*
	Meteor.call("userAnsweredPrompts", function(err, result) {
		console.log(result);
	});
	*/

	if (Artworks.find(unseenArtworksQuery).count() < 1) {
		console.log("no artworks");
		return "";
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

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* Uses the less efficient method, since there will probably be relatively
 * few prompts. Tries to choose a prompt that the user has not answered
 * for the current picture.
 */
function randPromptId() {
	var count = Prompts.find().count();
	console.log(count + "prompts");
	var ind = getRandomInt(0, count-1);
	var p = Prompts.find({}, {limit: 1, skip: ind});
	console.log("artworkId during randPromptId: ", Session.get("currentArtwork"));
	return p.fetch()[0]._id;
}

Template.artwork.helpers({
	username: function() {
		return this.username;
	},
	image: function() {
		return Images.find({_id: this.imgId}).fetch()[0];
	},
	questionPrompt: function() {
		var promptId = sessionGetPersistent("currentPrompt", randPromptId());
		var s = promptString(promptId);
		if (s == "" || s == undefined) {
			promptId = randPromptId();
			Session.setPersistent("currentPrompt", promptId);
			s = promptString(promptId);
		}
		return s;
	},
	promptCategory: function() {
		var promptId = sessionGetPersistent("currentPrompt", randPromptId());
		var s = promptString(promptId);
		if (s == "" || s == undefined) {
			return ""
		}
		var category = Prompts.find({"prompt": s}).fetch()[0]["category"];
		return category;
	}
});

function promptString(promptId) {
		var cursor = Prompts.find({_id: promptId});
		if (cursor.count() < 1) {
			return undefined;
		}

		return cursor.fetch()[0]["prompt"];
}

Template.artwork.events({
	"submit .feedbackForm": function(event) {
		event.preventDefault();

		var text = event.target.feedbackInput.value;

		var promptId = Session.get("currentPrompt");
		console.log(text);
		Artworks.update({_id: this._id},{
			$push: {
				critiques: {
					"prompt": promptString(promptId),
					response: text,
					user: Meteor.user().username
				}
			}
		});

		//force current artwork and prompt to refresh
		Session.set("currentArtwork", undefined);
		Session.set("currentPrompt", undefined);
	}
});
