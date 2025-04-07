const initialState={
    userId:"",
    userName:"",
    image:'',
    email:''

}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SETUSER":
           const  {userId,userName,email,image,token,refreshToken}=action?.payload
           localStorage.setItem("token", token);
           localStorage.setItem("refreshToken", refreshToken);
            return {
                ...state,userId:userId,userName:userName,email:email,image:image
            };
        case "CHANGEIMAGE":
            return {...state,image:action?.payload}    
        case "REMOVEUSER":
                return initialState
         default:
            return state    

    }
}

export default userReducer