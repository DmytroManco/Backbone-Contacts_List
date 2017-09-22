function search(fieldForSearch, input, element) {
	let filter = input.val().toLowerCase();
	let tr = element.getElementsByTagName('tr');
	let index = (fieldForSearch === 'name') ? 0 : 1;

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[index];
		if (td) {
			if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}

module.exports = search;