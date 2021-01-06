document.addEventListener('DOMContentLoaded', () => {
  let templates = (function() {
    let todoTemplate = document.getElementById('todo-template').innerHTML;
    let confirmTemplate = document.getElementById('confirmation-template').innerHTML;

    return {
      todo: Handlebars.compile(todoTemplate),
      confirmation: Handlebars.compile(confirmTemplate),
    }
  })();

  class Todo {
    static todoContainer = document.getElementById('todos');

    constructor(todoData) {
      this.id = todoData.id;
      this.title = todoData.title;
      this.html = templates.todo(todoData);
      this.element = this.createTodo();
      this.add();
      this.addDeleteListener();
      this.addContextMenuListener();
    }

    createTodo() {
      let todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      todoDiv.innerHTML = this.html;
      return todoDiv;
    }
    
    add() {
      Todo.todoContainer.appendChild(this.element);
    }

    addDeleteListener() {
      this.element.querySelector('.deleteButton').addEventListener('click', () => {
        new ConfirmDialog(this.element).add();
      });
    }

    addContextMenuListener() {
			let $menu = $('.contextMenu');

      this.element.addEventListener('contextmenu', event => {
        event.preventDefault();
				$menu.css('display', 'block');
				$menu.css('left', event.clientX);
				$menu.css('top', event.clientY);
				$(document).on('click', event => {
					if(!$(event.target).hasClass('contextMenu')) {
						$menu.css('display', 'none');
					}
				});
				// Add Event listener to the delete button on load
				//	- On click, close contextemnu create new ConfirmDialog withthis todo element as argument
				//  - Adding Todo removal functionality to the todo class
					
      });
    }
  }

  class ConfirmDialog {
    constructor(todo) {
      this.todo = todo;
      this.confirmationDialog = this.createConfirmationDialog();
      this.backgroundCover = this.createBackgroundCover();
      this.addYesListener();
      this.addNoListener();
      this.addBackgroundListener();
    }

    add() {
      document.body.appendChild(this.backgroundCover);
      document.body.appendChild(this.confirmationDialog);
    }

    remove() {
      this.confirmationDialog.remove();
      this.backgroundCover.remove();
    }

    addYesListener() {
      this.confirmationDialog.querySelector('.yes').addEventListener('click', () => {
        this.todo.remove();
        this.remove();
      });
    }

    addNoListener() {
      this.confirmationDialog.querySelector('.no').addEventListener('click', () => {
        this.remove(); 
      });
    }

    addBackgroundListener() {
      this.backgroundCover.addEventListener('click', () => {
        this.remove();
      });
    }

    createConfirmationDialog(todo) {
      let confirmationDiv = document.createElement('div');
      confirmationDiv.classList.add('delete');
      confirmationDiv.innerHTML = templates.confirmation();
      return confirmationDiv;
    }

    createBackgroundCover() {
      let backgroundCover = document.createElement('div');
      backgroundCover.classList.add('background');
      return backgroundCover;
  }

  class App {
    constructor(todos) {
      this.todos = todos.map(todo => new Todo(todo));
      this.addNewTodoFormListener();
      this.todoCount = this.todos.length;
    }

    addNewTodoFormListener() {
      document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

        let title = event.target.elements.namedItem('todoText').value;
        let id = this.todoCount++;
        this.todos.push(new Todo({title, id}));
        event.target.reset();
      });
    }
  }

  let todoItems = [
    { id: 1, title: 'Homework' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Calling Mom' },
    { id: 4, title: 'Coffee with John '},
    { id: 5, title: 'Deck the halls with boughs of holly'},
  ];

  new App(todoItems);
});
