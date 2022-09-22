import TableGenerator from "./tableGenerator.js"
import Modal from "./modalWindow.js"

const tableContainer = document.querySelector('#table-container');
const modalContainer = document.querySelector('.modal-dialog');

let modal = new Modal(modalContainer);

fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json')
    .then(response => response.json())
    .then(json => new TableGenerator(json, tableContainer, rowClick(modal, json)))
//asd1
//asdasd
// https://jsonplaceholder.typicode.com/photos
//https://jsonplaceholder.typicode.com/users
function generateFormFromObject(obj, index) {
    const form = document.createElement('form');

    form.setAttribute('row-index', index)

    for (let key in obj) {
        const formGroup = document.createElement('div');
        const label = document.createElement('label'); 
        const input = document.createElement('input');
        
        let keyArr = Array.from(key).toString().split(",").join(" ").replace(/\s+/g, '');
        const UID = `modal_${keyArr}`;

        label.for = UID;
        label.textContent = key;

        input.name = key;
        input.type = 'text';
        input.id = UID;
        input.value = obj[key];

        formGroup.append(label);
        formGroup.append(input);
        form.append(formGroup);
    }


    return form;
}


function updateOnSave(modal, tr) {
    const modalBody = modal.getModalBody();
    const form = modalBody.querySelector('form');
    const cells = Array.from(tr.querySelectorAll('td'));

    cells.forEach(cell => {
        let selector = `#modal_${cell.getAttribute('data-key')}`;
        let input = form.querySelector(selector);
        cell.textContent = input.value;
    })

    modal.hide()
}

function rowClick(modal, data) {
    return function (e) {
        const { target } = e;
        const tr = target.nodeName === 'TR' ? target : target.closest('tr');
        tr.classList.add('rowClick')
        if (!tr) {
            return;
        }
        let index = tr.dataset.index
        let dataObj = data[index];
        const form = generateFormFromObject(dataObj, index);
        modal.setModalBody(form);
        modal.show();
        const btnClose = document.getElementById('btn.btn-close');
        const btnSave = document.getElementById('btn.btn-save');
        btnClose.addEventListener('click', onClose)
        btnSave.addEventListener('click', onSave)

        function onSave() {
            updateOnSave(modal, tr)
            btnSave.removeEventListener('click', onSave);
            btnClose.removeEventListener('click', onClose);
            tr.classList.remove('rowClick');
        }

        function onClose() {
            modal.hide();
            btnSave.removeEventListener('click', onSave);
            btnClose.removeEventListener('click', onClose);
            tr.classList.remove('rowClick');
        }
    }
}
