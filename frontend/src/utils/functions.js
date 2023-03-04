function saveUserDetailsToLocalStorage(userDetails, timeToLive) {
  const itemToSave = {
    ...userDetails,
    expiry: new Date().getTime() + timeToLive,
  };
  localStorage.setItem("userDetails", JSON.stringify(itemToSave));
}

function retrieveUserDetailsFromLocalStorage() {
  const userDetailsStr = localStorage.getItem("userDetails");

  //if the item dosen't exist
  if (!userDetailsStr) {
    return null;
  }

  const userDetails = JSON.parse(userDetailsStr);
  const now = new Date();

  if (now.getTime() >= userDetails.expiry) {
    //details has expired
    localStorage.removeItem("userDetails");
    return null;
  }
  return userDetails;
}

export { saveUserDetailsToLocalStorage, retrieveUserDetailsFromLocalStorage };
