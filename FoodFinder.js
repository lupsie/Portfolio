//---------------------sticky bar---------------------------------------------------
window.onscroll = function(){myFunction()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction(){
if (window.pageYOffset = sticky){
    navbar.classList.add("sticky")
    }else{
    navbar.classList.remove("sticky");
    }
}

//---------------------food search---------------------------------------------------
//nutrient id's
const calID = 1008;
const fatID = 1004;
const carbID = 1005;
const protID =1003;
const pageSize = 3

//display the results table
function showTable(){
    const query = getQuery('search');
    const api_key = 'jhn9AQkEFoAKJjBIYIB9hJVZkESBe6otseSn2uCv';
    const params = {
         dataType: ["Branded"],
         pageSize: 7,
         sortBy: 'publishedDate',
         }
    const api_url =
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(api_key)}&query=${encodeURIComponent(query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pageSize)}&sortBy=${encodeURIComponent(params.sortBy)}`

  fetch(api_url)
    .then(response => response.json())
    .then(data => createTable(data));
}

//Get the search value
function getQuery(id){
     text = document.getElementById(id).value;
     return text;
}

//create list containing food names and nutrient values
function createTable(data) {
    document.getElementById('container').innerHTML = " ";
    var table = `<table border =1>`;

    //create table header
    table += `<tr>;
               <th>Serving</th>
               <th>Brand Name</th>
               <th>Food Item</th>
               <th>Calories</th>
               <th>Fat</th>
               <th>Carbs</th>;
               <th>Protein</th>
               </tr>`;

    //create table rows
    var tr = "";
      //number of rows
      for (let i = 0; i < data.foods.length; i++) {
      tr += "<tr>"
      tr += `<td>${getServing(data,i)}</td>`
      tr += `<td>${getBrand(data,i)}</td>`
      tr += `<td>${getFood(data,i)}</td>`
      tr += `<td>${getCals(data,i)}</td>`
      tr += `<td>${getFat(data,i)}</td>`
      tr += `<td>${getCarbs(data,i)}</td>`
      tr += `<td>${getProt(data,i)}</td>`
      tr += "</tr>"
      }
    table += tr + `</table>`
    document.getElementById('container').innerHTML += table

}

//Get table values for serving, food item, calories, carbs, fat, protein
//serving
function getServing(data,index){
    const result = data.foods[index];
    const ss = data.foods[index].servingSize;
    const ssu = data.foods[index].servingSizeUnit;
    return ss + ssu;
}
function getFood(data, index){
    const foodLI = data.foods[index].description;
    return foodLI.toLowerCase();
}
function getCals(data,index){
    const result = data.foods[index];
    const nutrientsList = result.foodNutrients;
    const nID = calID;
    var cals = 0;
    for (key in nutrientsList){
            if (nID == nutrientsList[key].nutrientId){
                cals = nutrientsList[key].value + " " + nutrientsList[key].unitName.toLowerCase();
            }
        }
        return cals;

}
function getCarbs(data,index){
    const result = data.foods[index];
    const nutrientsList = result.foodNutrients;
    const nID = carbID;
    var carbs = 0;
    for (key in nutrientsList){
        if (nID == nutrientsList[key].nutrientId){
            carbs = nutrientsList[key].value + nutrientsList[key].unitName.toLowerCase();
        }
    }
    return carbs;
 }
function getFat(data,index){
    const result = data.foods[index];
     const nutrientsList = result.foodNutrients;
     const nID = fatID;
     var fats = 0;
     for (key in nutrientsList){
         if (nID == nutrientsList[key].nutrientId){
             fats = nutrientsList[key].value + nutrientsList[key].unitName.toLowerCase();
         }
     }
     return fats;
}
function getProt(data,index){
    const result = data.foods[index];
     const nutrientsList = result.foodNutrients;
     const nID = protID;
     var prot = 0;
     for (key in nutrientsList){
         if (nID == nutrientsList[key].nutrientId){
             prot = nutrientsList[key].value + nutrientsList[key].unitName.toLowerCase();
         }
     }
     return prot;
}

function getBrand(data, index){
    const result = data.foods[index];
    const brand = result.brandOwner;
    return brand;
}
