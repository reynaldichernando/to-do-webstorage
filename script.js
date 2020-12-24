const NOT_DONE = 0;
const DONE = 1;

const loadTasks = function() {
    document.querySelector('tbody').innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem('tasks'))

    tasks.forEach((element, index) => {
        let row = document.createElement('tr');

        let colName = document.createElement('td');
        colName.innerText = element.name;

        let colStatus = document.createElement('td');
        colStatus.innerText = element.status == NOT_DONE ? 'Not Done' : 'Done';

        let colAction = document.createElement('td');

        let btnRemove = document.createElement('button');
        btnRemove.innerText = 'Remove';
        btnRemove.addEventListener('click', function(event) {
            removeTask(index);
            loadTasks();
        })

        let btnFinish = document.createElement('button');
        btnFinish.innerText = 'Finish'
        btnFinish.addEventListener('click', function(event) {
            finishTask(index);
            loadTasks();
        })

        colAction.appendChild(btnRemove);
        colAction.appendChild(btnFinish);

        row.appendChild(colName);
        row.appendChild(colStatus);
        row.appendChild(colAction);

        document.querySelector('tbody').appendChild(row);
    })
}

const addTask = function(name) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push({
        name: name,
        status: NOT_DONE
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const removeTask = function(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const finishTask = function(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].status = DONE;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const handleAddTask = function() {
    document.querySelector('#btnAddTask').addEventListener('click', function(event) {
        let inputTask = document.querySelector('#txtName').value;
        if(inputTask == null || inputTask == '') return;
        else {
            addTask(inputTask);
            loadTasks();
            document.querySelector('#txtName').value = '';
        }
    })
}

handleAddTask();
loadTasks();