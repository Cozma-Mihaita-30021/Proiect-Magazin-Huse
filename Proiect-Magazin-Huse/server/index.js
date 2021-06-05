var api = require('./src/api.js').app;
const fs = require('fs');
const huseFilepath = './src/huse.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/huse', function (request, response) {
  response.json(getHuse());
});

api.get('/huse/:id', function (request, response) {
  let husa = getHusaById(request.params.id);
  if (husa)
    response.json(husa);

  response.json('not found');
});

api.put('/huse', function (request, response) {
  saveHuse(request.body);

  response.json('Husa was saved succesfully');
});

api.post('/huse', function (request, response) {
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
  // console.log(request.body);  //un obiect de tipul car actualizat pe client
  // citim toys din fisier pe baza id-ului primit de la client
  let husa = request.body;
  let huse = getHuse();// citire json din fisier
  // cautam daca exista id de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  for(let i=0; i < huse.length; i++) {
    if (huse[i].id === husa.id) {
      huse[i] = husa;
    }
  }
  // salvam in fisier produsele actualizate
  try {
    fs.writeFileSync(huseFilepath, JSON.stringify(huse));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }

  response.json('Husa was updated succesfully');
});

api.delete('/huse/:index', function (request, response) {
  // delete din fisier pe baza unui id
  // cars.splice(request.params.index, 1);
    let huse = getHuse();

    huse.splice(findIdInArray(request.params.index),1);

    try {
            fs.writeFileSync(huseFilepath, JSON.stringify(huse));// salvare json array in fisier
        } catch (err) {
            console.error(err)
        }

    response.json('Husa with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getHuse() {
  let huse = [];
  try {
    huse = JSON.parse(fs.readFileSync(huseFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return huse;
}

function saveHuse(husa) {
  let huse = getHuse();// citire json din fisier
  let maxId = getMaxId(huse);  // get maximum id form cars array
  console.log(husa);
  husa.id = maxId+1;// generare id unic
  huse.push(husa);// adaugare toy nou in array
  try {
    fs.writeFileSync(huseFilepath, JSON.stringify(huse));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(huse) {
  let max = 0;
  for (var i=0; i<huse.length;i++) {
    if(max < huse[i].id) {
      max = huse[i].id;
    }
  }
  return max;
}

function getHusaById(id){
  let huse = getHuse();// citire json din fisier
  let selectedHusa = null;
  for(var i=0; i<huse.length; i++) {
    if(id == huse[i].id)
        selectedHusa = huse[i];
  }
      return selectedHusa;
}

function findIdInArray(id){
    let huse = getHuse();
    for(var i=0; i<huse.length; i++) {
        if(id == huse[i].id)
            return i;
      }
    return -1;
}