// Mock data
import users from 'data/users';
import orders from 'data/orders';

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const webUrl = process.env.REACT_APP_WEB_URL;

function lookupUser(user) {
  const userCopy = JSON.parse(JSON.stringify(user));
  const userOrders = userCopy.orders.map(id =>
    orders.find(order => order.id === id)
  );
  const userMoneySpent = userCopy.orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  userCopy.orders = userOrders;
  userCopy.moneySpent = userMoneySpent;

  return userCopy;
}

export const getUsers = (limit = 10) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const usersLookup = users.slice(0, limit).map(lookupUser);

      resolve({
        users: usersLookup,
        usersTotal: users.length
      });
    }, 700);
  });
};

export const getTop = (timeRange) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify-auth')}`
      }
    }
    let tracks = JSON.parse(sessionStorage.getItem(`spotify-top-${timeRange}`));
    if (!tracks) {
      axios.get(`${apiUrl}/user/top/tracks?time_range=${timeRange}`, config)
        .then(res => {
          console.log(res);
          sessionStorage.setItem(`spotify-top-${timeRange}`, JSON.stringify(res.data.body.items))
          resolve(res.data.body.items)
        })
        .catch(err => reject(err))
    } else {
      resolve(tracks)
    }
  })
}

export const getUser = id => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify-auth')}`
      }
    }
    let user = JSON.parse(sessionStorage.getItem('spotify-me'));
    if (!user) {
      axios.get(`${apiUrl}/me`, config)
        .then(res => {
          console.log(res);
          sessionStorage.setItem('spotify-me', JSON.stringify(res.data.body))
          resolve(res.data.body)
        })
        .catch(err => reject(err))
    } else {
      resolve(user)
    }
  })
};
