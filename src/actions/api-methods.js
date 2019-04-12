import axios from 'axios'

export const postData = (data) => {
  var promise = new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8000"
      },
      url: axios.defaults.baseURL + 'add_item',
      data: {
        text: data,
        completed: false
      }
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      console.log("Could not fetch results due to " + error);
    });
  });
  return promise;
}

export const updateItemFromApi = (text,index) => {

  
  var promise = new Promise(function (resolve, reject) {
    axios({
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8000"
      },
      url: axios.defaults.baseURL + 'update_item',
      data: {
        id:index,
        data:text
      }
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      console.log("Could not fetch results due to " + error);
    });
  });
  return promise;
}


export const getInitialStateFromApi = () => {

  var promise = new Promise(function (resolve, reject) {
    axios({
      method: 'get',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8000"
      },
      url: axios.defaults.baseURL + 'get_data',
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      console.log("Could not fetch results due to " + error);
    });
  });
  return promise;
}

export const markItemInApi = (StateId,MongoId,flag) => {
  var promise = new Promise(function (resolve, reject) {
    axios({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8000"
      },
      url: axios.defaults.baseURL + 'mark_item',
      data: {
        index: MongoId,
        status: flag
      }
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      console.log("Could not fetch results due to " + error);
    });
  });
  return promise;
}


export const deleteItemFromApi = (id) => {

  var promise = new Promise(function (resolve, reject) {
    axios({
      method: 'delete',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8000"
      },
      url: axios.defaults.baseURL + 'delete_data',
      data: {
        index: id
      }
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      console.log("Could not fetch results due to " + error);
    });
  });
  return promise;
}