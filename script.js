let usersDiv = document.getElementById('users');
let showMesseage = (text) => {
    alert(text);
};
let createUserCard = (user) => {
    let temp = user.fname.charAt(0) + "" + user.lname.charAt(0);
    let image = <div class='custom-image'><span>${temp.toUpperCase()}</span></div>;
    let section = document.createElement('section');
    section.innerHTML = <div>${image}<p>${user.fname} ${user.lname}</p><div>${user.category}</div></div>;
    section.setAttribute('class', 'user-card');
    section.id = user${user.id};
    return section;
};
let users = [];
let renderUser = (user, id) => {
    user.id = id;
    usersDiv.appendChild(createUserCard(user));
    users.push(user);
};
let apiLink = 'http://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=["category1","category2","category3"]&pretty=true';
fetch(apiLink, {
    method: 'GET',
}).then(response => response.json()).then((response) => {
    for(let i = 0; i < response.length; ++i) {
        let user = response[i];
        let id = i;
        renderUser(user, id);
    }
}).catch((error) => {
    showMesseage('fetch error : ' + error);
});
let category1Button = document.getElementById('category1'); 
let category2Button = document.getElementById('category2'); 
let category3Button = document.getElementById('category3'); 
let fillters = [false, false, false];
category1Button.addEventListener('click', () => {
    fillters[0] = !fillters[0];
    if(fillters[0]) {
        category1Button.setAttribute('class', 'active');
    } else {
        category1Button.setAttribute('class', '');
    }
    reRender();
});
category2Button.addEventListener('click', () => {
    fillters[1] = !fillters[1];
    if(fillters[1]) {
        category2Button.setAttribute('class', 'active');
    } else {
        category2Button.setAttribute('class', '');
    }
    reRender();
});
category3Button.addEventListener('click', () => {
    fillters[2] = !fillters[2];
    if(fillters[2]) {
        category3Button.setAttribute('class', 'active');
    } else {
        category3Button.setAttribute('class', '');
    }
    reRender();
});
let reRender = () => {
    usersDiv.innerHTML = '';
    let all = !fillters[0] && !fillters[1] && !fillters[2];
    for(let i = 0; i < users.length; ++i) {
        if(all) {
            usersDiv.appendChild(createUserCard(users[i]));
        } else {
            if(users[i].category == 'category1') {
                if(fillters[0]) {
                    usersDiv.appendChild(createUserCard(users[i]));
                }
            } else if(users[i].category == 'category2') {
                if(fillters[1]) {
                    usersDiv.appendChild(createUserCard(users[i]));
                }
            } else {
                if(fillters[2]) {
                    usersDiv.appendChild(createUserCard(users[i]));
                }
            }
        }
    }
};