const txtDescription = document.querySelector('input[name="txtDescription"]');
const comboStatus = document.querySelector('select[name="comboStatus"]');
const btnAdd = document.querySelector('button[name="btnAdd"]');
let cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

btnAdd.addEventListener('click', addCard);

function addCard(event) {
    event.preventDefault();

    const description = txtDescription.value;
    const statusValue = comboStatus.value;

    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable = 'true';

    const status = document.createElement('div');
    status.classList.add('status');
    let color = '';

    if (statusValue === 'todo') {
        color = 'green';
    }
    else if (statusValue === 'in-progress') {
        color = 'blue';
    }
    else {
        color = 'red';
    }

    status.classList.add(color);

    const content = document.createElement('div');
    content.classList.add('content');
    content.appendChild(document.createTextNode(description));

    card.appendChild(status);
    card.appendChild(content);

    dropzones.forEach(function (dropzone) {
        const atualClass = dropzone.className;
        const listClass = atualClass.split(' ');

        if (listClass[1] === statusValue) {
            dropzone.appendChild(card);
            getCards();
        }
    })
}

function getCards() {
    cards = document.querySelectorAll('.card');

    /** Add events in all cards */
    cards.forEach(function (card) {
        card.addEventListener('dragstart', dragstart);
        card.addEventListener('drag', drag);
        card.addEventListener('dragend', dragend);
    });
}

getCards();

function dragstart() {
    /** this = card */
    dropzones.forEach(function (dropzone) {
        dropzone.classList.add('highlight');
    });

    this.classList.add('is-dragging');
}

function drag() {

}

function dragend() {
    /** this = card */
    dropzones.forEach(function (dropzone) {
        dropzone.classList.remove('highlight');
    });

    this.classList.remove('is-dragging');
}

/** add events in all dropzones */
dropzones.forEach(function (dropzone) {
    dropzone.addEventListener('dragenter', dragenter);
    dropzone.addEventListener('dragover', dragover);
    dropzone.addEventListener('dragleave', dragleave);
    dropzone.addEventListener('drop', drop);
});

function dragenter() {

}

function dragover() {
    /** this = dropzone */
    this.classList.add('dragover');

    const card = document.querySelector('.is-dragging');

    // get status of the card what is being dragging
    const status = card.querySelector('.status');
    status.className = 'status';

    const className = this.className.split(' ');

    if (className[1] === 'todo') {
        status.classList.add('green');
    }
    else if (className[1] === 'in-progress') {
        status.classList.add('blue');
    }
    else if (className[1] === 'done') {
        status.classList.add('red');
    }

    this.appendChild(card);
}

function dragleave() {
    /** this = dropzone */
    this.classList.remove('dragover');
}

function drop() {
    /** this = dropzone */
    this.classList.remove('dragover');
}