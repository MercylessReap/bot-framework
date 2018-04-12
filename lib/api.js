var axios = require ('axios');
// Setting API Functions
function pushSetting() {
    return axios.push('/api/setting/');
}
function getSettings() {
    return axios.get('/api/setting/');
}
function getSetting(id) {
    return axios.get('/api/setting/'+id);
}
function putSetting(id) {
    return axios.put('/api/setting/'+id);
}
function deleteSetting(id) {
    return axios.delete('/api/setting/'+id);
}
// Department API Functions
function pushDepartment() {
    return axios.push('/api/department/');
}
function getDepartments() {
    return axios.get('/api/department/');
}
function getDepartment(id) {
    return axios.get('/api/department/'+id);
}
function putDepartment(id) {
    return axios.put('/api/department/'+id);
}
function deleteDepartment(id) {
    return axios.delete('/api/department/'+id);
}
// User API Functions
function pushUser() {
    return axios.push('/api/user/');
}
function getUsers() {
    return axios.get('/api/user/');
}
function getUser(id) {
    return axios.get('/api/user/'+id);
}
function putUser(id) {
    return axios.put('/api/user/'+id);
}
function deleteUser(id) {
    return axios.delete('/api/user/'+id);
}
// Team API Functions
function pushTeam() {
    return axios.push('/api/team/');
}
function getTeams() {
    return axios.get('/api/team/');
}
function getTeam(id) {
    return axios.get('/api/team/'+id);
}
function putTeam(id) {
    return axios.put('/api/team/'+id);
}
function deleteTeam(id) {
    return axios.get('/api/team/'+id);
}
// Intent API functions
function pushIntent() {
    return axios.get('/api/intent/');
}
function getIntents() {
    return axios.get('/api/intent/');
}
function getIntent(id) {
    return axios.get('/api/intent/'+id);
}
function putIntent(id) {
    return axios.put('/api/intent/'+id);
}
function deleteIntent(id) {
    return axios.delete('/api/intent/'+id);
}
// Log API functions
function pushLog() {
    return axios.get('/api/log/');
}
function getLogs() {
    return axios.get('/api/log/');
}

//Luis Api functions
function luisConfig(){
    getSettings().then((response)=>{
        var luisConfig = {headers: { 
            'Ocp-Apim-Subscription-Key': response.data.subscriptionKey,
            'Content-Type': 'application/json'
        }},
        luisRegion = response.data.luisRegion
    }) 
}

//Luis Apps
function getLuisApp(appID){
    return axios.get(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${appID}`,luisConfig)
}

function postLuisApp(name){

    return axios.post(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/`,
        {
            name: name,
            description: `This is the ${name} application`,
            culture: "en-us",
            usageScenario: "",
            domain: "",
            initialVersionId: "1.0"
        
        },luisConfig)
}
function putLuisApp(appID, name){

    return axios.put(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${appID}`,
        {
            name: name,
            description: `This is the ${name} application`,
        },luisConfig)
}
function deletetLuisApp(appID){
    return axios.delete(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${appID}`,
    luisConfig)
}
// Luis Intents
function getLuisIntent(){
    return axios.get(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${appID}/versions/${appVer}/intents/${intentID}`,luisConfig)
}

function postLuisIntent(){

    return axios.post(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${appID}/versions/${appVer}/intents`,{
    name: intentName}, luisConfig)
}
function deletetLuisIntent(){
    return axios.delete(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${appID}/versions/${appVer}/intents/${intentID}`,
    luisConfig)
}
//Luis Labels
