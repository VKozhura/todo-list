let tasks = ["выучить JS", "сделат проекты в портфолио", "еще куча дел"];

const ul = document.querySelector(".list-group");
const form = document.forms["addTodoItem"];
const inputText = form.elements["todoText"];

const listTemplate = (task) => {
	const li = document.createElement("li");
	li.textContent = task;
	li.className = "list-group-item d-flex justify-content-between";

	// создание иконки корзины
	const iDelete = document.createElement("i");
	iDelete.className = "fas fa-trash-alt delete-item";
	li.append(iDelete);

	return li;
};

const clearList = () => {
	ul.innerHTML = "";
};

const generateList = (tasksArray) => {
	clearList();
	for (let i = 0; i < tasksArray.length; i++) {
		const li = listTemplate(tasksArray[i]);
		ul.append(li);
	}
};

const addTask = (task) => {
	tasks.unshift(task);
	// generateList(tasks);
	ul.insertAdjacentElement("afterbegin", listTemplate(task));
};

const deleteListItem = (target) => {
	const parent = target.closest("li"); //нашли родителя i
	const text = parent.textContent; //вернет текст без пробелов
	const index = tasks.indexOf(text); //находим индекс элемента в массиве
	tasks.splice(index, 1); //удалаяем из массива
	parent.remove(); // удаляем элемеент li (parent)
};

// делегирование события для ul
ul.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete-item")) {
		deleteListItem(e.target);
	}
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log(inputText.value);
	if (!inputText.value) {
		inputText.classList.add("is-invalid"); // класс бутстрапа
	} else {
		inputText.classList.remove("is-invalid");
		addTask(inputText.value);
		form.reset(); // очищение формы
	}
});

generateList(tasks);
