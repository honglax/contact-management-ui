document.addEventListener('DOMContentLoaded', function() {
    const url = 'http://localhost:9081/contacts';
    const addNewBtn = document.getElementById('addNewBtn');
    const backBtn = document.getElementById('backBtn');
    const txtName = document.getElementById('txtName');
    const txtAddress = document.getElementById('txtAddress');
    const txtPhoneNum = document.getElementById('txtPhoneNum');

    backBtn.addEventListener('click', backToHome);
    addNewBtn.addEventListener('click', addNewContact);

    function formValidation() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        let validation = Array.prototype.filter.call(forms, function(form) {
            // form.addEventListener('click', function(event) {
            //     if (form.checkValidity() === false) {
            //         event.preventDefault();
            //         event.stopPropagation();
            //     }
            //     form.classList.add('was-validated');
            // }, false);
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    };

    function addNewContact(event) {
        const fullName = txtName.value;
        const address = txtAddress.value;
        const phoneNum = txtPhoneNum.value;

        if ((!fullName) || (!address) || (!phoneNum)) {
            formValidation();
        } else {
            let newContact = {
                info: {
                    name: fullName,
                    address: address,
                    phone: phoneNum
                }
            };
            axios.post(url, newContact).then(function(response) {
                // alert('Add New Contact successfully.')
                window.location = './';
            });
        }
    };

    function backToHome(event) {
        window.location = './';
    };
});