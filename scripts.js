const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

function clearCocktail(){
  container.innerHTML = ""
}

function randomCocktail() {
  var request = new XMLHttpRequest();
  request.open('GET', "https://www.thecocktaildb.com/api/json/v1/1/random.php")
  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400){
      showDrinks(data, false, "drinks")
    } else {
      alert("error")
          const errorMessage = document.createElement('marquee');
          errorMessage.textContent = `Gah, it's not working!`;
          app.appendChild(errorMessage);
    }
  }
  request.send()
}

function searchCocktail(drinkName) {
  searchInput = document.getElementById("searchInput").value;
  

  var request = new XMLHttpRequest();
  var filter = document.getElementById("filter").value
  if (drinkName){
    searchInput = drinkName;
    filter = "drinks"
  }
  if (filter === "drinks"){
    request.open('GET', "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchInput)
  }
  else if ( filter === "ingredients"){
    request.open('GET', "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+searchInput)
  }

  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400){
      showDrinks(data, true, "drinks")
    } else {
      alert("error")
          const errorMessage = document.createElement('marquee');
          errorMessage.textContent = `Gah, it's not working!`;
          app.appendChild(errorMessage);
    }
  }
  request.send();
}


function showDrinks(data, clear, type) {
  if(clear){
    container.innerHTML = ""
  }
  console.log(data);
  
  data[type].forEach(cocktail => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.onclick= function(){searchClicked()};

    const h1 = document.createElement('h1');
    h1.textContent = cocktail.strDrink;


    const img = document.createElement("img")
    img.src = cocktail.strDrinkThumb+"/preview"

    const p = document.createElement('p');
    p.textContent = cocktail.strInstructions;

    container.prepend(card);
    card.appendChild(h1);
    card.appendChild(img)
    card.appendChild(p);

    const table = document.createElement("table");
    for (let i = 0; i < 15; i++) {
      ingeredientKey = "strIngredient"+i
      measureKey = "strMeasure"+i
      
      if (cocktail[ingeredientKey]){
        const row = document.createElement('tr');
        const ing = document.createElement('td');
        ing.textContent = cocktail[ingeredientKey];
        
        const measure = document.createElement('td');
        measure.textContent = cocktail[measureKey];

        row.appendChild(ing)
        row.appendChild(measure)
        table.appendChild(row)
      }
    }
    card.appendChild(table)

    
  })
}


function searchClicked() {
  console.log(event.toElement.innerHTML);
  searchCocktail(event.toElement.innerHTML)
}