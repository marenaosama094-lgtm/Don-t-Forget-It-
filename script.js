let selectedProfile = "";
let selectedOccasion = "";
const profileScreen= document.getElementById("profileScreen");
const occasionScreen= document.getElementById("occasionScreen");
const checklistScreen= document.getElementById("checklistScreen");
const completionScreen= document.getElementById("completionScreen");
const screens= [profileScreen, occasionScreen, checklistScreen, completionScreen];
function showScreen(screenToShow) {
    screens.forEach(function(screen) {
        screen.classList.add("hidden");
    });
  screenToShow.classList.remove("hidden");
}
const profileButtons= document.querySelectorAll(".profile-choice");
profileButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedProfile= button.querySelector(".name").textContent;
        showScreen(occasionScreen);
    });
});
const occasionButtons= document.querySelectorAll(".occasion-choice");
occasionButtons.forEach(function(button){
button.addEventListener("click",function(){
    selectedOccasion=button.querySelector(".name").textContent;
   showScreen(checklistScreen);
 showChecklist();
   });
});
const backToOccasion= document.getElementById("backToOccasion");
backToOccasion.addEventListener("click",function(){
    showScreen(occasionScreen);
});
const backToProfile= document.getElementById("backToProfile");
backToProfile.addEventListener("click",function(){
    showScreen(profileScreen);
});
const itemList= document.getElementById("itemList");
const progressText = document.getElementById("progressText")
const packingItems= {
    Boy:{
University: ["Water bottle", "Laptop", "Notebooks", "Pens", "Student ID","Keys","Sunglasses"],
"Day Out":["Wallet", "Phone", "Camera","Water bottle","Keys"],
Travel: ["Passport", "Tickets", "Clothes", "Charger", "Headphones"],
    },
    Girl:{
University: ["Water bottle", "Laptop", "Notebooks", "Pens", "Student ID","Keys","Sunglasses","Makeup","Body Splash","Lip Balm"],
"Day Out":["Lip Gloss","Perfume","Wallet", "Phone", "Camera","Water bottle","Keys"],
Travel: ["Skincare Items","Sunscreen","Passport", "Tickets", "Clothes", "Charger", "Headphones"],
    }
};
function createChecklistItem(item) {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "item-checkbox";
    checkbox.addEventListener("change", updateProgress);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + item));
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-item-button";
    deleteButton.textContent = "✕";
    deleteButton.setAttribute("aria-label", "Delete " + item);
    deleteButton.addEventListener("click", function() {
        li.remove();
        updateProgress();
    });
    li.appendChild(label);
    li.appendChild(deleteButton);
    itemList.appendChild(li);
}
function showChecklist() {
    itemList.innerHTML = "";
    const items = packingItems[selectedProfile][selectedOccasion];
    items.forEach(function(item) {
        createChecklistItem(item);
    });
    updateProgress();
}
const addItemButton = document.getElementById("addItemButton");
const newItemInput = document.getElementById("newItemInput");
addItemButton.addEventListener("click", function() {
    const newItem = newItemInput.value.trim();
    if (newItem === "") {
        newItemInput.focus();
        return;
    }
    createChecklistItem(newItem);
    updateProgress();
    newItemInput.value = "";
    newItemInput.focus();
});
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function() {
   const sure   = confirm("Reset the checklist? This will uncheck everything and restore the original list.");
   if (!sure) {
    return;
   }
    newItemInput.value = "";
    showChecklist();
});
function updateProgress() {
    const checkboxes = itemList.querySelectorAll("input[type='checkbox']");
    const totalItems = checkboxes.length;
    const completedItems = itemList.querySelectorAll("input[type='checkbox']:checked").length;
    progressText.textContent = `${completedItems} of ${totalItems} items ready`;
}
const summaryList = document.getElementById("summaryList");
const doneButton = document.getElementById("doneButton");
doneButton.addEventListener("click", function() {
    const checkboxes = itemList.querySelectorAll("input[type='checkbox']:checked");
    if (checkboxes.length ===0) {
        alert("You haven't checked any items yet. Please check at least one item before proceeding.");
        return;
    }   
    summaryList.innerHTML = "";
    checkboxes.forEach(function(checkbox) {
        const li = document.createElement("li");
        li.textContent = checkbox.parentElement.textContent.trim();
        summaryList.appendChild(li);
    });
    showScreen(completionScreen);
});
const backToChecklist = document.getElementById("backToChecklist");
backToChecklist.addEventListener("click", function() {
    showScreen(checklistScreen);
});
const startOver = document.getElementById("startOver");
startOver.addEventListener("click", function() {
    showScreen(profileScreen);
});
