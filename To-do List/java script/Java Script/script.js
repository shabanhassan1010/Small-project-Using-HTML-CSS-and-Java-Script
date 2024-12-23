var Title = document.getElementById('title');
var Desc = document.getElementById('desc')
var addBtn = document.getElementById("add-btn");
var updateBtn = document.getElementById("update-btn");
var containerToPushItems = [];
var mood = 'Add';
var temp;
var titleError = document.getElementById("titleError");
var desError = document.getElementById("desError")

var submitBtn = document.getElementById("submit").addEventListener("click",()=>{

    var isValidTitle = validationTitle();
    var isValidDes = validationDescription();
    if(isValidTitle && isValidDes){
        addItem();
    }
});


function validationTitle(){
    if(Title.value.length > 7){
        titleError.innerText = "Title must be less than 7";
        return false;
    }
    else{
        titleError.innerText = "";
    }
    return true;
   
}
Title.addEventListener("input",(e)=>{
    validationTitle()
    e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""); 
})
Desc.addEventListener("input",(e)=>{
    validationDescription()
    e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""); 
})
function validationDescription()
{
    if(Desc.value.length > 20)
    {
        desError.innerText = "Description must be less than 20";
        return false;
      }
      else{
        desError.innerText = "";
      }
      return true;
}

if(localStorage.getItem('items') != null)
{
    containerToPushItems = JSON.parse(localStorage.getItem('items'));
    displayItems(containerToPushItems);
}

function addItem() 
{
        var items = {
            Title: Title.value, 
            Desc: Desc.value,   
            done: false, 
        };
        if (mood === 'Add') {
            containerToPushItems.push(items);  // Add new item to the list
        } else {
            // Update existing item at the temp index
            containerToPushItems[temp] = items;
            mood = 'Add'; // Reset mode to Add
            submit.innerHTML = "Add"; // Reset button text
        }

        localStorage.setItem("items", JSON.stringify(containerToPushItems));
        displayItems(containerToPushItems); 
        clearItems();
}

function displayItems(arr) 
{
    var cartona = '';
    for (var i = 0; i < arr.length; i++) {
        cartona += `
            <tr ${arr[i].done ? 'class="done"':''}>
                <td>${arr[i].Title}</td>
                <td>${arr[i].Desc}</td>
                <td ><button  onclick="DoneItems(${i})"> <i class="fa-solid fa-check"></i> </button></td>    
                <td><button  onclick="updateItems(${i})"> <i class="fa-solid fa-pen"></i>  </button></td>
                <td><button  onclick="deleteItems(${i})"> <i class="fa-solid fa-trash"></i> </button></td>
            </tr>
        `;
    }
    document.getElementById('table-Body').innerHTML = cartona; // hna ana ba3rdha fe el html
}

function clearItems()
{
    Title.value = '';
    Desc.value = '';
}

function deleteItems(i)
{
    containerToPushItems.splice(i , 1)
    localStorage.setItem('items' , containerToPushItems);
    displayItems(containerToPushItems);
}

function searchForItems(word)
{
    var matchedProduct =[];
    for(var i = 0 ; i < containerToPushItems.length ; i++)  // hna i will loop on all items
    {
        if(containerToPushItems[i].Title.toLowerCase().includes(word.toLowerCase()) == true) // search for the title of product
        {
            matchedProduct.push(containerToPushItems[i]);
        }
    }
    displayItems(matchedProduct);
}

function updateItems(i) {
    Title.value = containerToPushItems[i].Title;
    Desc.value = containerToPushItems[i].Desc;
    submit.innerHTML = 'Update'; // Change button text
    mood = 'Update'; // Switch mode to Update
    temp = i; // Store the index of the item to be updated
}

function DoneItems(i) {
    var items = JSON.parse(localStorage.getItem('items'));
    items[i].done = !items[i].done ;
    localStorage.removeItem('items')
    localStorage.setItem("items", JSON.stringify(items));
    displayItems(JSON.parse(localStorage.getItem('items')));  
}








