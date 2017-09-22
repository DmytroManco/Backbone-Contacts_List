function deleteFriend() {
	let friends = JSON.parse(localStorage.getItem('friends'));

	for(let i = 0; i < friends.length;i++) {
		if(friends[i].id === this.model.get('id')) {
			friends.splice(friends.indexOf(friends[i]), 1);
		}
	}

	localStorage.setItem('friends', JSON.stringify(friends));
	this.model.destroy();
}

module.exports = deleteFriend;