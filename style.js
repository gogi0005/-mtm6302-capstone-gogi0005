$(document).ready(function() {

	// Set up variables
	var apiUrl = "https://pokeapi.co/api/v2/pokemon/";
	var offset = 0;
	var limit = 20;
	var total = 0;
	var loading = false;

	loadData();

	$("#load-more").click(function() {
		loadData();
	});

	// Load data from API
	function loadData() {
		
		if (loading) {
			return;
		}

		loading = true;

		var url = apiUrl + "?offset=" + offset + "&limit=" + limit;

		$.get(url, function(data) {
			total = data.count;

			$.each(data.results, function(index, pokemon) {
				createCard(pokemon);
			});

			offset += limit;

			loading = false;
		});
	}

	// Create card for each Pokemon
	function createCard(pokemon) {
		// Get data from API
		$.get(pokemon.url, function(data) {
			var html = '<div class="card">';
			html += '<img src="' + data.sprites.front_default + '">';
			html += '<h2>' + data.name + '</h2>';
			html += '<button class="popup-button" data-url="' + pokemon.url + '">View Details</button>';
			html += '</div>';

			$("#card-container").append(html);

			$(".popup-button").click(function() {
				showPopup($(this).data("url"));
			});
		});
	}

	function showPopup(url) {
		// Get data from API
		$.get(url, function(data) {
		  $("#popup-name").text(data.name);
		  $("#popup-height").text("Height: " + data.height);
		  $("#popup-weight").text("Weight: " + data.weight);
		  var abilities = "";
		  $.each(data.abilities, function(index, ability) {
			abilities += ability.ability.name;
			if (index < data.abilities.length - 1) {
			  abilities += ", ";
			}
		  });
		  $("#popup-abilities").text("Abilities: " + abilities);
		  $("#popup-image").attr("src", data.sprites.front_default);
	  
		  $("#popup").fadeIn();
	  
		  // Attach Catch and Release button click events
		  $("#catch-btn").click(function() {
			$("#catch-btn").text("Pokemon caught!");
			$("#catch-btn").attr("disabled", true);
		  });
		
		  $("#release-btn").click(function() {
			$("#catch-btn").text("Catch");
			$("#catch-btn").attr("disabled", false);
		  });
	  
		});
	  
		$("#popup-close").click(function() {
		  $("#popup").fadeOut();
		});
	  }
	  
	  
});
