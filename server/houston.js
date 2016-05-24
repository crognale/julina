Houston.methods("artworks", {
	"Clear Critiques": function (artwork) {
		Artworks.update(artwork._id, {$set: {critiques: []}});
		return "Critiques cleared";
	}
});
