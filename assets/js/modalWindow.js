class Modal {
    constructor(container) {
        this.container = container;
        this.modalBody = container.querySelector('.modal-body');
        this.modalFooter = container.querySelector('.modal-footer')
        this.modalContent = container.querySelector('.modal-content');
        this.hide = this.hide.bind(this);
    }

    setModalBody(content) {
        this.modalBody.innerHTML = ' ';
        this.modalBody.append(content);
        
    }

    getModalBody(){
        return this.modalBody;
    }

    getModalFooter() {
        return this.modalFooter;
    }

    show() {
        this.container.style.display = "flex";
    }

    hide() {
        this.container.style.display = "none";
    }
}

export default Modal;