
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
