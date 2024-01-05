//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


//New task list item
const createNewTaskElement = function(taskString){

    const listItem = document.createElement("li");
    listItem.classList.add('list__item');

  //input (checkbox)
  const checkBox = document.createElement("input");//checkbx
  checkBox.classList.add('list__entry', 'entry', 'entry_checkbox');
  //label
  const label = document.createElement("label");//label
  label.classList.add('list__task-text', 'task_make')
  //input (text)
  const editInput = document.createElement("input");//text
  editInput.classList.add('list__entry', 'entry', 'entry_text');
  //button.edit
  const editButton = document.createElement("button");//edit button
  editButton.classList.add('list__button', 'button', 'button_edit');

  //button.delete
  const deleteButton = document.createElement("button");//delete button
  deleteButton.classList.add('list__button', 'button', 'button_delete');
  const deleteButtonImg = document.createElement("img");//delete button image
  deleteButtonImg.classList.add('button__img');

  label.innerText = taskString;

  //Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.

  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'remove target button';
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}


const addTask = function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";

}

//Edit an existing task.

const editTask = function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.entry-text');
  const label = listItem.querySelector(".list__task-text");
  const editBtn = listItem.querySelector(".button_edit");
  const containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {

      //switch to .editmode
      //label becomes the inputs value.
      label.innerText = editInput.value;
      editBtn.innerText = "Edit";
  } else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};


//Delete task.
const deleteTask = function(){
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest = function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector(".button_edit");
  const deleteButton = taskListItem.querySelector(".button_delete");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.