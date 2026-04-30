let todos = [
    { title: 'Todo 1', description: 'Description for Todo 1' },
    { title: 'Todo 2', description: 'Description for Todo 2' }
];

function renderTodos() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" id="check-${index}">
            <span class="todo-title" onclick="toggleDescription(${index})">${todo.title}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
            <div class="todo-description" id="desc-${index}">${todo.description}</div>
        `;
        list.appendChild(li);
    });
}

function addTodo() {
    const title = document.getElementById('todo-title').value.trim();
    const description = document.getElementById('todo-description').value.trim();
    if (title) {
        todos.push({ title, description });
        document.getElementById('todo-title').value = '';
        document.getElementById('todo-description').value = '';
        renderTodos();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function toggleDescription(index) {
    const desc = document.getElementById(`desc-${index}`);
    desc.classList.toggle('show');
}

// Initial render
renderTodos();