// definire un array di oggetti; ogni oggetto
// rappresenta un gatto, che è caratterizzato da:
// nome, età, colore e sesso.
// Tramite la funzione forEach, stampare in pagina
// tutti i gattini, ciascuno con il proprio colore e il
// proprio nome.


// dividere i gatti in due contenitori distinti in base
// al sesso e aggiungere a fianco di ogni gattino un
// fiocco colorato di rosa se femmina o di blu se
// maschio.
// Il colore del fiocco deve essere più tenue se il
// gatto è più giovane, più scuro se il gatto è più
// vecchio.

// creare un nuovo array con prima tutti i gattini
// femmina e poi tutti i gattini maschio, inserendo
// solamente nome e colore e opacità del fiocco
// per ogni gatto.

// funzione che ritorna i coolore del fiocco in funzione del sesso del gatto
const getRibbonColor = (gender) => {
    if(gender == 'F') {
        return 'pink';
    } else {
        return 'lightblue';
    }
}

// Funzioe che ritorna l'opacitá del fiocco (valore da 0 a 1) in funzione del
// gatto piú vecchio e dell'età del gatto reso in considerazione
const getRibbonOpacity = (age, maxAge) => age / maxAge

// Variabile che contiene l'età del gatto più vecchio
let maxAge = 0;
$(document).ready(() => {
    // Dichiarazione dell'array di gatti
    const cats = [
        {
            name: 'pippo',
            age: 12,
            color: 'blue',
            gender: 'M'
        },
        {
            name: 'minnie',
            age: 3,
            color: 'yellow',
            gender: 'F'
        },
        {
            name: 'pluto',
            age: 8,
            color: 'orange',
            gender: 'M'
        },
        {
            name: 'paperina',
            age: 15,
            color: 'red',
            gender: 'F'
        }
    ];

    cats.forEach((cat) => {
        //stampa in pagina tutti i gatti con il nomer corrispondente e del colore del gatto
        const catPrintTemplate = $('.template .cat-item').clone();
        const {name, color, age, gender} = cat;
        catPrintTemplate.children('.name').text(name);
        catPrintTemplate.css('color', color);
        $('.container .all-cats').append(catPrintTemplate);

        // Ricava l'età del gatto più vecchio
        if(age > maxAge) {
            maxAge = age;
        }

        // aggiunge ad ogni gatto una proprietà ribbon che contiene un oggeto con le seguenti proprietà:
        // - ribbonColor (colore del fiocco) valore in base al genere del gatto
        // - ribbonOpacity (opacità del fiocco): valore in base all'età del gatto
        cat.ribbon = {
            ribbonColor: getRibbonColor(gender),
            ribbonOpacity: getRibbonOpacity(age, maxAge)
        }
    });

    // al click su un gatto lo sposta nella lista di gatti col suo sesso e stampa anche il ribbon
    $('.all-cats .cat-item').click(function() {
        // salva in una variabile il nome del gatto cliccato
        const nameCurrentCat = $(this).children('.name').text()
        //rimuove dal DOM il gatto cliccato
        $(this).remove();
        // Crea un array contenente l'oggetto gatto con lo stesso nome di quello cliccato
        let currentCat = cats.filter((cat) => cat.name == nameCurrentCat);
        // l'array diventa l'oggetto che conteneva
        currentCat = currentCat[0];

    /*===== copia e modifica del template dell'item con il fiocco =====*/
        // copia il template dell'item con il fiocco
        const catPrintTemplate = $('.template .cat-w-ribbon-item').clone();
        // Salva in delle variabili le proprietà del gatto in cliccato
        const {name, color, age, gender, ribbon} = currentCat;
        // Inserimento nome del gatto
        catPrintTemplate.children('.name').text(name);
        // Imposta colore del gatto in funzione del colore nell'oggetto
        catPrintTemplate.css('color', color);

        // Stila il fiocco
        const {ribbonColor, ribbonOpacity} = ribbon;
        catPrintTemplate.children('.fa-ribbon').css({
            "color": ribbonColor,
            "opacity": ribbonOpacity
        });

        // Definisce la lista in cui inserire la nuova stampa
        let container;
        if(gender == 'F') {
            container = '.female-cats';
        } else {
            container = '.male-cats';
        }

        // stampa il template nell'apposita lista
        $(`.container ${container}`).append(catPrintTemplate);

    });

    // inserisce negli array femaleCats e maleCats tutti i gatti del rispettivo
    // sesso con proprietà: name, color e ribbonOpacity
    const femaleCats = getXGenderCats('F', cats);
    console.log(femaleCats);

    const maleCats = getXGenderCats('M', cats);
    console.log(maleCats);

    // crea un array contenente prima tutti i gatti femmina e poi quelli maschi
    const orderedCatList = [...femaleCats, ...maleCats]

});

// funzione che restituisce tutti i gatti dello stesso sesso con solo le proprietà:
// name, color e ribbonOpacity
function getXGenderCats(gender, cats) {
    // crea un array di gatti dello stesso sesso
    const newArrayCats = cats.filter((cat) => cat.gender == gender);
    // modifica gli oggetti dell'array cancellando tutte le proprietá e inserendo solo le proprietà
    // name color e ribbonOpacity
    newArrayCats.forEach((cat, index) => {
        let {name, color, ribbon} = cat;
        newArrayCats[index] = {
            name,
            color,
            ribbonOpacity: ribbon.ribbonOpacity
        };
    });
    
    return newArrayCats;
}
