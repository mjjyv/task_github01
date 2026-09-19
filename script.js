document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
        { id: 1, text: 'Khám phá dự án mẫu GitHub', completed: true },
        { id: 2, text: 'Thêm công việc đầu tiên của bạn', completed: false }
    ];

    let currentFilter = 'all';

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;

            const leftDiv = document.createElement('div');
            leftDiv.className = 'task-left';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(task.id));

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;

            leftDiv.appendChild(checkbox);
            leftDiv.appendChild(span);

            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.innerHTML = '&times;';
            delBtn.title = 'Xóa';
            delBtn.addEventListener('click', () => deleteTask(task.id));

            li.appendChild(leftDiv);
            li.appendChild(delBtn);
            taskList.appendChild(li);
        });

        const activeCount = tasks.filter(t => !t.completed).length;
        taskCount.textContent = `${activeCount} việc còn lại`;
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.unshift(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }

    function toggleTask(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    renderTasks();
});
