// Set an event lister on the button for Click
document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
	// Get the number input value from the form
	const numbers = document.getElementById('number').value.trim();

	// Check if the user has actually inputted anything within the form, otherwise throw error message
	if(numbers === "" || numbers === null || isNaN(numbers)) {
		showAlert('Please enter a valid number of jokes.', 'error');
	} else {
		// Create a XMLHttpRequest object
		const xhr = new XMLHttpRequest();

		// Call the API with GET method
		xhr.open('GET', `https://api.icndb.com/jokes/random/${numbers}`, true);

		// When we get the data
		xhr.onload = function () {
			// Check if the HTTP response is 200 i.e. all OK
			if (this.status === 200) {
				// Get the responses and parse it as JSON from text
				const responses = JSON.parse(this.responseText);
				// Create output var
				let output = '';
				// If the response type is success then loop through the values and populate the output var with the data
				if (responses.type === 'success') {
					responses.value.forEach(function (response) {
						output += `<li>${response.joke}</li>`;
					});
				} else {
					output = '<li>Something went wrong...</li>';
				}
				// Show "here are the jokes..." before showing the jokes
				const container = document.querySelector('.container'); // insert after the container
				const jokeWrapper = document.querySelector('.jokes'); // insert before the joke wrapper
				const heading = document.createElement('h3');
				heading.classList.add('text-center');
				heading.appendChild(document.createTextNode('Here are the jokes...'));
				// Lets add the heading before actually showing the jokes
				container.insertBefore(heading, jokeWrapper);
				// Show the jokes to the front end within the ul.jokes
				jokeWrapper.innerHTML = output;
			}
		}

		// Send the XMLHttpRequest
		xhr.send();
	}

	e.preventDefault();
}

// Show Alert Function
function showAlert(msg, className) {
	const container = document.querySelector('.container'); // insert after the container
	const form = document.getElementById('joke-selection'); // insert before the form
	// Create the Alert div
	const alert = document.createElement('div');
	alert.classList.add('alert', className);
	alert.appendChild(document.createTextNode(msg));

	// Show the alert
	container.insertBefore(alert, form);

	// Hide the alert after 3 sec
	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);
}