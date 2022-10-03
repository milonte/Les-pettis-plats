export default class KeyFilterPill {

    type: string;
    name: string;
    erasePillCallbackFunction: CallableFunction;

    constructor(type: string, name: string,  erasePillCallbackFunction : CallableFunction) {
        this.type = type;
        this.name = name;
        this.erasePillCallbackFunction = erasePillCallbackFunction;
    }

    getDOMElement() { 
        
        const filtersResultsSections: HTMLElement | null = document.getElementById("filters-results");

        const pillButtonElement : HTMLElement = document.createElement("button");
        pillButtonElement.classList.add("btn", this.type + "-filter-pill", "mx-2");
        pillButtonElement.dataset.value = this.name;

        pillButtonElement.innerHTML = `
            ${this.name}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                class="bi bi-x-circle mx-1" viewBox="0 0 20 20">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        `;

        switch (this.type) { 
            case 'ingredients':
                pillButtonElement.classList.add("btn-primary");
                break;
                
            case 'appliances':
                pillButtonElement.classList.add("btn-success");
                break;
                
            case 'ustensils':
                pillButtonElement.classList.add("btn-danger");
                break;
        }

        pillButtonElement.addEventListener("click", () => {
            const pillToRemove: HTMLElement | null = document.querySelector(`.btn[data-value='${this.name}']`);

            if (filtersResultsSections && pillToRemove) {
                filtersResultsSections.removeChild(pillToRemove);
                this.erasePillCallbackFunction(this.type, this.name);
            }
        });

        return pillButtonElement;
    }

}
