// import axios from "axios";

axios.get("https://catroomdb.onrender.com/users")
    .then(function (res) {
        console.log(res.data);
    }).catch(function (err) {
        console.log(err.response);
    })
