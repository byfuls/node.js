const title = document.querySelector("#title");
const BASE_COLOR = "rgb(46, 204, 113)";
const OTHER_COLOR = "#2c3e50";

function handleClick(){
    const currentColor = title.style.color;
    console.log(currentColor);

    if(currentColor === BASE_COLOR){
        console.log('1');
        title.style.color = OTHER_COLOR;
    }else{
        console.log('2');
        title.style.color = BASE_COLOR;
    }
}

function init(){
    title.style.color = BASE_COLOR;
    /* title.addEventListener("click", handleClick); */
    title.addEventListener("mouseenter", handleClick);
}
init();

/* network offline or online event -> handleOffline function proceed */
function handleOffline(){
    console.log("hihi");
}
window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOffline);

/*
function handleResize(event){
    //console.log("I have been resized");
    console.log(event);
}
window.addEventListener("resize", handleResize);
*/

/*
alert("Hello world.");

const title = document.getElementById("title");
console.log(title);
console.dir(title);
title.innerHTML = "Hi world";

title.style.color = 'red';

document.title = "show me what you got";

// const title_node = document.querySelector("#title"); find node via id name
// const title_node = document.querySelector(".title"); find node via class name

 const title_node = document.querySelector("#title"); // find node via id name
 title.innerHTML = "via query";
 */
