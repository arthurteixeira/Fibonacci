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

for(let i = 1; i<=20; i++){
    const ite = iterativa(i);
    console.log('Pos: ' + i + ' | Iterativa | Resposta: ' + ite);

    const rec = recursiva(i);
    console.log('Pos: ' + i + ' | Recursiva | Resposta: ' + rec + '\n');
    
    records.push({position: i, value: ite, timeIte: ite, timeRec: rec});
}

csvWriter.writeRecords(records).then(() => {
    console.log('Dados enviados ao csv');
})

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