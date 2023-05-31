export const getSender = (loggedUser,users)=>{
    if (!loggedUser || !users || !Array.isArray(users) || users.length < 2) {
        return '';
    }
    return users[0]._id === loggedUser._id?users[1].name:users[0].name;
}

export const getSenderFull = (loggedUser,users)=>{
    const val= users[0]._id === loggedUser._id?users[1]:users[0];
    return val;
}
