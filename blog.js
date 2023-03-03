
const posts = [["My first post", "2023-03-01", "A prepopulated summary for 'My first post'"]];

let count = 1;
let current = 0;
let content = document.createTextNode("");
//Add dialog
const addButton = document.getElementById("add-button");
const addDialog = document.getElementById("add-dialog");
const addSubmit = document.getElementById("add-submit");

//Update dialog
const updateDialog = document.getElementById("update-dialog");
const updateSubmit = document.getElementById("update-submit");

// Add dialog input
const postTitle = document.getElementById("title-input");
const postDate = document.getElementById("date-input");
const postSummary = document.getElementById("summary-input");

// Update dialog input
const updateTitle = document.getElementById("update-title-input");
const updateDate = document.getElementById("update-date-input");
const updateSummary = document.getElementById("update-summary-input");

// Output
outputList = document.getElementById("output-list")
const output = document.getElementById("post-output");

// Event listener for opening add dialog
addButton.addEventListener("click", () => {
    addDialog.showModal();
});

// Event listener for handling add button clicks
addSubmit.addEventListener('click', () => {
    let ptitle = postTitle.value;
    let pdate = postDate.value;
    let psummary = postSummary.value;

    const entry = [ptitle, pdate, psummary];

    posts.push(entry);
    createItem(entry);
});
  
// Appends blog post entry to output field, while updating array and element attributes
function createItem(entry) {
    const listTag = document.createElement("li");
    outputList.appendChild(listTag);

    content = document.createTextNode(entry[0] +", "+ entry[1] + ":" + entry[2] + " ");
    const editTextNode = document.createTextNode("Edit");
    const deleteTextNode = document.createTextNode("Delete");
    
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(deleteTextNode);

    const editButton = document.createElement("button");
    editButton.appendChild(editTextNode);

    listTag.appendChild(content);
    listTag.appendChild(deleteButton);
    listTag.appendChild(editButton);

    listTag.setAttribute("id", "listbullet"+ count);
    deleteButton.setAttribute("id", "deletebutton"+ count);
    deleteButton.setAttribute("class", "delete-buttons");
    editButton.setAttribute("id", "editbutton" + count);
    editButton.setAttribute("class", "update-buttons");
    
    count+=1;
    //Saves entry
    localStorage.setItem(current, entry);

}

// Event listener for all edit buttons
document.body.addEventListener('click', function (evt) {
    if (evt.target.className === "update-buttons"){
        // Retrieves the index associated with the blog post
        current = evt.target.parentNode.id.slice(-1);
        updateDialog.showModal(); 
    } 
}, false);

// Event listener for handling clicks on the submit button of the update dialog
updateSubmit.addEventListener("click", ()=> {
    let ptitle = updateTitle.value;
    let pdate = updateDate.value;
    let psummary = updateSummary.value;

    posts[current] = [ptitle, pdate, psummary];
    entry = posts[current];

    updateItem(entry, current);

    //Updates local storage entry
    localStorage.setItem(current, entry);
});

// Finds and changes text node of blog post
function updateItem(entry, currentBullet){
    item = document.getElementById("listbullet"+currentBullet);
    item.firstChild.textContent = `${entry[0]}, ${entry[1]} ${entry[2]} `;

}

// Event listener for all delete buttons associated with blog posts
document.body.addEventListener('click', function (evt) {
    if (evt.target.className === "delete-buttons"){
        // console.log(evt.target.parentNode.id);
        current = evt.target.parentNode.id.slice(-1);
        deleteItem(current);
    } 

}, false);

// Deletes item from output while updating array
function deleteItem(deleteIndex){
    item = document.getElementById("listbullet"+deleteIndex);
    item.remove();
    posts.splice(deleteIndex, 1);
    count-=1;
    updateIndices(deleteIndex);

}

function updateIndices(from){
    i = from + 1;
    j = from;

    while (j < posts.count){
        item = document.getElementById("listbullet"+i);
        item.setAttribute("id", "listbullet"+j);
        i+=1;
        j+=1;
        //Updates local storage entry
        localStorage.setItem(j, posts[i]);
    }
    
}

