Template.imageUpload.events({
	'change .fileInput': function(event, template) {
		console.log("fileInput changed")
		var files = event.target.files;
		Images.insert(files[0], function (err, fileObj) {
			//Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
			console.log("inserted now file with id: ", fileObj._id);
		});
	}
});
