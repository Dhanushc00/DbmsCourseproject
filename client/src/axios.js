const axios = require("axios").create({
    baseURL: "http://localhost:3009",
  });
  
  axios.interceptors.request.use(
    async (req) => {
      console.log(req);
        return req;
    },
    (error) => {
      //console.log("thck1" + error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (config) => {
      //console.log(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export default axios;