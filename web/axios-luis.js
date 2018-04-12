var axios= require('axios');
var tname= 'test3'
var token = 'fc069d5a824d4f98b3e995df1ddbcde9'
var deptID='5abea0315abfbb0b50afdc0e'
axios.get('http://localhost/api/department/'+deptID)
  .then((response) =>{
    console.log(response.data)
    var app={id:response.data.luisAppID,ver:response.data.luisAppVer}
    return app
  }).then((app)=>{
   return axios.post('https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/'+app.id+'/versions/'+app.ver+'/intents',{
        name: tname}, {headers: { 
            'Ocp-Apim-Subscription-Key': token,
            'Content-Type': 'application/json'
            }})
  }).then((response)=>{
   return axios.post('http://localhost/api/intent/',{ 
        name:tname,
        department:'global',
        question: 'yes man me work',
        answer:'test me na',
        status:'false',
        luisID:response.data,
        updated:new Date()})
  }).then((response)=>{
    console.log('success ',response);
  })
  .catch((error) => {
    console.log(error);
  });  

