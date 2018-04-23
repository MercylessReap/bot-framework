
var table = document.getElementById("intentsTable")
var tableContainer = document.getElementById("animal-info");
var intentRequest = new XMLHttpRequest();
tableContainer.addEventListener("load", loadIntents());


function loadIntents() {
  var appID='89b3e679-1506-4e5d-85bf-8afd5c81b702'
  intentRequest.open('GET', 'https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/'+appID+'/versions/0.1/train');
  intentRequest.setRequestHeader('Ocp-Apim-Subscription-Key', 'fc069d5a824d4f98b3e995df1ddbcde9')
  intentRequest.onload = function () {
    var intentsData = JSON.parse(intentRequest.responseText);
    renderHTML(intentsData);
  }
  intentRequest.send();
}

function renderHTML(data) {
    console.log(data)
    tableContainer.innerHTML = data;
  
}