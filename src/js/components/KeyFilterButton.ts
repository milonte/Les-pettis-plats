export default class KeyFilterButton {

    type: string;
    datas: Array<string>;
    pillCallbackFunction: CallableFunction;

    constructor(type : string, datas : Array<string>, pillCallbackFunction : CallableFunction ) {
        this.type = type;
        this.datas = datas;
        this.pillCallbackFunction = pillCallbackFunction;
    }

    /**
     * Returns the key filter button DOM element for the given type and datas
     * @returns 
     */
    getDOMElement() {

        const filterElement = document.createElement('div');
        filterElement.classList.add('dropdown', 'col-lg-2', 'col-sm-3', 'mx-2', 'd-flex');

        const filterButton = document.createElement('button');
        filterButton.setAttribute('id', this.type + '-dropdown');
        filterButton.setAttribute('type', 'button');
        filterButton.setAttribute('data-bs-toggle', 'dropdown');
        filterButton.classList.add('btn', 'dropdown-toggle', 'w-100', 'text-start');
        filterButton.innerHTML = this.type.toLowerCase();
        
        const filterInput = document.createElement('input');
        filterInput.setAttribute('id', this.type + '-input');
        filterInput.setAttribute('type', 'search');
        filterInput.classList.add('border-0', 'text-white', 'col-10', 'fw-bold', 'mb-2', 'mx-4');
        
        const filterDropdown = document.createElement('div');
        filterDropdown.classList.add('dropdown-menu', this.type + "-list", "w-100");
        filterDropdown.setAttribute('aria-labelledby', this.type + '-dropdown');


        const filterUl = document.createElement('ul');
        filterUl.classList.add('d-flex', 'row', 'p-0', 'm-0');

        switch (this.type) { 
            case 'ingredients':
                filterButton.classList.add('btn-primary');
                filterInput.classList.add('bg-primary');
                filterDropdown.classList.add('bg-primary');
                filterInput.setAttribute('placeholder', 'Ingredients');
                break;
                
                case 'appliances':
                    filterButton.classList.add('btn-success');
                    filterInput.classList.add('bg-success');
                    filterDropdown.classList.add('bg-success');
                    filterInput.setAttribute('placeholder', 'Appareils');
                    break;
                    
                    case 'ustensils':
                        filterButton.classList.add('btn-danger');
                        filterInput.classList.add('bg-danger');
                        filterDropdown.classList.add('bg-danger');
                        filterInput.setAttribute('placeholder', 'Ustensiles');
                break;
        }

        this.datas.forEach(data => {
            const li = document.createElement('li');
            li.setAttribute('title', data.toLowerCase());
            li.classList.add('col-sm-6', 'col-lg-4');

            const link = document.createElement('a');
            link.classList.add('dropdown-item', 'text-white', "text-truncate");
            link.setAttribute('href', "#");
            link.innerHTML = data;

            li.appendChild(link);
            filterUl.appendChild(li);
        });
        
        filterDropdown.appendChild(filterInput);
        filterDropdown.appendChild(filterUl);
        filterElement.appendChild(filterButton);
        filterElement.appendChild(filterDropdown);

        /* --- Listeners --- */

        /* 
            Triggered whew list of filters is shown
        */
        filterButton.addEventListener('shown.bs.dropdown', () => {
            // focus input field
            filterInput.focus();
            // Reset visibility of filters in list
            for (const item of filterUl.children) { 
                item.removeAttribute("hidden");
            }
            // Set big button
            filterElement.classList.remove('col-lg-2');
            filterElement.classList.add('col-lg-6');
            filterElement.classList.remove('col-sm-3');
            filterElement.classList.add('col-sm-5');
        });

        /* 
            Triggered whew list of filters is hidden
        */
        filterButton.addEventListener('hidden.bs.dropdown', () => {
            // Reset to normal button
            filterElement.classList.add('col-lg-2');
            filterElement.classList.remove('col-lg-6');
            filterElement.classList.add('col-sm-3');
            filterElement.classList.remove('col-sm-5');
        });

        /* 
            Triggered when filter input change
        */
        filterInput.addEventListener('input', (e : any) => {
            // Value of input field
            const searchValue : string = e.target.value.toLowerCase();
            let item: any;

            // Hide / Show filter item on list
            for (item of filterUl.children) { 
                const itemValue : string = item.title.toLowerCase();

                if (itemValue.indexOf(searchValue) == -1) {
                    item.setAttribute("hidden", "true");
                } else {
                    item.removeAttribute("hidden");
                }
            }
        });

        /* 
            Filter change value Listener
        */
        for (const item of filterUl.children) { 
            item.addEventListener('click', (e: any) => {

                const value = e.target.parentNode.title;

                // Reset input field value to placeholder value
                filterInput.value = "";
                // Display Filter Pill callback function
                this.pillCallbackFunction(this.type, value);
            });
        }
        
        return filterElement;

    }
}