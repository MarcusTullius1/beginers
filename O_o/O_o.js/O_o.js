
let addMessage = document.querySelector('.message'),
addButton = document.querySelector('.add'),
todo = document.querySelector('.todo');

let todoList = [];
if(localStorage.getItem('todo'))
todoList = JSON.parse(localStorage.getItem('todo'));
displayMessage();

addButton.addEventListener('click', function(){

  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };

  todoList.push(newTodo);
  displayMessage();
  localStorage.setItem('todo', JSON.stringify(todoList));
}) ;

function displayMessage(){
  let displayMessage = ''; 
todoList.forEach(function(item,i){

  displayMessage+=`
<li>
<input type = 'checkbox' id = 'item_${i}'${item.checked ?'checked' :'' }> 
<label for ='item_${i}'class="${item.important ? 'important':''}" > ${item.todo}</label>
</il>
`;

});
todo.innerHTML=displayMessage;
}

todo.addEventListener('change',function(event){
  let idInput =  (event.target.getAttribute('id'));
  let forLabel = todo.querySelector('[for = '+ idInput +']');
  let valueLabel = forLabel.innerHTML;
  console.log('valueLabel:', valueLabel);

  todoList.forEach(function(item){
    if (item.todo===valueLabel){
      item.checked = ! item.checked;
      localStorage.setItem('todo',JSON.stringify(todoList));
    }
  });
});

todo.addEventListener('contextmenu', function(event){
event.preventDefault();
todoList.forEach(function(item){
  if(item.todo===event.target.innerHTML){
    if(event.ctrlKey ||event.metaKey){
      todoList= todoList.filter(!( event.ctrlKey ||event.metaKey))
    }
    else{
      item.important = ! item.important;
    }

    displayMessage();
    localStorage.setItem('todo',JSON.stringify(todoList));
  }

});
});




