const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
  'Accept': 'application/json'
};

export const doLogin = (payload) =>
  fetch(`${api}/users/login`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  }).then(res => {
    return res;
  }).catch(error => {
    console.log("This is error in doLogin");
    return error;
  });

export const doSignup = (payload) =>
  fetch(`${api}/users/signup`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(res => {
    return res;
  })
  .catch(error => {
    console.log("This is error in doSignup");
    return error;
  });

export const doLogout = (payload) =>
  fetch(`${api}/users/logout`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: {username: payload.username}
  }).then(res => {
    return res;
  })
  .catch(error => {
    console.log("This is error in doSignup");
    return error;
  });

export const userInfo = (payload) =>
  fetch(`${api}/users/userinfo`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(res => {
    return res;
  })
  .catch(error => {
    console.log("This is error in userInfo");
    return error;
  });

export const updateUserInfo = (payload) =>
  fetch(`${api}/users/updateuserinfo`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(res => {
    return res;
  })
  .catch(error => {
    console.log("This is error in update user info");
    return error;
  });

export const postProject = (payload) =>
  fetch(`${api}/projects/postproject`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in postproject");
      return error;
    });

export const allProjects = () =>
  fetch(`${api}/projects/allprojects`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in allUserProjects");
      return error;
    });

export const userProjects = (username) =>
  fetch(`${api}/projects/userprojects`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username})
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in userProjects");
      return error;
  });

export const userBidProjects = (username) =>
  fetch(`${api}/projects/userbidprojects`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username})
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in userBidProjects");
      return error;
  });

export const projectAndBids = (payload) =>
  fetch(`${api}/projects/projectandbids`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({projectId:payload.projectId})
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in projectAndBids");
      return error;
  });

export const userBid = (payload) =>
  fetch(`${api}/projectBid/userbid`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in userbids");
      return error;
  });

export const acceptBid = (projectId, employeeId) =>
  fetch(`${api}/projects/acceptproject`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({projectId: projectId, employeeId: employeeId})
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in accept bid");
      return error;
  });

  export const doTransaction = (payload) =>
    fetch(`${api}/users/transaction`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error in do transactions");
        return error;
    });

  export const allTransactions = (username) =>
    fetch(`${api}/users/alltransactions`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": username})
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error in getting all transactions");
        return error;
    });

  export const makeProjectCompleted = (projectId) =>
    fetch(`${api}/projects/markComplete`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"projectId": projectId})
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error in make project completed");
        return error;
    });

  export const makePaymentToFreelancer = (payload) =>
    fetch(`${api}/users/makePayment`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
      }).then(res => {
        return res;
      })
      .catch(error => {
        console.log("This is error in make payment");
        return error;
    });
