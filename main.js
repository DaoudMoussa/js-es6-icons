// definire un array di oggetti; ogni oggetto
// rappresenta un'icona, che è caratterizzata da:
// nome, prefisso, tipo e famiglia.
// Utilizzando la funzione forEach e il template
// literal, visualizzare in pagina tutte le icone con il
// proprio nome.

// definire un array di colori e associare ad ogni
// tipo di icona un colore.
// Visualizzare le icone di colore diverso in base al tipo.

// aggiungere una select per filtrare le icone in
// base al tipo.
// Popolare le options della select dinamicamente
// e, ogni volta che cambia il valore selezionato,
// visualizzare le icone corrispondenti.

$(document).ready(() => {
    //dichiarazione array con all'interno gli oggetti rappresentanti le icone
    const icons = [
        {
            name: 'cat',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'crow',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'dog',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'dove',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'dragon',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'horse',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'hippo',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'fish',
            prefix: 'fa-',
            type: 'animal',
            family: 'fas'
        },
        {
            name: 'carrot',
            prefix: 'fa-',
            type: 'vegetable',
            family: 'fas'
        },
        {
            name: 'apple-alt',
            prefix: 'fa-',
            type: 'vegetable',
            family: 'fas'
        },
        {
            name: 'lemon',
            prefix: 'fa-',
            type: 'vegetable',
            family: 'fas'
        },
        {
            name: 'pepper-hot',
            prefix: 'fa-',
            type: 'vegetable',
            family: 'fas'
        },
        {
            name: 'user-astronaut',
            prefix: 'fa-',
            type: 'user',
            family: 'fas'
        },
        {
            name: 'user-graduate',
            prefix: 'fa-',
            type: 'user',
            family: 'fas'
        },
        {
            name: 'user-ninja',
            prefix: 'fa-',
            type: 'user',
            family: 'fas'
        },
        {
            name: 'user-secret',
            prefix: 'fa-',
            type: 'user',
            family: 'fas'
        }
    ];

    // Dichiarazione array paralleli contenenti colori e tipi corrispondenti
    const colors = ['green', 'lightblue', 'brown']
    const types = [];
    // ciclo che salva ogni tipo una sola volta nell'apposito array
    // e aggiunge nel select.filter una option per ogni tipo
    icons.forEach(icon => {
        const {type} = icon;

        if(!types.includes(type)) {
            types.push(type);
            $('.filter').append(`
                <option value="${type}">${type}</option>
            `);
        }
    });

    // legge il tipo selezionato (inizialmente sarà sempre: "")
    let selectedType = $('.filter').val();
    // stampa in pagina le apposite (tutte) icone con i nomi e gli appositi colori
    printIcons(icons, selectedType, types, colors);

    // Controlla quando il select con classe filter cambia valore
    $('.filter').change(() => {
        //legge il valore di select
        selectedType = $('.filter').val();

        // Cancella tutte le icone stampate precedentemente
        $('.container').empty();
        // stampa in pagina le apposite icone con i nomi e gli appositi colori
        printIcons(icons, selectedType, types, colors);
    });


})

// funzione che stampa in pagina le apposite icone con i rispettivi colori e nomi
// se selectedType è una stringa vuota allora stampa tutto
function printIcons(icons, selectedType, ...iconProperties) {
    icons.forEach(icon => {
        const {name, prefix, family, type} = icon;
        if(type == selectedType || selectedType == "") {
            const typeIndex = iconProperties[0].indexOf(type);
            const iconColor = iconProperties[1][typeIndex];

            $('.container').append(`
                <div class="icon-wrapper">
                <i class="${family} ${prefix}${name}" style="color: ${iconColor}"></i>
                <p class="name-icon">${name}</p>
                </div>
            `);
        }
    });
}
