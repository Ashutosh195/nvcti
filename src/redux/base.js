const base = () => {
    // let idx = new Date().getTime()%2 + 1;
     let baseURL = `http://localhost:8000/api`;
    // let baseURL = `https://nvcti-mukul.herokuapp.com/api`;
    return baseURL;
}
module.exports = base;