class TableGenerator {
    constructor(data, container, onRowClick) {
        this.data = data;
        this.container = container;
        this.removeNullFromData(data);

        const table = document.createElement('table');
        const tableHead = this.createTableHead(Object.keys(data[0]));
        const tableBody = this.createTableBody(data);
        table.classList.add('table');



        if (onRowClick) {
            tableBody.addEventListener('click', onRowClick)
        }


        table.append(tableHead);
        table.append(tableBody);
        container.append(table);
    }

    removeNullFromData(data) {
        for (let obj of data) {
            Object.keys(obj).forEach(key => {
                (obj[key] === null) ? obj[key] = '...' : obj.value;

            })

        }
    }

    createTableHead(keys) {
        const thead = document.createElement('thead')
        const tr = document.createElement('tr');
        for (let key of keys) {
            const th = document.createElement('th');
            th.textContent = key;
            tr.append(th)

        }

        thead.append(tr)
        thead.classList.add('thead')
        return thead;

    }

    createTableBody(data) {
        const tBody = document.createElement('tbody');
        data.forEach((item, index) => {
            let tr = document.createElement('tr');
            tr.setAttribute('data-index', index);
            for (let key in item) {
                let td = document.createElement('td');
                let keyArr = Array.from(key).toString().split(",").join(" ").replace(/\s+/g, '')
                td.textContent = `${item[key]}`;
                td.setAttribute('data-key', keyArr)
                td.classList.add('tbody')
                tr.append(td);


            }
            tBody.append(tr);
        });


        return tBody;
    }

}

export default TableGenerator;