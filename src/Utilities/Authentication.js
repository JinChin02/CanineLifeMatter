class Authentication{
    registerSuccess(userlogin){
        sessionStorage.setItem('userlogin',userlogin);
    }

    logout(){
        sessionStorage.removeItem('userlogin');
    }

    isLoggedIn(){
        var user = sessionStorage.getItem('userlogin');
        if (user===null)return false; 
        return true;
    }
}
export default new Authentication();