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

Meteor.publish('promptsPerArtwork', function() {
		//Critiques per prompt per artwork
		/*
			{
				$match: {username: user}
			},
			*/
		var pipeline = 
		[
			{
				$unwind: "$critiques"
			},
			{
				$project: {_id: 1, critiques: 1}
			},
			{
				$group: {
					_id:{artworkId: "$_id", prompt: "$critiques.prompt"},
					critiques: {$push: {user: "$critiques.user", response: "$critiques.response"}}
				}
			},
			{
				$group: {
					_id: "$_id.artworkId",
					prompts: {$push: {prompt: "$_id.prompt", critiques: "$critiques"}}
				}
			}
	];

	/*
		cursor = Artworks.aggregate(pipeline);
		return cursor;
		*/
		ReactiveAggregate(this, Artworks, pipeline, {clientCollection: "clientPromptsPerArtwork"});
	}
);


Meteor.publish('userPoints', function() {
	//Currently measured by total number of critiques
	var pipeline = 
		[
		{
			$unwind: "$critiques"
		},
		{
			$group: {
				_id: "$critiques.user",
				total: {$sum: 1}
			}
		}
		];

		ReactiveAggregate(this, Artworks, pipeline, {clientCollection: "userPoints"});
});
