
const fill_colors = ["pink-fill", "lavender-fill", "orange-fill", "yellow-fill"];
const buttons = ["pink-button", "lavender-button", "orange-button", "yellow-button", "eraser_button"];
let pick_color = '';
let button_selected = '';

function myClear() {
    for (let i=1; i<37; i++){
    let elementId = "grid-item " + i
    let d = document.getElementById(elementId)
        for (let j=0; j<fill_colors.length;j++){
        d.classList.remove(fill_colors[j])}
    }
}

function setColor(a){
    if(a=="pink"){
    pick_color = "pink-fill"}
    if(a=="lavender"){
    pick_color = "lavender-fill"}
    if(a=="orange"){
    pick_color = "orange-fill"}
    if(a=="yellow"){
    pick_color = "yellow-fill"}
    if(a=="erase"){
    pick_color="erase"}
    console.log(pick_color);
}


color_picker.addEventListener('click', (e) =>
    {
    let elementId = e.target.id;
    if( elementId !== "color_picker"){
    let d = document.getElementById(elementId);
    d.classList.add("button-border");
    remove_border(elementId);
    }
    }
)

function remove_border(d){
    for (let i = 0; i < buttons.length; i++){
        if(d !== buttons[i]){
        let f = document.getElementById(buttons[i]);
        f.classList.remove("button-border");
        }
        }
}

["mousedown"].forEach(evt => grid.addEventListener(evt, (e) =>
  {
       let elementId = e.target.id;
       if (elementId !== '' && elementId !== "grid") {
           console.log(elementId);
           let d = document.getElementById(elementId);

           if(pick_color=="pink-fill" || pick_color=="lavender-fill" || pick_color=="orange-fill" || pick_color=="yellow-fill"){
           d.classList.add(pick_color)};
           if(pick_color=="erase"){
            for (let j=0; j<fill_colors.length;j++){
                   d.classList.remove(fill_colors[j])}
                   }
       }
       else {
           console.log("An element without an id was clicked.");
       }

   }
   ))

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
