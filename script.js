//model
let todos;
let completeTodo;
const save = JSON.parse(localStorage.getItem("save"));
const save1 = JSON.parse(localStorage.getItem("save1"));
if (Array.isArray(save)) {
    todos = save;
}
else {
    todos = []

}
if (Array.isArray(save1)) {
    completeTodo = save1;
}
else {
    completeTodo = []

}

function newTodo() {
    todos.push({
        name: document.getElementById("newTodo").value,
        time: document.getElementById("newDate").value.replace('T',' <> '),
        id: "" + new Date().getTime(),  //to solve type error
        
    });
    saveTodo();
}

function removeTodo(event) {
    todos = todos.filter((del) => {
        return !(del.id === event.target.id);
    })
    saveTodo();
}

function completed(event){
    completeTodo= completeTodo.concat((todos.filter((del) => {
        return (del.id+"h" === event.target.id);
    })))
    rerender();
    todos = todos.filter((del) => {
        return !(del.id+"h" === event.target.id);
    })
    
    render();
    savecompleteTodo();
    saveTodo();
}
function removeCompleteTodo(event){
    completeTodo = completeTodo.filter((del) => {
        return !(del.id === event.target.id);
    })
}
function saveTodo() {
    localStorage.setItem("save", JSON.stringify(todos));
}
function savecompleteTodo() {
    localStorage.setItem("save1", JSON.stringify(completeTodo));
}

function resetTodo() {
    const audio=new Audio("sound/reset.mp3");
    audio.play();
    todos=[];
    document.getElementById("todos").innerHTML = " ";
    saveTodo();
}
function resetComp(){
    const audio=new Audio("sound/reset.mp3");
    audio.play();
    completeTodo=[];
    document.getElementById("completeTodos").innerHTML = " ";
    savecompleteTodo();
}
//view
// const datepicker = document.getElementById("newDate");
// datepicker.min=new Date().toISOString().split("T")[0];

function render() {
    document.getElementById("todos").innerHTML = " ";
    todos.forEach((todoTitle) => {
        const todo = document.createElement("div");
        todo.className = "eachTodo";
        document.getElementById("todos").appendChild(todo);
        

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "radio");
        todo.appendChild(checkbox);
        checkbox.id=todoTitle.id+"h";
        checkbox.onclick = complete;
        checkbox.className="remove"


        const title = document.createElement("div");
        title.innerText = todoTitle.name;
        todo.appendChild(title);
        title.className="todoName"

        const time = document.createElement("div");
        
        time.innerText = todoTitle.time; 
        todo.appendChild(time);

        const del = document.createElement("button");
        del.innerText = "";
        del.id = todoTitle.id;
        del.className = "remove";
        del.onclick = delTodo;
        todo.appendChild(del);
    })
}
render();

function rerender() {
    document.getElementById("completeTodos").innerHTML = " ";
    completeTodo.forEach((todoTitle) => {
        const todo = document.createElement("div");
        todo.className = "eachTodo";
        document.getElementById("completeTodos").appendChild(todo);

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "radio");
        todo.appendChild(checkbox);
        checkbox.id=todoTitle.id;
        checkbox.checked =true;
        checkbox.className = "remove";


        const title = document.createElement("div");
        title.innerText = todoTitle.name;
        todo.appendChild(title);
        title.className="todoName"

        const time = document.createElement("div");
        time.innerText = todoTitle.time; 
        todo.appendChild(time);

        const del = document.createElement("button");
        del.innerText = "";
        del.id = todoTitle.id;
        del.className = "remove";
        del.onclick = delcompleteTodo;
        todo.appendChild(del);
    })
}
rerender();
//control
function addTodo() {
   
    if (document.getElementById("newTodo").value.length === 0) { return alert("so...your task is to do nothing....huh"); }

    else {
        newTodo();
        render();
    }
    document.getElementById("newTodo").value="";
    document.getElementById("newDate").value="";
}
function delTodo(event) {
    
    removeTodo(event);
    render();

}
function complete(event) {
    const audio=new Audio("sound/comp.wav");
    audio.play();
    if(event.target.checked){
    completed(event);
   
}
}
    
function delcompleteTodo(event){
    removeCompleteTodo(event);
    rerender();
    savecompleteTodo();
}


