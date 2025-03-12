const ItemForm = document.getElementById("item-form");
const InputInvalid = document.getElementById("input-invalid");
const ItemInput = document.getElementById("item-input");
const ItemList = document.getElementById("list-item");
const ItemsClear = document.getElementById("items-clear");
const InputFilter = document.getElementById("input-filter");
const btn = document.getElementById("btn")
function creaticon(item) {
  const icon = document.createElement("i");
  //   console.log("the icon func is working ")
  icon.className = item;
  return icon;
}
function formvalidation(e) {
  let value = ItemInput.value;
  e.preventDefault();
  if (value == "") {
    e.preventDefault();
    InputInvalid.innerText = "the form is empty";
    return;
  } else {
    value.innerText = "";
    InputInvalid.innerHTML = "";
  }
  // const li = document.createElement("li");
  // li.className = "list-item";
  // li.textContent = value;
  // const icon = creaticon("bi bi-x fs-5 text-danger");
  // li.appendChild(icon);
  // ItemList.appendChild(li);
  // ItemInput.value = "";
  // checkUI();
  creatitem(value);
  creatstorange(value);
}
function creatitem(name) {
  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = name;
  const icon = creaticon("bi bi-x fs-5 text-danger");
  li.appendChild(icon);
  ItemList.appendChild(li);
  ItemInput.value = "";
  checkUI();
}
function creatstorange(name) {
  let items;
  if (localStorage.getItem("obj") == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("obj"));
  }
  items.push(name);
  localStorage.setItem("obj", JSON.stringify(items));
}
function removeitemfromstorange(name) {
  let items;
  if (localStorage.getItem("obj") == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("obj"));
  }
  items = items.filter((item) => item !== name.textContent);
  console.log(items);
  localStorage.setItem("obj", JSON.stringify(items));
}
function removeitem(e) {
  if (e.target.classList.contains("bi-x")) {
    e.target.parentElement.remove();
    removeitemfromstorange(e.target.parentElement);
    checkUI();
  } else {
    // ????
    ItemList.querySelectorAll("li").forEach(item=>item.classList.remove("edit-mode"))
    console.log(e.target);
    e.target.classList.add("edit-mode");
    ItemInput.value = e.target.textContent;
    btn.innerHTML = "<i class='bi bi-pencil'></i>  Update item"
    btn.classList.replace("btn-dark","btn-primary")
    
  }
}
function removeall() {
  ItemList.innerHTML = "";
  localStorage.removeItem("obj");
  console.log(localStorage.getItem("obj")); // Should be null now

  // console.log(localStorage.items)
  // localStorage.clear()
  checkUI();
  //   console.log(InputFilter)
  //   InputFilter.remove()
}
function checkUI() {
  const itmes = document.querySelectorAll("li");
  if (itmes.length === 0) {
    ItemsClear.style.display = "none";
    InputFilter.style.display = "none";
  } else {
    ItemsClear.style.display = "block";
    InputFilter.style.display = "block";
  }
}
function filter(e) {
  items = document.querySelectorAll("li");
  const txt = e.target.value.toLowerCase();
  items.forEach((item) => {
    const target = item.firstChild.textContent.toLowerCase();
    if (target.indexOf(txt) !== -1) {
      item.style.display = "flex";
      console.log("the filter is working");
    } else {
      item.style.display = "none";
      console.log("the filter is not working ");
    }
  });
}
function displayitems() {
  let items;
  if (localStorage.getItem("obj") == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("obj"));
  }
  items.forEach((item) => creatitem(item));
  checkUI();
}
//addevenlistener
ItemForm.addEventListener("submit", formvalidation);
ItemList.addEventListener("click", removeitem);
ItemsClear.addEventListener("click", removeall);
document.addEventListener("DOMContentLoaded", displayitems);
checkUI();
