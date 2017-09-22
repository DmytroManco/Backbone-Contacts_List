let url = 'http://www.json-generator.com/api/json/get/cgmZpkYnYi?indent=2';
let app = require('./backboneApp');
let makeDataArr = require('./helper');

app.friendsView = new app.FriendsView();

if(!localStorage.getItem('friends')) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) return;

		if (xhr.status !== 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			let friends = makeDataArr(JSON.parse(xhr.responseText));
			localStorage.setItem('friends', JSON.stringify(friends));
			for(let i = 0; i < friends.length; i++) {
				app.friendsList.add(friends[i]);
			}
		}
	};
} else{
	let friends = JSON.parse(localStorage.getItem('friends'));
	for(let i = 0; i < friends.length; i++) {
		app.friendsList.add(friends[i]);
	}
}





