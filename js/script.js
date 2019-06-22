document.addEventListener('DOMContentLoaded', function() {
    const contactTable = document.getElementById('contact-info');
    const contactBody = contactTable.children[1];
    let contacts = [];
    const url = 'http://localhost:9081/contacts';
    const editBtn = '<button type="button" class="btn btn-outline-info btn-sm" data-type="edtBtn">Edit Contact</button>';
    const deleteBtn = '<button type="button" class="btn btn-outline-danger btn-sm" data-type="delBtn">Delete Contact</button>';
    const addBtn = document.getElementById('addNewBtn');
    
    axios.get(url).then(function(response) {
        contacts = response.data;
        render(contacts);
    });

    contactBody.addEventListener('click', onContactClicked);
    addBtn.addEventListener('click', function(event) {
        window.location = './add-contact.html';
    });
   
    function render(contacts) {
        var content = contacts.map(function(contact) {
            return '<tr data-id="' + contact.id + '"><th scope="row">' + (contacts.indexOf(contact) + 1) + '</th><td>' + contact.info.name + '</td><td>' + contact.info.address + '</td><td>' + contact.info.phone + '</td><td>' + editBtn +'</td><td>' + deleteBtn + '</td></tr>'
        });
        contactBody.innerHTML = content.join('');
    };

    function onContactClicked(event) {
        var button = event.target;
        if (button.localName != 'button') {
            return;
        }
        var index = button.parentNode.parentNode.dataset.id;
        if (button.dataset.type == 'edtBtn') {
            window.location = './edit-contact.html#' + index;
        }
        if (button.dataset.type == 'delBtn') {
            newContacts = contacts.filter(function(contact) {
                return contact.id != index;
            });
            render(newContacts);
            contacts = newContacts;
            axios.delete(url + '/' + index).then(function(response) {

            });
        }
    };

});