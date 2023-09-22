import "./style.css";

// type for todo
type Todo = {
    title: string;
    isChecked: boolean;
    readonly id: number;
};
// Declare todos array;
let todos: Todo[];

// Get the todos stored in local storage;
const storedTodos = localStorage.getItem("todos");
if (storedTodos) {
    todos = JSON.parse(storedTodos);
    console.log(todos);
} else todos = [];

// Access dom elements  ;
const input: HTMLInputElement = document.getElementsByClassName(
    "input"
)[0] as HTMLInputElement;

const container = document.getElementsByClassName(
    "container"
)[0] as HTMLDivElement;

const h3 = document.getElementsByTagName("h3")[0] as HTMLHeadingElement;

const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;

// Create a todo (handleOnSubmitClick):
const createTodo = () => {
    if (input.value.trim() === "") return;

    const todo = {
        title: input.value,
        isChecked: false,
        id: Math.floor(Math.random() * 100),
    };

    todos.push(todo);
    input.value = "";

    showTodos();
};

// Generate the html Content :
const generateHtml = (todo: Todo) => {
    const list: HTMLDivElement = document.createElement("div");
    list.classList.add("list");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => handleOnCheckboxClick(todo);

    const para = document.createElement("p");
    para.innerText = todo.title;

    todo.isChecked == true && checkbox.setAttribute("checked", "checked");
    todo.isChecked == true && para.classList.add("checked");

    const delBtn = document.createElement("button");
    delBtn.classList.add("deleteBtn");
    delBtn.innerText = "X";
    delBtn.onclick = () => handleOnDeleteClick(todo);

    list.append(checkbox);
    list.append(para);
    list.append(delBtn);

    container.append(list);

    // The Html structure is :
    /*
      <div class="container" > 
          <div class="list"> 
            <input type="checkbox" > 
            <p class=""> title </p> 
            <button class="deleteBtn" onclick=deleteBtn> X <button>
          </div>
      </div>
    */
};

// Show the generated Content :
const showTodos = () => {
    container.innerHTML = "";

    localStorage.setItem("todos", JSON.stringify(todos));

    if (todos.length === 0) {
        h3.innerText = "No todos !";
    } else {
        h3.innerText = "Your todos";
        todos.map((e) => generateHtml(e));
    }
};

const handleOnCheckboxClick = (todo: Todo) => {
    todos = todos.map((e) => {
        if (e.id === todo.id) {
            e.isChecked == false ? (e.isChecked = true) : (e.isChecked = false);
        }
        return e;
    });
    showTodos();
};

const handleOnDeleteClick = (todo: Todo) => {
    todos = todos.filter((e) => e.id !== todo.id);
    showTodos();
};

// Call the showTodo :
showTodos();

//set create todo on submit btn ;
submitBtn.onclick = createTodo;

// Create a todo on enter click
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") submitBtn.click();
});

const btn = document.getElementById("mode") as HTMLButtonElement;
btn.onclick = () => {
    document.getElementsByTagName("body")[0].classList.toggle("light-mode");
    const changeModeBtn = document.getElementById("mode") as HTMLSpanElement;
    if (changeModeBtn.innerText == "☀️") changeModeBtn.innerText = "🌙";
    else changeModeBtn.innerText = "☀️";
};

// ☀️🌙
