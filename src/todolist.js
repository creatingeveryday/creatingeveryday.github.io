const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todolist = document.querySelector("#todo-list");

let toDos = [];
const TODO_KEY = "todo_list";
const CLASSNAME_HIGH_LIGHT = "high-light"

//추가된 리스트의 텍스트를 클릭시 강조 표시 토글기능. 
function setHighLight(event){
    let span = event.target
    span.classList.toggle(CLASSNAME_HIGH_LIGHT);
}




function deleteTodo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(todo => todo.id  !== parseInt(li.id));
    saveTodo();
    
}

function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    
    span.addEventListener("click",setHighLight);
    const button = document.createElement("button");
    button.innerText = "Done?";
    button.classList = "todoButton";
    button.addEventListener("click", deleteTodo);
    
    
    li.appendChild(span);
    li.appendChild(button);
    todolist.appendChild(li);
    

}

function saveTodo(){
    localStorage.setItem(TODO_KEY, JSON.stringify(toDos));

}

// todo 제출 이벤트 관리
function onTodoSubmit(event){
    event.preventDefault();
    const newtodo = todoInput.value;
    todoInput.value ="";
    const newToDoObj = {
        text : newtodo,
        id : Date.now()
    };
    toDos.push(newToDoObj);
    paintTodo(newToDoObj);
    saveTodo();
}

todoForm.addEventListener("submit", onTodoSubmit);



const savedToDos = localStorage.getItem(TODO_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
}


