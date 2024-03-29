const plotlib = require('nodeplotlib');
const { performance } = require('perf_hooks');
const csv = require('csv-writer').createObjectCsvWriter;
const csvWriter = csv({
    path: 'dados.csv',
    header: [
        {id: 'position', title:'POSIÇÃO'},
        {id: 'value', title:'VALOR'},
        {id: 'timeIte', title:'TEMPO ITERATIVA'},
        {id: 'timeRec', title:'TEMPO RECURSIVA'},
    ]
});

let records = [];

console.log('Calculando...');

for(let i = 1; i<=42; i++){

    console.log(i);

    let inicioIte = performance.now();
    const ite = iterativa(i);
    let fimIte = performance.now();
    
    let inicioRec = performance.now();
    const rec = recursiva(i);
    let fimRec = performance.now();
    
    records.push({position: i, value: ite, timeIte: fimIte - inicioIte, timeRec: fimRec - inicioRec});
}

csvWriter.writeRecords(records).then(() => {
    console.log('Dados enviados ao csv');
})

let x = [];
let yI = [];
let yR = [];

records.map((data) => {
    x.push(data.position);
    yI.push(data.timeIte);
    yR.push(data.timeRec);
})

const graph = [{
    x: x,
    y: yI,
    type: 'scatter'
}, {
    x: x,
    y: yR,
    type: 'scatter'
}];

plotlib.plot(graph);

function recursiva(position) {
    if(position === 1)
        return 0;
    else
        if (position == 2)
            return 1;
        else
            return recursiva(position - 1) + recursiva(position - 2);
}

function iterativa(position) {
    if (position == 1)
        return 0;
    else
        if (position == 2)
            return 1;
        else {
            let first = 0;
            let second = 1;
            let value;
            for(let i = 3; i <= position; i++) {
                value = first + second;
                first = second;
                second = value;
            }
            return value;
        }
}