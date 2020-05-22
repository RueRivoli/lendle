import axios from 'axios';
import VueCookies from 'vue-cookies'

const url = 'http://localhost:5000/api/auth';

class AuthService {

    static insertUser(user) {
        const url_signup = url + '/signup';
        console.log('insertUser');
        return new Promise(function(resolve, reject) {
            try {
                console.log(user);
                return axios.post(url_signup, user).then(function (response) {
                    console.log(response);
                    resolve(response.data);
                }).catch(function (error) {
                    console.log('RET 1');
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                      }
                    reject(error);
                });
            } catch(err) {
                console.log('RET 2');
                console.log(err);
                reject(err);
            }
        })
    }


    static logUser(user) {
        const url_login = url + '/login';
        return new Promise(function(resolve, reject) {
            try {
                return axios.post(url_login, user).then(function (response) {
                    console.log(response);
                    if (response.data.success) {
                        const token = response.data.token;
                        VueCookies.set('jwt' , token , "1h") 
                        resolve(token);
                    } else {
                        resolve(response);
                    }
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            } catch(err) {
                reject(err);
            }
        })
    }

    static signUpGoogle() {
        const url_google = url + '/google';
        console.log(url_google);
        return new Promise(function(resolve, reject) {
            try {
                // let config = {
                //     headers: {
                //         "Access-Control-Allow-Origin": "*"
                //     }
                // }
                console.log('AAABB');
                return axios.get(url_google).then(function (response) {
                    console.log('RETOUR');
                    console.log(response);
                    // if (response.data.success) {
                    //     const token = response.data.token;
                    //     localStorage.setItem('Authorization', token);
                    //     resolve(response.data.success);
                    // }
                    resolve(response);
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            } catch(err) {
                reject(err);
            }
        })
    }

    static sendValidationUser(mail) {
        const url_validation = url + '/validation';
        return new Promise(function(resolve, reject) {
            try {
                return axios.post(url_validation, mail).then(function (response) {
                    console.log(response);
                    resolve(response);
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            } catch(err) {
                reject(err);
            }
        })
    }

    static getProfile() {
        // console.log(profile);
        let url_profile = url + '/profile'
        return new Promise(function(resolve, reject) {
            try {
                // let config = {
                //     headers: {
                //         'Content-Type': 'application/json;charset=UTF-8',
                //         "Authorization": localStorage.getItem('Authorization'),
                //         Cookie: "cookie1=value; cookie2=value; cookie3=value;"
                //     }
                // };
                return axios.get(url_profile, { withCredentials: true }).then(function (response) {
                    console.log(response);
                    resolve(response);
                }).catch(function (error) {
                    console.log(error);
                });
            } catch(err) {
                console.log(err);
                reject(err);
            }
        })
    }

}

 export default AuthService;