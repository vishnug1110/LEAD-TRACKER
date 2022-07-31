let myLeads=[];

const inputEL=document.getElementById("input-el");
const inputBtn=document.getElementById("input-btn");
const ulEL=document.getElementById("ul-el");
const deleteBtn=document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn");
//localStorage.setItem("myLeads","www.example.com");
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
// const tabs =
// [
//   {url :"https://www.google.com"}
// ]
if(leadsFromLocalStorage)
{
  myLeads=leadsFromLocalStorage;
  render(myLeads);
}

deleteBtn.addEventListener
( "dblclick",
  function()
  {
    localStorage.clear();
    myLeads=[];
    render(myLeads);

  }

)

tabBtn.addEventListener
(
  "click",
  function()
  {
     chrome.tabs.query({active: true, currentWindow: true},function(tabs)
     {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads",JSON.stringify(myLeads));
      render(myLeads);
     }
     )
     

     //console.log(tabs[0].url);
    
  }
)

inputBtn.addEventListener
("click",
function()
{
    myLeads.push(inputEL.value); //searched via google
   // console.log(myLeads);
   inputEL.value="";
   //myLeads=JSON.stringify(myLeads);
   localStorage.setItem("myLeads",JSON.stringify(myLeads));
   render(myLeads);
}

)

function render(leads)
{
    let listItems=" ";
    for(let i=0;i<leads.length;i++)
    {
       // listItems+=("<li><a target='_blank' href=' "+ myLeads[i]+"'>"+ myLeads[i]+"</li>");

       listItems+=(` 
       <li>
         <a target='_blank' href='${leads[i]}'>
         ${leads[i]}
       </li>`
         )
       
        console.log(listItems);
    }
    ulEL.innerHTML=listItems; //this listitems variable is taken to just put everything at once to the DOM (ulel.iinerhtml). this DOM would get updated only twice without getting updated in every loop in for loop!!.
}
