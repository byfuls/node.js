
const todoForm = document.querySelector(".js-todoForm"),
 todoInput = todoForm.querySelector("input"),
 todoList = document.querySelector(".js-todoList");

const TODOS_LS = 'todos';
let todos = [];

function deleteTodo(event){
	console.log(event.target.parentNode);
	const btn = event.target;
	const li = btn.parentNode;
	todoList.removeChild(li);
	const cleanTodos = todos.filter(todo => {
		return todo.id !== parseInt(li.id);
	});
	todos = cleanTodos;
	saveTodos(todos);
}

function saveTodos(){
	localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text){
    /* console.log(text); */
	const li = document.createElement("li");
	const deleteButton = document.createElement("button");
	const span = document.createElement("span");
	const newId = todos.length+1;

	deleteButton.innerText = "X";
	deleteButton.addEventListener("click", deleteTodo);

	span.innerText = text;
	li.appendChild(span);
	li.appendChild(deleteButton);
	li.id = newId;
	todoList.appendChild(li);

	const todoObj = {
		text: text,
		id: newId
	}
	todos.push(todoObj);
	saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
	todoInput.value = "";
}

function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
		/* console.log(loadedTodos); */
		const parsedTodos = JSON.parse(loadedTodos);
		console.log(parsedTodos);
		parsedTodos.forEach((todo) => {
			paintTodo(todo.text);
		})
    }else{
    }
}

function init(){
   loadTodos();
   todoForm.addEventListener("submit", handleSubmit);
}
init();
