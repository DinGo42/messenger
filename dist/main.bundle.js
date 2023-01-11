"use strict";
(self["webpackChunkmassager"] = self["webpackChunkmassager"] || []).push([["main"],{

/***/ "./src/animations/grow.ts":
/*!********************************!*\
  !*** ./src/animations/grow.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.growAnimation = void 0;
const growAnimation = (elem, save_zone) => {
    setTimeout(() => elem.classList.add('growing'), 0);
    setTimeout(() => save_zone.addEventListener('click', () => {
        elem.classList.remove('growing');
    }), 0);
};
exports.growAnimation = growAnimation;


/***/ }),

/***/ "./src/authorization/logIn/logIn.ts":
/*!******************************************!*\
  !*** ./src/authorization/logIn/logIn.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logIn = void 0;
const database_1 = __webpack_require__(/*! ../../database/database */ "./src/database/database.ts");
const logIn = (inputs_value) => {
    const lock = document.getElementById('lock');
    const user = (0, database_1.find)(inputs_value, 'users');
    if (!lock)
        return;
    if (!(user.length !== 0))
        return alert('password or email incorect');
    localStorage.setItem('current_user', user[0].id), lock.remove();
};
exports.logIn = logIn;


/***/ }),

/***/ "./src/authorization/signUp/signUp.ts":
/*!********************************************!*\
  !*** ./src/authorization/signUp/signUp.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signUp = void 0;
const userObject_1 = __webpack_require__(/*! ../../checks/userObject */ "./src/checks/userObject.ts");
const objectModel_1 = __webpack_require__(/*! ../../models/objectModel */ "./src/models/objectModel.ts");
const logIn_1 = __webpack_require__(/*! ../logIn/logIn */ "./src/authorization/logIn/logIn.ts");
const signUp = (inputs_value) => {
    (0, userObject_1.appendAndCheckObject)(objectModel_1.models.users, inputs_value);
    (0, logIn_1.logIn)(inputs_value);
};
exports.signUp = signUp;


/***/ }),

/***/ "./src/changeFunctions/delete/delete.ts":
/*!**********************************************!*\
  !*** ./src/changeFunctions/delete/delete.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteElem = void 0;
const elemConstrustor_1 = __webpack_require__(/*! ../../constructors/elemConstrustor */ "./src/constructors/elemConstrustor.ts");
const database_1 = __webpack_require__(/*! ../../database/database */ "./src/database/database.ts");
const deleteElem = ({ delete_button, collection }, elem) => {
    const button = (0, elemConstrustor_1.createElement)(delete_button);
    elem.firstChild.append(button);
    button.onclick = () => {
        (0, database_1.deleteObj)({ id: elem.id }, collection);
        elem.remove();
    };
};
exports.deleteElem = deleteElem;


/***/ }),

/***/ "./src/changeFunctions/rejectChange/rejectChange.ts":
/*!**********************************************************!*\
  !*** ./src/changeFunctions/rejectChange/rejectChange.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rejectChange = void 0;
const elemConstrustor_1 = __webpack_require__(/*! ../../constructors/elemConstrustor */ "./src/constructors/elemConstrustor.ts");
const rejectChange = ({ reject_edit }, elem) => {
    const button = (0, elemConstrustor_1.createElement)(reject_edit);
    button.onclick = () => {
        elem.remove();
    };
    return button;
};
exports.rejectChange = rejectChange;


/***/ }),

/***/ "./src/checks/userObject.ts":
/*!**********************************!*\
  !*** ./src/checks/userObject.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appendAndCheckObject = exports.createInputsValueObject = exports.checkUserObject = void 0;
const database_1 = __webpack_require__(/*! ../database/database */ "./src/database/database.ts");
const objectModel_1 = __webpack_require__(/*! ../models/objectModel */ "./src/models/objectModel.ts");
const createInputsValueObject = (obj) => {
    const object = {};
    for (const field in obj.fields) {
        object[field] = obj.fields[field].value;
    }
    return object;
};
exports.createInputsValueObject = createInputsValueObject;
const checkUserObject = (model, user_values) => {
    const { checks } = objectModel_1.models;
    (0, database_1.addCollection)(model.collection);
    const check_model = model.fields;
    for (const key in user_values) {
        if (!check_model[key]) {
            console.error('wrong object');
            return;
        }
    }
    for (const key in check_model) {
        for (const check in check_model[key]) {
            if (checks[check_model[key].type][check]) {
                const value = {
                    value: user_values[key],
                    check_value: check_model[key][check],
                    collection: model.collection,
                    field: key,
                };
                if (!checks[check_model[key].type][check](value)) {
                    alert(`${user_values[key]} - already using`);
                    return;
                }
            }
        }
    }
    const lock = document.getElementById('lock');
    if (lock)
        lock.remove();
};
exports.checkUserObject = checkUserObject;
const appendAndCheckObject = (model, user_values) => {
    checkUserObject(model, user_values);
    let id = (0, database_1.create_id)(objectModel_1.models[model.collection]);
    if (!(0, database_1.find)({ id }, model.collection)) {
        id = (0, database_1.create_id)(objectModel_1.models[model.collection]);
    }
    user_values.id = id;
    (0, database_1.addObject)(user_values, model.collection);
};
exports.appendAndCheckObject = appendAndCheckObject;


/***/ }),

/***/ "./src/checks/validation.ts":
/*!**********************************!*\
  !*** ./src/checks/validation.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidInput = void 0;
const objectModel_1 = __webpack_require__(/*! ../models/objectModel */ "./src/models/objectModel.ts");
function isValidInput(type_obj) {
    let is_valid = true;
    const { checks } = objectModel_1.models;
    for (const field in type_obj.fields) {
        const field_obj = type_obj.fields[field];
        const input = document.getElementById(field_obj.id);
        const input_validation = field_obj.validation;
        if (!input || !input.value)
            return;
        if (field_obj.required && !input.value) {
            is_valid = false;
        }
        field_obj.value = input.value;
        if (!input_validation
            || !Object.keys(checks).includes(input_validation.type)) {
            continue;
        }
        for (const method in checks[input_validation.type]) {
            if (input_validation[method]) {
                const value = {
                    value: input.value,
                    check_value: input_validation[method],
                };
                if (!checks[input_validation.type][method](value)) {
                    setInvalidInput(input, type_obj);
                    is_valid = false;
                    field_obj.value = null;
                }
            }
        }
    }
    if (is_valid) {
        const submit = document.getElementById(type_obj.submit_button.id);
        if (!submit)
            return;
        submit.disabled = false;
        submit.classList.remove('disabled-button');
    }
    function setInvalidInput(input, { submit_button, error_style }) {
        const submit = document.getElementById(submit_button.id);
        if (!submit)
            return console.error('submit is null');
        is_valid = false;
        input.classList.add(error_style);
        submit.disabled = true;
        submit.classList.add('disabled-button');
        setTimeout(() => input.classList.remove(error_style), 820);
    }
}
exports.isValidInput = isValidInput;


/***/ }),

/***/ "./src/constructors/createWindowLock.ts":
/*!**********************************************!*\
  !*** ./src/constructors/createWindowLock.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lockWindowForm = void 0;
const lockWindowForm = () => {
    const lock = document.createElement('div');
    lock.id = 'lock';
    lock.classList.add('window-lock');
    return lock;
};
exports.lockWindowForm = lockWindowForm;


/***/ }),

/***/ "./src/constructors/elemConstrustor.ts":
/*!*********************************************!*\
  !*** ./src/constructors/elemConstrustor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createElement = void 0;
const createElement = ({ text, elem_type, classList, ...params }) => {
    const elem = document.createElement(elem_type);
    classList.split(' ').forEach((style) => {
        elem.classList.add(style);
    });
    elem.innerText = text;
    for (const param in params) {
        elem[param] = params[param];
    }
    return elem;
};
exports.createElement = createElement;


/***/ }),

/***/ "./src/database/database.ts":
/*!**********************************!*\
  !*** ./src/database/database.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteObj = exports.editObject = exports.create_id = exports.find = exports.uploadFromLocalStorage = exports.getObject = exports.getCollection = exports.addObject = exports.addCollection = exports.l_database = void 0;
const objectModel_1 = __webpack_require__(/*! ../models/objectModel */ "./src/models/objectModel.ts");
const checks = objectModel_1.models.checks;
let l_database = {};
exports.l_database = l_database;
const saveToLocalStorage = () => {
    localStorage.setItem('database', JSON.stringify(l_database));
};
const uploadFromLocalStorage = () => {
    const database = localStorage.getItem('database');
    if (!database)
        return;
    exports.l_database = l_database = JSON.parse(database) ?? {};
};
exports.uploadFromLocalStorage = uploadFromLocalStorage;
const addCollection = (name, value = []) => {
    if (name in l_database)
        return;
    l_database[name] = value;
    saveToLocalStorage();
};
exports.addCollection = addCollection;
const addObject = (obj, collection) => {
    let is_valid = true;
    const current_collection = objectModel_1.models[collection];
    for (const field in current_collection) {
        for (const check in current_collection[field]) {
            if (current_collection[field][check] === true) {
                if (!checks[current_collection[field].type][check](obj, field, collection)) {
                    is_valid = false;
                }
            }
        }
    }
    if (!is_valid)
        return console.error('incorect user value');
    l_database[collection].push(obj);
    saveToLocalStorage();
};
exports.addObject = addObject;
const editObject = (collection, new_value) => {
    l_database[collection].forEach((obj) => {
        Object.keys(new_value).forEach((field) => {
            if (obj.id === new_value.id) {
                obj[field] = new_value[field];
            }
        });
    });
    saveToLocalStorage();
};
exports.editObject = editObject;
const deleteObj = ({ id }, collection) => {
    l_database[collection].filter((elem, index, arr) => {
        if (elem.id == id) {
            arr.splice(index, 1);
        }
    });
    saveToLocalStorage();
};
exports.deleteObj = deleteObj;
const getCollection = (name) => {
    if (name in l_database)
        return l_database[name];
    throw `field ${name} no in m_database`;
};
exports.getCollection = getCollection;
const create_id = ({ id, type }) => {
    const result = [type];
    for (let int = 0; int < id; int++) {
        result.push(Math.random()
            .toString(36)
            .substring(2, id + 2));
    }
    return result.join('-');
};
exports.create_id = create_id;
const find = (condition_obj, collection) => {
    if (!l_database[collection])
        return [];
    return l_database[collection].filter((item) => {
        for (const field in condition_obj) {
            if (item[field] !== condition_obj[field]) {
                return false;
            }
        }
        return true;
    });
};
exports.find = find;
const getObject = () => { };
exports.getObject = getObject;


/***/ }),

/***/ "./src/forms/logInForm/logInForm.ts":
/*!******************************************!*\
  !*** ./src/forms/logInForm/logInForm.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createLogInForm = void 0;
const objectModel_1 = __webpack_require__(/*! ../../models/objectModel */ "./src/models/objectModel.ts");
const validation_1 = __webpack_require__(/*! ../../checks/validation */ "./src/checks/validation.ts");
const userObject_1 = __webpack_require__(/*! ../../checks/userObject */ "./src/checks/userObject.ts");
const logIn_1 = __webpack_require__(/*! ../../authorization/logIn/logIn */ "./src/authorization/logIn/logIn.ts");
const createWindowLock_1 = __webpack_require__(/*! ../../constructors/createWindowLock */ "./src/constructors/createWindowLock.ts");
const elemConstrustor_1 = __webpack_require__(/*! ../../constructors/elemConstrustor */ "./src/constructors/elemConstrustor.ts");
const createLogInForm = () => {
    const login_obj = objectModel_1.models.log_in;
    const log_in_lock = (0, createWindowLock_1.lockWindowForm)();
    const exit = (0, elemConstrustor_1.createElement)(login_obj.reject_button);
    exit.onclick = () => {
        log_in_lock.remove();
    };
    const Log_in_window = document.createElement('div');
    Log_in_window.classList.add('authorization-window');
    Log_in_window.id = 'lock';
    const form = document.createElement('form');
    form.id = 'log-in-form';
    form.name = 'log_in';
    form.addEventListener('change', () => {
        (0, validation_1.isValidInput)(login_obj);
    });
    for (const field in login_obj.fields) {
        form.insertAdjacentElement('beforeend', (0, elemConstrustor_1.createElement)(login_obj.fields[field]));
    }
    const submit = (0, elemConstrustor_1.createElement)(login_obj.submit_button);
    submit.onclick = () => (0, logIn_1.logIn)((0, userObject_1.createInputsValueObject)(login_obj));
    Log_in_window.insertAdjacentHTML('afterbegin', `<h1>${login_obj.window_text}</h1>`);
    Log_in_window.insertAdjacentElement('afterbegin', exit);
    form.insertAdjacentElement('beforeend', submit);
    Log_in_window.insertAdjacentElement('beforeend', form);
    log_in_lock.insertAdjacentElement('beforeend', Log_in_window);
    document.body.append(log_in_lock);
};
exports.createLogInForm = createLogInForm;


/***/ }),

/***/ "./src/forms/postEditForm/postEditForm.ts":
/*!************************************************!*\
  !*** ./src/forms/postEditForm/postEditForm.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.editPostForm = void 0;
const elemConstrustor_1 = __webpack_require__(/*! ../../constructors/elemConstrustor */ "./src/constructors/elemConstrustor.ts");
const createWindowLock_1 = __webpack_require__(/*! ../../constructors/createWindowLock */ "./src/constructors/createWindowLock.ts");
const rejectChange_1 = __webpack_require__(/*! ../../changeFunctions/rejectChange/rejectChange */ "./src/changeFunctions/rejectChange/rejectChange.ts");
const validation_1 = __webpack_require__(/*! ../../checks/validation */ "./src/checks/validation.ts");
const userObject_1 = __webpack_require__(/*! ../../checks/userObject */ "./src/checks/userObject.ts");
const createPosts_1 = __webpack_require__(/*! ../../posts/createPosts */ "./src/posts/createPosts.ts");
const objectModel_1 = __webpack_require__(/*! ../../models/objectModel */ "./src/models/objectModel.ts");
const database_1 = __webpack_require__(/*! ../../database/database */ "./src/database/database.ts");
const editPost_1 = __webpack_require__(/*! ../../posts/editPost */ "./src/posts/editPost.ts");
const delete_1 = __webpack_require__(/*! ../../changeFunctions/delete/delete */ "./src/changeFunctions/delete/delete.ts");
const editPostForm = (obj, elem) => {
    const log_in_lock = (0, createWindowLock_1.lockWindowForm)();
    const Log_in_window = document.createElement('div');
    Log_in_window.classList.add('authorization-window');
    const submit = (0, elemConstrustor_1.createElement)(obj.submit_button);
    const reject = (0, rejectChange_1.rejectChange)(obj, log_in_lock);
    const post = document.createElement('form');
    post.classList.add(obj.css);
    const { fields } = obj;
    post.insertAdjacentElement('afterbegin', submit);
    post.insertAdjacentElement('afterbegin', reject);
    for (const field in fields) {
        const elem = document.createElement('div');
        fields[field].css.split(' ').forEach((style) => {
            elem.classList.add(style);
        });
        const input = (0, elemConstrustor_1.createElement)(fields[field]);
        post.insertAdjacentElement('beforeend', input);
    }
    post.onchange = () => {
        (0, validation_1.isValidInput)(obj);
    };
    submit.onclick = () => {
        const value = (0, userObject_1.createInputsValueObject)(obj);
        value.userId = localStorage.getItem('current_user');
        value.id = elem.id;
        const post = (0, createPosts_1.drawPost)(objectModel_1.models.posts, {
            title: value.title,
            text: value.text,
        });
        post.id = elem.id;
        (0, userObject_1.checkUserObject)(objectModel_1.models.posts, value);
        (0, database_1.editObject)('posts', value);
        log_in_lock.remove();
        (0, editPost_1.editPost)(objectModel_1.models.posts, post);
        (0, delete_1.deleteElem)(objectModel_1.models.posts, post);
        elem.parentNode.replaceChild(post, elem);
    };
    Log_in_window.insertAdjacentElement('afterbegin', post);
    log_in_lock.insertAdjacentElement('beforeend', Log_in_window);
    return log_in_lock;
};
exports.editPostForm = editPostForm;


/***/ }),

/***/ "./src/forms/postForm/postForm.ts":
/*!****************************************!*\
  !*** ./src/forms/postForm/postForm.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postForm = void 0;
const objectModel_1 = __webpack_require__(/*! ../../models/objectModel */ "./src/models/objectModel.ts");
const validation_1 = __webpack_require__(/*! ../../checks/validation */ "./src/checks/validation.ts");
const userObject_1 = __webpack_require__(/*! ../../checks/userObject */ "./src/checks/userObject.ts");
const database_1 = __webpack_require__(/*! ../../database/database */ "./src/database/database.ts");
const createPosts_1 = __webpack_require__(/*! ../../posts/createPosts */ "./src/posts/createPosts.ts");
const createWindowLock_1 = __webpack_require__(/*! ../../constructors/createWindowLock */ "./src/constructors/createWindowLock.ts");
const elemConstrustor_1 = __webpack_require__(/*! ../../constructors/elemConstrustor */ "./src/constructors/elemConstrustor.ts");
const postForm = (obj) => {
    const sign_up_lock = (0, createWindowLock_1.lockWindowForm)();
    const submit = (0, elemConstrustor_1.createElement)(obj.submit_button);
    const post = document.createElement('form');
    post.classList.add(obj.css);
    const { fields } = obj;
    post.insertAdjacentElement('afterbegin', submit);
    for (const field in fields) {
        const elem = document.createElement('div');
        fields[field].css.split(' ').forEach((style) => {
            elem.classList.add(style);
        });
        const input = (0, elemConstrustor_1.createElement)(fields[field]);
        input.value = null;
        post.insertAdjacentElement('beforeend', input);
    }
    post.onchange = () => (0, validation_1.isValidInput)(obj);
    submit.onclick = () => {
        const user_posts = document.getElementById('user-posts');
        if (!user_posts)
            return;
        const window_lock = document.getElementById('lock');
        const value = (0, userObject_1.createInputsValueObject)(obj);
        value.userId = localStorage.getItem('current_user');
        value.id = (0, database_1.create_id)(obj);
        (0, userObject_1.appendAndCheckObject)(objectModel_1.models.posts, value);
        if (window_lock) {
            window_lock.remove();
        }
        (0, createPosts_1.createPost)(objectModel_1.models.posts, value, user_posts);
    };
    document.body.append(sign_up_lock);
    sign_up_lock.insertAdjacentElement('beforeend', post);
};
exports.postForm = postForm;


/***/ }),

/***/ "./src/forms/signUpForm/signUpForm.ts":
/*!********************************************!*\
  !*** ./src/forms/signUpForm/signUpForm.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSignUpForm = void 0;
const elemConstrustor_1 = __webpack_require__(/*! ../../constructors/elemConstrustor */ "./src/constructors/elemConstrustor.ts");
const createWindowLock_1 = __webpack_require__(/*! ../../constructors/createWindowLock */ "./src/constructors/createWindowLock.ts");
const objectModel_1 = __webpack_require__(/*! ../../models/objectModel */ "./src/models/objectModel.ts");
const validation_1 = __webpack_require__(/*! ../../checks/validation */ "./src/checks/validation.ts");
const signUp_1 = __webpack_require__(/*! ../../authorization/signUp/signUp */ "./src/authorization/signUp/signUp.ts");
const userObject_1 = __webpack_require__(/*! ../../checks/userObject */ "./src/checks/userObject.ts");
const createSignUpForm = () => {
    const sign_obj = objectModel_1.models.sign_up;
    const sign_up_lock = (0, createWindowLock_1.lockWindowForm)();
    const exit = (0, elemConstrustor_1.createElement)(sign_obj.reject_button);
    exit.onclick = () => {
        sign_up_lock.remove();
    };
    const sign_up_window = document.createElement('div');
    sign_up_window.classList.add('authorization-window');
    const form = document.createElement('form');
    form.id = 'sign-up-form';
    form.name = 'sign_up';
    form.addEventListener('change', () => {
        (0, validation_1.isValidInput)(sign_obj);
    });
    for (const field in sign_obj.fields) {
        console.log(sign_obj.fields[field]);
        form.insertAdjacentElement('beforeend', (0, elemConstrustor_1.createElement)(sign_obj.fields[field]));
    }
    const submit = (0, elemConstrustor_1.createElement)(sign_obj.submit_button);
    submit.onclick = () => (0, signUp_1.signUp)((0, userObject_1.createInputsValueObject)(sign_obj));
    sign_up_window.insertAdjacentHTML('afterbegin', `<h1>${sign_obj.window_text}</h1>`);
    sign_up_window.insertAdjacentElement('afterbegin', exit);
    form.insertAdjacentElement('beforeend', submit);
    sign_up_window.insertAdjacentElement('beforeend', form);
    sign_up_lock.insertAdjacentElement('beforeend', sign_up_window);
    document.body.append(sign_up_lock);
};
exports.createSignUpForm = createSignUpForm;


/***/ }),

/***/ "./src/i.ts":
/*!******************!*\
  !*** ./src/i.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const createPosts_1 = __webpack_require__(/*! ./posts/createPosts */ "./src/posts/createPosts.ts");
const main_1 = __webpack_require__(/*! ./main/main */ "./src/main/main.ts");
const footer_1 = __webpack_require__(/*! ./main/footer */ "./src/main/footer.ts");
const database_1 = __webpack_require__(/*! ./database/database */ "./src/database/database.ts");
const objectModel_1 = __webpack_require__(/*! ./models/objectModel */ "./src/models/objectModel.ts");
(0, database_1.uploadFromLocalStorage)();
if (!document.getElementById('full')) {
    (0, main_1.createMainHtml)();
}
const current_user = localStorage.getItem('current_user');
if (!current_user) {
    (0, footer_1.loginBar)();
}
const user_posts = document.getElementById('user-posts');
(0, createPosts_1.createAppendPostForm)(user_posts);
(0, database_1.find)({ userId: current_user }, 'posts').forEach((post) => {
    (0, createPosts_1.createPost)(objectModel_1.models.posts, post, user_posts);
});
console.log(1);


/***/ }),

/***/ "./src/main/footer.ts":
/*!****************************!*\
  !*** ./src/main/footer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginBar = void 0;
const signUpForm_1 = __webpack_require__(/*! ../forms/signUpForm/signUpForm */ "./src/forms/signUpForm/signUpForm.ts");
const logInForm_1 = __webpack_require__(/*! ../forms/logInForm/logInForm */ "./src/forms/logInForm/logInForm.ts");
function loginBar() {
    const loginBar = document.createElement('footer');
    const buttons_div = document.createElement('div');
    buttons_div.classList.add('buttons-div');
    const sign = document.createElement('button');
    sign.classList.add('buttons-reg');
    sign.innerText = 'sign up';
    const login = document.createElement('button');
    login.classList.add('buttons-reg');
    login.innerText = 'log in';
    buttons_div.insertAdjacentElement('beforeend', sign);
    buttons_div.insertAdjacentElement('beforeend', login);
    const text_info = document.createElement('h1');
    text_info.innerText = 'Register to create your own posts';
    const full = document.getElementById('full');
    if (!full)
        return;
    loginBar.insertAdjacentElement('beforeend', text_info);
    loginBar.insertAdjacentElement('beforeend', buttons_div);
    full.insertAdjacentElement('beforeend', loginBar);
    sign.onclick = () => {
        (0, signUpForm_1.createSignUpForm)();
    };
    login.onclick = () => {
        (0, logInForm_1.createLogInForm)();
    };
}
exports.loginBar = loginBar;


/***/ }),

/***/ "./src/main/main.ts":
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMainHtml = void 0;
const createMainHtml = () => {
    const full = document.createElement('div');
    full.id = 'full';
    const header = document.createElement('header');
    const search = document.createElement('input');
    search.id = 'search';
    search.placeholder = 'Search';
    search.src = '/icons/search.png';
    const logo = document.createElement('div');
    logo.classList.add('logo');
    const logo_img = document.createElement('img');
    logo_img.classList.add('logo');
    logo_img.src = '../icons/logo.png';
    logo.insertAdjacentElement('beforeend', logo_img);
    const user = document.createElement('div');
    user.classList.add('user');
    header.insertAdjacentElement('beforeend', logo);
    header.insertAdjacentElement('beforeend', search);
    header.insertAdjacentElement('beforeend', user);
    const main = document.createElement('main');
    const left_bar = document.createElement('div');
    left_bar.id = 'left-control-bar';
    left_bar.style.height = `${document.documentElement.clientHeight - 70}px`;
    const main_bar = document.createElement('div');
    main_bar.id = 'main';
    main_bar.style.height = `${document.documentElement.clientHeight - 70}px`;
    main_bar.style.overflow = 'auto';
    main.insertAdjacentElement('beforeend', left_bar);
    main.insertAdjacentElement('beforeend', main_bar);
    const user_posts = document.createElement('div');
    user_posts.id = 'user-posts';
    const text = document.createElement('h1');
    text.innerText = 'your posts';
    main_bar.insertAdjacentElement('afterbegin', user_posts);
    main_bar.insertAdjacentElement('afterbegin', text);
    full.insertAdjacentElement('beforeend', header);
    full.insertAdjacentElement('beforeend', main);
    document.body.append(full);
};
exports.createMainHtml = createMainHtml;


/***/ }),

/***/ "./src/models/authorization/logInModel/logInModel.ts":
/*!***********************************************************!*\
  !*** ./src/models/authorization/logInModel/logInModel.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.login_obj = void 0;
const standartChecks_1 = __webpack_require__(/*! ../../checks/standartChecks */ "./src/models/checks/standartChecks.ts");
exports.login_obj = {
    type: 'logIn',
    window_text: 'Log in',
    error_style: 'invalid',
    input_class: 'authorization-input',
    reject_button: {
        elem_type: 'button',
        id: 'reject_form',
        name: 'reject',
        classList: 'buttons-reg',
        text: 'X',
        type: 'button',
    },
    submit_button: {
        elem_type: 'button',
        id: 'submit_reg',
        name: 'Submit',
        classList: 'buttons-reg disabled-button',
        text: 'Submit',
        type: 'button',
        disabled: true,
    },
    fields: {
        email: {
            elem_type: 'input',
            name: 'email_input',
            classList: 'authorization-input',
            type: 'email',
            id: 'email',
            placeholder: 'exzample@ukr.net',
            required: true,
            validation: {
                type: 'string',
                min_length: 4,
                max_length: 120,
                check: standartChecks_1.reg_exp_email,
            },
            value: null,
        },
        password: {
            elem_type: 'input',
            name: 'password_input',
            classList: 'authorization-input',
            type: 'password',
            id: 'password',
            placeholder: 'Password',
            required: true,
            validation: {
                type: 'string',
                check: /[\d\w]{4,120}/,
            },
            value: null,
        },
    },
};


/***/ }),

/***/ "./src/models/authorization/signUpModel/signUpModel.ts":
/*!*************************************************************!*\
  !*** ./src/models/authorization/signUpModel/signUpModel.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sign_obj = void 0;
const standartChecks_1 = __webpack_require__(/*! ../../checks/standartChecks */ "./src/models/checks/standartChecks.ts");
exports.sign_obj = {
    type: 'signUp',
    window_text: 'Sign up',
    error_style: 'invalid',
    input_class: 'authorization-input',
    reject_button: {
        elem_type: 'button',
        id: 'reject_form',
        name: 'reject',
        classList: 'authorization-input',
        text: 'X',
        type: 'button',
    },
    submit_button: {
        elem_type: 'button',
        id: 'submit_reg',
        name: 'Submit',
        classList: 'buttons-reg disabled-button',
        text: 'Submit',
        type: 'button',
        disabled: true,
    },
    fields: {
        nickname: {
            elem_type: 'input',
            name: 'nickname_input',
            classList: 'authorization-input',
            type: 'text',
            id: 'nickname',
            placeholder: 'your nick?',
            required: true,
            validation: {
                type: 'string',
                check: /[\d\w]{4,120}/,
            },
            value: null,
        },
        email: {
            elem_type: 'input',
            name: 'email_input',
            type: 'email',
            classList: 'authorization-input',
            id: 'email',
            placeholder: 'exzample@ukr.net',
            required: true,
            validation: {
                type: 'string',
                min_length: 4,
                max_length: 120,
                check: standartChecks_1.reg_exp_email,
            },
            value: null,
        },
        password: {
            elem_type: 'input',
            name: 'password_input',
            classList: 'authorization-input',
            type: 'password',
            id: 'password',
            placeholder: 'Password',
            required: true,
            initial_value: 12345678,
            validation: {
                type: 'string',
                check: /[\d\w]{4,120}/,
            },
            value: null,
        },
    },
};


/***/ }),

/***/ "./src/models/checks/checks.ts":
/*!*************************************!*\
  !*** ./src/models/checks/checks.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checks = void 0;
const standartChecks_1 = __webpack_require__(/*! ./standartChecks */ "./src/models/checks/standartChecks.ts");
exports.checks = {
    string: {
        type: ({ value }) => typeof value === 'string',
        min_length: ({ value, check_value }) => value.length > check_value,
        max_length: ({ value, check_value }) => value.length < check_value,
        ...standartChecks_1.standard_checks,
    },
    number: {
        type: ({ value }) => typeof value === 'number',
        ...standartChecks_1.standard_checks,
    },
};


/***/ }),

/***/ "./src/models/checks/standartChecks.ts":
/*!*********************************************!*\
  !*** ./src/models/checks/standartChecks.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.standard_checks = exports.reg_exp_email = void 0;
const database_1 = __webpack_require__(/*! ../../database/database */ "./src/database/database.ts");
const reg_exp_email = /[a-f0-9]*@\w{3,5}\.[a-f]{0,3}/;
exports.reg_exp_email = reg_exp_email;
const standard_checks = {
    unique: ({ value, collection, field }) => ![...new Set((0, database_1.getCollection)(collection).map((a) => a[field]))].includes(value),
    required: ({ value }) => !!value,
    check: ({ value, check_value }) => check_value.test(value),
};
exports.standard_checks = standard_checks;


/***/ }),

/***/ "./src/models/objectModel.ts":
/*!***********************************!*\
  !*** ./src/models/objectModel.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.models = void 0;
const userModel_1 = __webpack_require__(/*! ./userModel/userModel */ "./src/models/userModel/userModel.ts");
const postModel_1 = __webpack_require__(/*! ./postModel/postModel */ "./src/models/postModel/postModel.ts");
const checks_1 = __webpack_require__(/*! ./checks/checks */ "./src/models/checks/checks.ts");
const editPostForm_1 = __webpack_require__(/*! ./posts/editPostFrom/editPostForm */ "./src/models/posts/editPostFrom/editPostForm.ts");
const postForm_1 = __webpack_require__(/*! ./posts/postForm/postForm */ "./src/models/posts/postForm/postForm.ts");
const logInModel_1 = __webpack_require__(/*! ./authorization/logInModel/logInModel */ "./src/models/authorization/logInModel/logInModel.ts");
const signUpModel_1 = __webpack_require__(/*! ./authorization/signUpModel/signUpModel */ "./src/models/authorization/signUpModel/signUpModel.ts");
exports.models = {
    users: userModel_1.user_model,
    posts: postModel_1.post_model,
    checks: checks_1.checks,
    edit_post: editPostForm_1.edit_post_form,
    post_form: postForm_1.post_form,
    log_in: logInModel_1.login_obj,
    sign_up: signUpModel_1.sign_obj,
};


/***/ }),

/***/ "./src/models/postModel/postModel.ts":
/*!*******************************************!*\
  !*** ./src/models/postModel/postModel.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.post_model = void 0;
exports.post_model = {
    id: 3,
    type: 'POST',
    collection: 'posts',
    submit_button: {
        elem_type: 'button',
        id: 'edit-text',
        classList: 'post-model',
        input_class: 'model',
        text: 'Edit',
        type: 'button',
    },
    delete_button: {
        elem_type: 'button',
        id: 'delete-post',
        classList: 'post-model',
        input_class: 'model',
        text: 'X',
        type: 'button',
    },
    css: 'post',
    fields: {
        title: {
            required: true,
            type: 'string',
            min_length: 3,
            css: 'title-post',
        },
        text: {
            required: true,
            type: 'string',
            min_length: 3,
            css: 'text-post',
        },
        userId: {
            type: 'string',
            min_length: 3,
            css: 'user-id',
        },
        id: {
            required: true,
            type: 'string',
            min_length: 3,
            css: 's',
        },
    },
};


/***/ }),

/***/ "./src/models/posts/editPostFrom/editPostForm.ts":
/*!*******************************************************!*\
  !*** ./src/models/posts/editPostFrom/editPostForm.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.edit_post_form = void 0;
exports.edit_post_form = {
    css: 'edit-post',
    error_style: 'invalid',
    submit_button: {
        elem_type: 'button',
        id: 'save-edit',
        classList: 'edit',
        text: 'Save',
        type: 'button',
    },
    reject_edit: {
        elem_type: 'button',
        id: 'reject-edit',
        classList: 'reject',
        text: 'Cansel',
        type: 'button',
    },
    fields: {
        title: {
            elem_type: 'input',
            value: null,
            id: 'title_post_form_edit_input',
            classList: 'authorization-input',
            type: 'text',
            placeholder: 'title...',
            validation: {
                required: true,
                type: 'string',
                max_length: 50,
                min_length: 5,
            },
            css: 'title-post',
        },
        text: {
            elem_type: 'input',
            value: null,
            id: 'text_post_form_edit_input',
            classList: 'authorization-input',
            type: 'text',
            placeholder: 'text',
            validation: {
                required: true,
                type: 'string',
                max_length: 250,
                min_length: 5,
            },
            css: 'text-post',
        },
    },
};


/***/ }),

/***/ "./src/models/posts/postForm/postForm.ts":
/*!***********************************************!*\
  !*** ./src/models/posts/postForm/postForm.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.post_form = void 0;
exports.post_form = {
    css: 'post',
    error_style: 'invalid',
    id: 3,
    type: 'POST',
    submit_button: {
        elem_type: 'button',
        id: 'save-form',
        name: 'saveButton',
        classList: 'form',
        text: 'Save',
        type: 'button',
    },
    reject_edit: {
        elem_type: 'button',
        id: 'reject-edit',
        classList: 'reject',
        text: 'Cansel',
        type: 'button',
    },
    fields: {
        title: {
            elem_type: 'input',
            value: null,
            id: 'title_post_form_input',
            classList: 'authorization-input',
            type: 'text',
            placeholder: 'title...',
            validation: {
                required: true,
                type: 'string',
                max_length: 50,
                min_length: 5,
            },
            css: 'title-post',
        },
        text: {
            elem_type: 'input',
            value: null,
            id: 'text_post_form_input',
            classList: 'authorization-input',
            type: 'text',
            placeholder: 'text',
            validation: {
                required: true,
                type: 'string',
                max_length: 250,
                min_length: 5,
            },
            css: 'text-post',
        },
    },
};


/***/ }),

/***/ "./src/models/userModel/userModel.ts":
/*!*******************************************!*\
  !*** ./src/models/userModel/userModel.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.user_model = void 0;
const standartChecks_1 = __webpack_require__(/*! ../checks/standartChecks */ "./src/models/checks/standartChecks.ts");
exports.user_model = {
    collection: 'users',
    fields: {
        nickname: {
            required: true,
            type: 'string',
            min_length: 3,
        },
        email: {
            unique: true,
            required: true,
            type: 'string',
            check: standartChecks_1.reg_exp_email,
        },
        password: {
            required: true,
            type: 'string',
            min_length: 4,
        },
    },
    id: 3,
    type: 'USR',
};


/***/ }),

/***/ "./src/posts/createPosts.ts":
/*!**********************************!*\
  !*** ./src/posts/createPosts.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// import { models } from '/models/objectModel.js';
// import { deleteElem } from '../change functions/delete/delete';
// import { editPost } from '/posts/editPost.js';
// import { postForm } from '/constructors/post Form/postForm.js';
// import { growAnimation } from '/animations/grow.js';
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.drawPost = exports.createAppendPostForm = exports.createPost = void 0;
const grow_1 = __webpack_require__(/*! ../animations/grow */ "./src/animations/grow.ts");
const delete_1 = __webpack_require__(/*! ../changeFunctions/delete/delete */ "./src/changeFunctions/delete/delete.ts");
const postForm_1 = __webpack_require__(/*! ../forms/postForm/postForm */ "./src/forms/postForm/postForm.ts");
const objectModel_1 = __webpack_require__(/*! ../models/objectModel */ "./src/models/objectModel.ts");
const editPost_1 = __webpack_require__(/*! ./editPost */ "./src/posts/editPost.ts");
const createAppendPostForm = (place) => {
    const { post_form } = objectModel_1.models;
    const div = document.createElement('div');
    div.id = 'add_post';
    div.classList.add('post');
    div.onclick = () => (0, postForm_1.postForm)(post_form);
    place.insertAdjacentElement('afterbegin', div);
};
exports.createAppendPostForm = createAppendPostForm;
const createPost = (obj_model, { title, text, id }, div) => {
    const post = drawPost(obj_model, { title, text });
    post.id = id;
    (0, editPost_1.editPost)(obj_model, post);
    (0, delete_1.deleteElem)(obj_model, post);
    if (!div)
        return;
    post.addEventListener('click', () => (0, grow_1.growAnimation)(post, div));
    div.insertAdjacentElement('beforeend', post);
};
exports.createPost = createPost;
const drawPost = ({ fields, css }, obj) => {
    const buttons_bar = document.createElement('div');
    buttons_bar.classList.add('buttons-bar');
    const post = document.createElement('div');
    css.split(' ').forEach((style) => post.classList.add(style));
    for (const value in obj) {
        const elem = document.createElement('div');
        fields[value].css.split(' ').forEach((style) => elem.classList.add(style));
        elem.innerText = obj[value];
        post.insertAdjacentElement('beforeend', elem);
    }
    post.insertAdjacentElement('afterbegin', buttons_bar);
    return post;
};
exports.drawPost = drawPost;


/***/ }),

/***/ "./src/posts/editPost.ts":
/*!*******************************!*\
  !*** ./src/posts/editPost.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.editPost = void 0;
const elemConstrustor_1 = __webpack_require__(/*! ../constructors/elemConstrustor */ "./src/constructors/elemConstrustor.ts");
const database_1 = __webpack_require__(/*! ../database/database */ "./src/database/database.ts");
const postEditForm_1 = __webpack_require__(/*! ../forms/postEditForm/postEditForm */ "./src/forms/postEditForm/postEditForm.ts");
const objectModel_1 = __webpack_require__(/*! ../models/objectModel */ "./src/models/objectModel.ts");
const editPost = ({ submit_button }, elem) => {
    const edit_post_form = objectModel_1.models.edit_post;
    const edit = (0, elemConstrustor_1.createElement)(submit_button);
    edit.onclick = () => {
        const current_post_value = (0, database_1.find)({ id: elem.id }, 'posts')[0];
        Object.keys(current_post_value).forEach((a) => {
            if (edit_post_form.fields[a]) {
                edit_post_form.fields[a].value = current_post_value[a];
            }
        });
        const log_in_lock = (0, postEditForm_1.editPostForm)(edit_post_form, elem);
        document.body.append(log_in_lock);
    };
    elem.firstChild.append(edit);
};
exports.editPost = editPost;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/i.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUNPLDRCQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvYW5pbWF0aW9ucy9ncm93LnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2F1dGhvcml6YXRpb24vbG9nSW4vbG9nSW4udHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvYXV0aG9yaXphdGlvbi9zaWduVXAvc2lnblVwLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2NoYW5nZUZ1bmN0aW9ucy9kZWxldGUvZGVsZXRlLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2NoYW5nZUZ1bmN0aW9ucy9yZWplY3RDaGFuZ2UvcmVqZWN0Q2hhbmdlLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2NoZWNrcy91c2VyT2JqZWN0LnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2NoZWNrcy92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2NvbnN0cnVjdG9ycy9jcmVhdGVXaW5kb3dMb2NrLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2NvbnN0cnVjdG9ycy9lbGVtQ29uc3RydXN0b3IudHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvZGF0YWJhc2UvZGF0YWJhc2UudHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvZm9ybXMvbG9nSW5Gb3JtL2xvZ0luRm9ybS50cyIsIndlYnBhY2s6Ly9tYXNzYWdlci8uL3NyYy9mb3Jtcy9wb3N0RWRpdEZvcm0vcG9zdEVkaXRGb3JtLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2Zvcm1zL3Bvc3RGb3JtL3Bvc3RGb3JtLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL2Zvcm1zL3NpZ25VcEZvcm0vc2lnblVwRm9ybS50cyIsIndlYnBhY2s6Ly9tYXNzYWdlci8uL3NyYy9pLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL21haW4vZm9vdGVyLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL21haW4vbWFpbi50cyIsIndlYnBhY2s6Ly9tYXNzYWdlci8uL3NyYy9tb2RlbHMvYXV0aG9yaXphdGlvbi9sb2dJbk1vZGVsL2xvZ0luTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvbW9kZWxzL2F1dGhvcml6YXRpb24vc2lnblVwTW9kZWwvc2lnblVwTW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvbW9kZWxzL2NoZWNrcy9jaGVja3MudHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvbW9kZWxzL2NoZWNrcy9zdGFuZGFydENoZWNrcy50cyIsIndlYnBhY2s6Ly9tYXNzYWdlci8uL3NyYy9tb2RlbHMvb2JqZWN0TW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvbW9kZWxzL3Bvc3RNb2RlbC9wb3N0TW9kZWwudHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvbW9kZWxzL3Bvc3RzL2VkaXRQb3N0RnJvbS9lZGl0UG9zdEZvcm0udHMiLCJ3ZWJwYWNrOi8vbWFzc2FnZXIvLi9zcmMvbW9kZWxzL3Bvc3RzL3Bvc3RGb3JtL3Bvc3RGb3JtLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL21vZGVscy91c2VyTW9kZWwvdXNlck1vZGVsLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL3Bvc3RzL2NyZWF0ZVBvc3RzLnRzIiwid2VicGFjazovL21hc3NhZ2VyLy4vc3JjL3Bvc3RzL2VkaXRQb3N0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdyb3dBbmltYXRpb24gPSAoZWxlbSwgc2F2ZV96b25lKSA9PiB7XG5cdHNldFRpbWVvdXQoKCkgPT4gZWxlbS5jbGFzc0xpc3QuYWRkKCdncm93aW5nJyksIDApO1xuXHRzZXRUaW1lb3V0KFxuXHRcdCgpID0+IHNhdmVfem9uZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZ3Jvd2luZycpO1xuXHRcdH0pLFxuXHRcdDAsXG5cdCk7XG59O1xuZXhwb3J0IHsgZ3Jvd0FuaW1hdGlvbiB9O1xuIiwiaW1wb3J0IHsgZmluZCB9IGZyb20gJy4uLy4uL2RhdGFiYXNlL2RhdGFiYXNlJztcblxuZXhwb3J0IGNvbnN0IGxvZ0luID0gKGlucHV0c192YWx1ZSkgPT4ge1xuXHRjb25zdCBsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2snKTtcblx0Y29uc3QgdXNlciA9IGZpbmQoaW5wdXRzX3ZhbHVlLCAndXNlcnMnKTtcblx0aWYgKCFsb2NrKSByZXR1cm47XG5cdGlmICghKHVzZXIubGVuZ3RoICE9PSAwKSkgcmV0dXJuIGFsZXJ0KCdwYXNzd29yZCBvciBlbWFpbCBpbmNvcmVjdCcpO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudF91c2VyJywgdXNlclswXS5pZCksIGxvY2sucmVtb3ZlKCk7XG59O1xuIiwiaW1wb3J0IHsgYXBwZW5kQW5kQ2hlY2tPYmplY3QgfSBmcm9tICcuLi8uLi9jaGVja3MvdXNlck9iamVjdCc7XG5pbXBvcnQgeyBtb2RlbHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvb2JqZWN0TW9kZWwnO1xuaW1wb3J0IHsgbG9nSW4gfSBmcm9tICcuLi9sb2dJbi9sb2dJbic7XG5cbmV4cG9ydCBjb25zdCBzaWduVXAgPSAoaW5wdXRzX3ZhbHVlKSA9PiB7XG5cdGFwcGVuZEFuZENoZWNrT2JqZWN0KG1vZGVscy51c2VycywgaW5wdXRzX3ZhbHVlKTtcblx0bG9nSW4oaW5wdXRzX3ZhbHVlKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vLi4vY29uc3RydWN0b3JzL2VsZW1Db25zdHJ1c3Rvcic7XG5pbXBvcnQgeyBkZWxldGVPYmogfSBmcm9tICcuLi8uLi9kYXRhYmFzZS9kYXRhYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBkZWxldGVFbGVtID0gKHsgZGVsZXRlX2J1dHRvbiwgY29sbGVjdGlvbiB9LCBlbGVtKSA9PiB7XG5cdGNvbnN0IGJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoZGVsZXRlX2J1dHRvbik7XG5cdGVsZW0uZmlyc3RDaGlsZC5hcHBlbmQoYnV0dG9uKTtcblx0YnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG5cdFx0ZGVsZXRlT2JqKHsgaWQ6IGVsZW0uaWQgfSwgY29sbGVjdGlvbik7XG5cdFx0ZWxlbS5yZW1vdmUoKTtcblx0fTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vLi4vY29uc3RydWN0b3JzL2VsZW1Db25zdHJ1c3Rvcic7XG5cbmV4cG9ydCBjb25zdCByZWplY3RDaGFuZ2UgPSAoeyBjYW5zZWxlZF9lZGl0IH0sIGVsZW0pID0+IHtcblx0Y29uc3QgYnV0dG9uID0gY3JlYXRlRWxlbWVudChjYW5zZWxlZF9lZGl0KTtcblx0YnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG5cdFx0ZWxlbS5yZW1vdmUoKTtcblx0fTtcblx0cmV0dXJuIGJ1dHRvbjtcbn07XG4iLCJpbXBvcnQge1xuXHRhZGRDb2xsZWN0aW9uLFxuXHRhZGRPYmplY3QsXG5cdGZpbmQsXG5cdGNyZWF0ZV9pZCxcbn0gZnJvbSAnLi4vZGF0YWJhc2UvZGF0YWJhc2UnO1xuXG5pbXBvcnQgeyBtb2RlbHMgfSBmcm9tICcuLi9tb2RlbHMvb2JqZWN0TW9kZWwnO1xuXG5jb25zdCBjcmVhdGVJbnB1dHNWYWx1ZU9iamVjdCA9IChvYmopID0+IHtcblx0Y29uc3Qgb2JqZWN0ID0ge307XG5cdGZvciAoY29uc3QgZmllbGQgaW4gb2JqLmZpZWxkcykge1xuXHRcdG9iamVjdFtmaWVsZF0gPSBvYmouZmllbGRzW2ZpZWxkXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gb2JqZWN0O1xufTtcblxuY29uc3QgY2hlY2tVc2VyT2JqZWN0ID0gKG1vZGVsLCB1c2VyX3ZhbHVlcykgPT4ge1xuXHRjb25zdCB7IGNoZWNrcyB9ID0gbW9kZWxzO1xuXHRhZGRDb2xsZWN0aW9uKG1vZGVsLmNvbGxlY3Rpb24pO1xuXHRjb25zdCBjaGVja19tb2RlbCA9IG1vZGVsLmZpZWxkcztcblx0Zm9yIChjb25zdCBrZXkgaW4gdXNlcl92YWx1ZXMpIHtcblx0XHRpZiAoIWNoZWNrX21vZGVsW2tleV0pIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ3dyb25nIG9iamVjdCcpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXG5cdGZvciAoY29uc3Qga2V5IGluIGNoZWNrX21vZGVsKSB7XG5cdFx0Zm9yIChjb25zdCBjaGVjayBpbiBjaGVja19tb2RlbFtrZXldKSB7XG5cdFx0XHRpZiAoY2hlY2tzW2NoZWNrX21vZGVsW2tleV0udHlwZV1bY2hlY2tdKSB7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0ge1xuXHRcdFx0XHRcdHZhbHVlOiB1c2VyX3ZhbHVlc1trZXldLFxuXHRcdFx0XHRcdGNoZWNrX3ZhbHVlOiBjaGVja19tb2RlbFtrZXldW2NoZWNrXSxcblx0XHRcdFx0XHRjb2xsZWN0aW9uOiBtb2RlbC5jb2xsZWN0aW9uLFxuXHRcdFx0XHRcdGZpZWxkOiBrZXksXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmICghY2hlY2tzW2NoZWNrX21vZGVsW2tleV0udHlwZV1bY2hlY2tdKHZhbHVlKSkge1xuXHRcdFx0XHRcdGFsZXJ0KGAke3VzZXJfdmFsdWVzW2tleV19IC0gYWxyZWFkeSB1c2luZ2ApO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjb25zdCBsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2snKTtcblx0aWYgKGxvY2spIGxvY2sucmVtb3ZlKCk7XG59O1xuXG5jb25zdCBhcHBlbmRBbmRDaGVja09iamVjdCA9IChtb2RlbCwgdXNlcl92YWx1ZXMpID0+IHtcblx0Y2hlY2tVc2VyT2JqZWN0KG1vZGVsLCB1c2VyX3ZhbHVlcyk7XG5cdGxldCBpZCA9IGNyZWF0ZV9pZChtb2RlbHNbbW9kZWwuY29sbGVjdGlvbl0pO1xuXHRpZiAoIWZpbmQoeyBpZCB9LCBtb2RlbC5jb2xsZWN0aW9uKSkgeyBpZCA9IGNyZWF0ZV9pZChtb2RlbHNbbW9kZWwuY29sbGVjdGlvbl0pOyB9XG5cdHVzZXJfdmFsdWVzLmlkID0gaWQ7XG5cdGFkZE9iamVjdCh1c2VyX3ZhbHVlcywgbW9kZWwuY29sbGVjdGlvbik7XG59O1xuXG5leHBvcnQgeyBjaGVja1VzZXJPYmplY3QsIGNyZWF0ZUlucHV0c1ZhbHVlT2JqZWN0LCBhcHBlbmRBbmRDaGVja09iamVjdCB9O1xuIiwiaW1wb3J0IHsgbW9kZWxzIH0gZnJvbSAnLi4vbW9kZWxzL29iamVjdE1vZGVsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRJbnB1dCh0eXBlX29iaikge1xuXHRsZXQgaXNfdmFsaWQgPSB0cnVlO1xuXHRjb25zdCB7IGNoZWNrcyB9ID0gbW9kZWxzO1xuXHRmb3IgKGNvbnN0IGZpZWxkIGluIHR5cGVfb2JqLmZpZWxkcykge1xuXHRcdGNvbnN0IGZpZWxkX29iaiA9IHR5cGVfb2JqLmZpZWxkc1tmaWVsZF07XG5cdFx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmaWVsZF9vYmouaWQpO1xuXHRcdGNvbnN0IGlucHV0X3ZhbGlkYXRpb24gPSBmaWVsZF9vYmoudmFsaWRhdGlvbjtcblx0XHRpZiAoIWlucHV0IHx8ICFpbnB1dC52YWx1ZSkgcmV0dXJuO1xuXHRcdGlmIChmaWVsZF9vYmoucmVxdWlyZWQgJiYgIWlucHV0LnZhbHVlKSB7XG5cdFx0XHRpc192YWxpZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRmaWVsZF9vYmoudmFsdWUgPSBpbnB1dC52YWx1ZTtcblx0XHRpZiAoXG5cdFx0XHQhaW5wdXRfdmFsaWRhdGlvblxuICAgICAgfHwgIU9iamVjdC5rZXlzKGNoZWNrcykuaW5jbHVkZXMoaW5wdXRfdmFsaWRhdGlvbi50eXBlKVxuXHRcdCkgeyBjb250aW51ZTsgfVxuXHRcdGZvciAoY29uc3QgbWV0aG9kIGluIGNoZWNrc1tpbnB1dF92YWxpZGF0aW9uLnR5cGVdKSB7XG5cdFx0XHRpZiAoaW5wdXRfdmFsaWRhdGlvblttZXRob2RdKSB7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0ge1xuXHRcdFx0XHRcdHZhbHVlOiBpbnB1dC52YWx1ZSxcblx0XHRcdFx0XHRjaGVja192YWx1ZTogaW5wdXRfdmFsaWRhdGlvblttZXRob2RdLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRpZiAoIWNoZWNrc1tpbnB1dF92YWxpZGF0aW9uLnR5cGVdW21ldGhvZF0odmFsdWUpKSB7XG5cdFx0XHRcdFx0c2V0SW52YWxpZElucHV0KGlucHV0LCB0eXBlX29iaik7XG5cdFx0XHRcdFx0aXNfdmFsaWQgPSBmYWxzZTtcblx0XHRcdFx0XHRmaWVsZF9vYmoudmFsdWUgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKGlzX3ZhbGlkKSB7XG5cdFx0Y29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodHlwZV9vYmouc3VibWl0X2J1dHRvbi5pZCk7XG5cdFx0aWYgKCFzdWJtaXQpIHJldHVybjtcblx0XHRzdWJtaXQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRzdWJtaXQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQtYnV0dG9uJyk7XG5cdH1cblx0ZnVuY3Rpb24gc2V0SW52YWxpZElucHV0KGlucHV0LCB7IHN1Ym1pdF9idXR0b24sIGVycm9yX3N0eWxlIH0pIHtcblx0XHRjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdWJtaXRfYnV0dG9uLmlkKTtcblx0XHRpZiAoIXN1Ym1pdCkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ3N1Ym1pdCBpcyBudWxsJyk7XG5cdFx0aXNfdmFsaWQgPSBmYWxzZTtcblx0XHRpbnB1dC5jbGFzc0xpc3QuYWRkKGVycm9yX3N0eWxlKTtcblx0XHRzdWJtaXQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdHN1Ym1pdC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZC1idXR0b24nKTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoZXJyb3Jfc3R5bGUpLCA4MjApO1xuXHR9XG59XG4iLCJleHBvcnQgY29uc3QgbG9ja1dpbmRvd0Zvcm0gPSAoKSA9PiB7XG5cdGNvbnN0IGxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bG9jay5pZCA9ICdsb2NrJztcblx0bG9jay5jbGFzc0xpc3QuYWRkKCd3aW5kb3ctbG9jaycpO1xuXHRyZXR1cm4gbG9jaztcbn07XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudCA9ICh7XG5cdHRleHQsIGVsZW1fdHlwZSwgY2xhc3NMaXN0LCAuLi5wYXJhbXNcbn0pID0+IHtcblx0Y29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbV90eXBlKTtcblx0Y2xhc3NMaXN0LnNwbGl0KCcgJykuZm9yRWFjaCgoc3R5bGUpID0+IHtcblx0XHRlbGVtLmNsYXNzTGlzdC5hZGQoc3R5bGUpO1xuXHR9KTtcblx0ZWxlbS5pbm5lclRleHQgPSB0ZXh0O1xuXHRmb3IgKGNvbnN0IHBhcmFtIGluIHBhcmFtcykge1xuXHRcdGVsZW1bcGFyYW1dID0gcGFyYW1zW3BhcmFtXTtcblx0fVxuXHRyZXR1cm4gZWxlbTtcbn07XG4iLCJpbXBvcnQgeyBtb2RlbHMgfSBmcm9tICcuLi9tb2RlbHMvb2JqZWN0TW9kZWwnO1xyXG5jb25zdCBjaGVja3MgPSBtb2RlbHMuY2hlY2tzO1xyXG5cclxubGV0IGxfZGF0YWJhc2UgPSB7fTtcclxuXHJcbmNvbnN0IHNhdmVUb0xvY2FsU3RvcmFnZSA9ICgpID0+IHtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGF0YWJhc2UnLCBKU09OLnN0cmluZ2lmeShsX2RhdGFiYXNlKSk7XHJcbn07XHJcblxyXG5jb25zdCB1cGxvYWRGcm9tTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xyXG5cdGNvbnN0IGRhdGFiYXNlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGFiYXNlJyk7XHJcblx0aWYgKCFkYXRhYmFzZSkgcmV0dXJuO1xyXG5cdGxfZGF0YWJhc2UgPSBKU09OLnBhcnNlKGRhdGFiYXNlKSA/PyB7fTtcclxufTtcclxuY29uc3QgYWRkQ29sbGVjdGlvbiA9IChuYW1lLCB2YWx1ZSA9IFtdKSA9PiB7XHJcblx0aWYgKG5hbWUgaW4gbF9kYXRhYmFzZSkgcmV0dXJuO1xyXG5cdGxfZGF0YWJhc2VbbmFtZV0gPSB2YWx1ZTtcclxuXHRzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGFkZE9iamVjdCA9IChvYmosIGNvbGxlY3Rpb24pID0+IHtcclxuXHRsZXQgaXNfdmFsaWQgPSB0cnVlO1xyXG5cdGNvbnN0IGN1cnJlbnRfY29sbGVjdGlvbiA9IG1vZGVsc1tjb2xsZWN0aW9uXTtcclxuXHRmb3IgKGNvbnN0IGZpZWxkIGluIGN1cnJlbnRfY29sbGVjdGlvbikge1xyXG5cdFx0Zm9yIChjb25zdCBjaGVjayBpbiBjdXJyZW50X2NvbGxlY3Rpb25bZmllbGRdKSB7XHJcblx0XHRcdGlmIChjdXJyZW50X2NvbGxlY3Rpb25bZmllbGRdW2NoZWNrXSA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCFjaGVja3NbY3VycmVudF9jb2xsZWN0aW9uW2ZpZWxkXS50eXBlXVtjaGVja10ob2JqLCBmaWVsZCwgY29sbGVjdGlvbilcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdGlzX3ZhbGlkID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGlmICghaXNfdmFsaWQpIHJldHVybiBjb25zb2xlLmVycm9yKCdpbmNvcmVjdCB1c2VyIHZhbHVlJyk7XHJcblx0bF9kYXRhYmFzZVtjb2xsZWN0aW9uXS5wdXNoKG9iaik7XHJcblx0c2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbn07XHJcblxyXG5jb25zdCBlZGl0T2JqZWN0ID0gKGNvbGxlY3Rpb24sIG5ld192YWx1ZSkgPT4ge1xyXG5cdGxfZGF0YWJhc2VbY29sbGVjdGlvbl0uZm9yRWFjaCgob2JqKSA9PiB7XHJcblx0XHRPYmplY3Qua2V5cyhuZXdfdmFsdWUpLmZvckVhY2goKGZpZWxkKSA9PiB7XHJcblx0XHRcdGlmIChvYmouaWQgPT09IG5ld192YWx1ZS5pZCkge1xyXG5cdFx0XHRcdG9ialtmaWVsZF0gPSBuZXdfdmFsdWVbZmllbGRdO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0c2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbn07XHJcblxyXG5jb25zdCBkZWxldGVPYmogPSAoeyBpZCB9LCBjb2xsZWN0aW9uKSA9PiB7XHJcblx0bF9kYXRhYmFzZVtjb2xsZWN0aW9uXS5maWx0ZXIoKGVsZW0sIGluZGV4LCBhcnIpID0+IHtcclxuXHRcdGlmIChlbGVtLmlkID09IGlkKSB7XHJcblx0XHRcdGFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q29sbGVjdGlvbiA9IChuYW1lKSA9PiB7XHJcblx0aWYgKG5hbWUgaW4gbF9kYXRhYmFzZSkgcmV0dXJuIGxfZGF0YWJhc2VbbmFtZV07XHJcblx0dGhyb3cgYGZpZWxkICR7bmFtZX0gbm8gaW4gbV9kYXRhYmFzZWA7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVfaWQgPSAoeyBpZCwgdHlwZSB9KSA9PiB7XHJcblx0Y29uc3QgcmVzdWx0ID0gW3R5cGVdO1xyXG5cdGZvciAobGV0IGludCA9IDA7IGludCA8IGlkOyBpbnQrKykge1xyXG5cdFx0cmVzdWx0LnB1c2goXHJcblx0XHRcdE1hdGgucmFuZG9tKClcclxuXHRcdFx0XHQudG9TdHJpbmcoMzYpXHJcblx0XHRcdFx0LnN1YnN0cmluZygyLCBpZCArIDIpXHJcblx0XHQpO1xyXG5cdH1cclxuXHRyZXR1cm4gcmVzdWx0LmpvaW4oJy0nKTtcclxufTtcclxuXHJcbmNvbnN0IGZpbmQgPSAoY29uZGl0aW9uX29iaiwgY29sbGVjdGlvbikgPT4ge1xyXG5cdGlmKCFsX2RhdGFiYXNlW2NvbGxlY3Rpb25dKXJldHVybiBbXTtcclxuXHRyZXR1cm4gbF9kYXRhYmFzZVtjb2xsZWN0aW9uXS5maWx0ZXIoKGl0ZW0pID0+IHtcclxuXHRcdGZvciAoY29uc3QgZmllbGQgaW4gY29uZGl0aW9uX29iaikge1xyXG5cdFx0XHRpZiAoaXRlbVtmaWVsZF0gIT09IGNvbmRpdGlvbl9vYmpbZmllbGRdKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRPYmplY3QgPSAoKSA9PiB7fTtcclxuZXhwb3J0IHtcclxuXHRsX2RhdGFiYXNlLFxyXG5cdGFkZENvbGxlY3Rpb24sXHJcblx0YWRkT2JqZWN0LFxyXG5cdGdldENvbGxlY3Rpb24sXHJcblx0Z2V0T2JqZWN0LFxyXG5cdHVwbG9hZEZyb21Mb2NhbFN0b3JhZ2UsXHJcblx0ZmluZCxcclxuXHRjcmVhdGVfaWQsXHJcblx0ZWRpdE9iamVjdCxcclxuXHRkZWxldGVPYmosXHJcbn07XHJcbiIsImltcG9ydCB7IG1vZGVscyB9IGZyb20gJy4uLy4uL21vZGVscy9vYmplY3RNb2RlbCc7XG5pbXBvcnQgeyBpc1ZhbGlkSW5wdXQgfSBmcm9tICcuLi8uLi9jaGVja3MvdmFsaWRhdGlvbic7XG5pbXBvcnQgeyBjcmVhdGVJbnB1dHNWYWx1ZU9iamVjdCB9IGZyb20gJy4uLy4uL2NoZWNrcy91c2VyT2JqZWN0JztcbmltcG9ydCB7IGxvZ0luIH0gZnJvbSAnLi4vLi4vYXV0aG9yaXphdGlvbi9sb2dJbi9sb2dJbic7XG5pbXBvcnQgeyBsb2NrV2luZG93Rm9ybSB9IGZyb20gJy4uLy4uL2NvbnN0cnVjdG9ycy9jcmVhdGVXaW5kb3dMb2NrJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi8uLi9jb25zdHJ1Y3RvcnMvZWxlbUNvbnN0cnVzdG9yJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUxvZ0luRm9ybSA9ICgpID0+IHtcblx0Y29uc3QgbG9naW5fb2JqID0gbW9kZWxzLmxvZ19pbjtcblx0Y29uc3QgbG9nX2luX2xvY2sgPSBsb2NrV2luZG93Rm9ybSgpO1xuXHRjb25zdCBleGl0ID0gY3JlYXRlRWxlbWVudChsb2dpbl9vYmoucmVqZWN0X2J1dHRvbik7XG5cdGV4aXQub25jbGljayA9ICgpID0+IHtcblx0XHRsb2dfaW5fbG9jay5yZW1vdmUoKTtcblx0fTtcblx0Y29uc3QgTG9nX2luX3dpbmRvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRMb2dfaW5fd2luZG93LmNsYXNzTGlzdC5hZGQoJ3JlZy13aW5kb3cnKTtcblx0TG9nX2luX3dpbmRvdy5pZCA9ICdsb2NrJztcblx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblx0Zm9ybS5pZCA9ICdsb2ctaW4tZm9ybSc7XG5cdGZvcm0ubmFtZSA9ICdsb2dfaW4nO1xuXHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcblx0XHRpc1ZhbGlkSW5wdXQobG9naW5fb2JqKTtcblx0fSk7XG5cdGZvciAoY29uc3QgZmllbGQgaW4gbG9naW5fb2JqLmZpZWxkcykge1xuXHRcdGZvcm0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuXHRcdFx0J2JlZm9yZWVuZCcsXG5cdFx0XHRjcmVhdGVFbGVtZW50KGxvZ2luX29iai5maWVsZHNbZmllbGRdKSxcblx0XHQpO1xuXHR9XG5cdGNvbnN0IHN1Ym1pdCA9IGNyZWF0ZUVsZW1lbnQobG9naW5fb2JqLnN1Ym1pdF9idXR0b24pO1xuXHRzdWJtaXQub25jbGljayA9ICgpID0+IGxvZ0luKGNyZWF0ZUlucHV0c1ZhbHVlT2JqZWN0KGxvZ2luX29iaikpO1xuXHRMb2dfaW5fd2luZG93Lmluc2VydEFkamFjZW50SFRNTChcblx0XHQnYWZ0ZXJiZWdpbicsXG5cdFx0YDxoMT4ke2xvZ2luX29iai53aW5kb3dfdGV4dH08L2gxPmAsXG5cdCk7XG5cdExvZ19pbl93aW5kb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgZXhpdCk7XG5cdGZvcm0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBzdWJtaXQpO1xuXHRMb2dfaW5fd2luZG93Lmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZm9ybSk7XG5cdGxvZ19pbl9sb2NrLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgTG9nX2luX3dpbmRvdyk7XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kKGxvZ19pbl9sb2NrKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vLi4vY29uc3RydWN0b3JzL2VsZW1Db25zdHJ1c3Rvcic7XG5pbXBvcnQgeyBsb2NrV2luZG93Rm9ybSB9IGZyb20gJy4uLy4uL2NvbnN0cnVjdG9ycy9jcmVhdGVXaW5kb3dMb2NrJztcbmltcG9ydCB7IHJlamVjdENoYW5nZSB9IGZyb20gJy4uLy4uL2NoYW5nZUZ1bmN0aW9ucy9yZWplY3RDaGFuZ2UvcmVqZWN0Q2hhbmdlJztcbmltcG9ydCB7IGlzVmFsaWRJbnB1dCB9IGZyb20gJy4uLy4uL2NoZWNrcy92YWxpZGF0aW9uJztcbmltcG9ydCB7IGNyZWF0ZUlucHV0c1ZhbHVlT2JqZWN0LCBjaGVja1VzZXJPYmplY3QgfSBmcm9tICcuLi8uLi9jaGVja3MvdXNlck9iamVjdCc7XG5pbXBvcnQgeyBkcmF3UG9zdCB9IGZyb20gJy4uLy4uL3Bvc3RzL2NyZWF0ZVBvc3RzJztcbmltcG9ydCB7IG1vZGVscyB9IGZyb20gJy4uLy4uL21vZGVscy9vYmplY3RNb2RlbCc7XG5cbmltcG9ydCB7IGVkaXRPYmplY3QgfSBmcm9tICcuLi8uLi9kYXRhYmFzZS9kYXRhYmFzZSc7XG5pbXBvcnQgeyBlZGl0UG9zdCB9IGZyb20gJy4uLy4uL3Bvc3RzL2VkaXRQb3N0JztcbmltcG9ydCB7IGRlbGV0ZUVsZW0gfSBmcm9tICcuLi8uLi9jaGFuZ2VGdW5jdGlvbnMvZGVsZXRlL2RlbGV0ZSc7XG5cbmV4cG9ydCBjb25zdCBlZGl0UG9zdEZvcm0gPSAob2JqLCBlbGVtKSA9PiB7XG5cdGNvbnN0IGxvZ19pbl9sb2NrID0gbG9ja1dpbmRvd0Zvcm0oKTtcblx0Y29uc3QgTG9nX2luX3dpbmRvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRMb2dfaW5fd2luZG93LmNsYXNzTGlzdC5hZGQoJ3JlZy13aW5kb3cnKTtcblxuXHRjb25zdCBzdWJtaXQgPSBjcmVhdGVFbGVtZW50KG9iai5zdWJtaXRfYnV0dG9uKTtcblx0Y29uc3QgcmVqZWN0ID0gcmVqZWN0Q2hhbmdlKG9iaiwgbG9nX2luX2xvY2spO1xuXHRjb25zdCBwb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuXHRwb3N0LmNsYXNzTGlzdC5hZGQob2JqLmNzcyk7XG5cdGNvbnN0IHsgZmllbGRzIH0gPSBvYmo7XG5cdHBvc3QuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgc3VibWl0KTtcblx0cG9zdC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCByZWplY3QpO1xuXHRmb3IgKGNvbnN0IGZpZWxkIGluIGZpZWxkcykge1xuXHRcdGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRmaWVsZHNbZmllbGRdLmNzcy5zcGxpdCgnICcpLmZvckVhY2goKHN0eWxlKSA9PiB7XG5cdFx0XHRlbGVtLmNsYXNzTGlzdC5hZGQoc3R5bGUpO1xuXHRcdH0pO1xuXHRcdGNvbnN0IGlucHV0ID0gY3JlYXRlRWxlbWVudChmaWVsZHNbZmllbGRdKTtcblx0XHRwb3N0Lmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgaW5wdXQpO1xuXHR9XG5cdHBvc3Qub25jaGFuZ2UgPSAoKSA9PiB7XG5cdFx0aXNWYWxpZElucHV0KG9iaik7XG5cdH07XG5cdHN1Ym1pdC5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gY3JlYXRlSW5wdXRzVmFsdWVPYmplY3Qob2JqKTtcblx0XHR2YWx1ZS51c2VySWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudF91c2VyJyk7XG5cdFx0dmFsdWUuaWQgPSBlbGVtLmlkO1xuXHRcdGNvbnN0IHBvc3QgPSBkcmF3UG9zdChtb2RlbHMucG9zdHMsIHtcblx0XHRcdHRpdGxlOiB2YWx1ZS50aXRsZSxcblx0XHRcdHRleHQ6IHZhbHVlLnRleHQsXG5cdFx0fSk7XG5cdFx0cG9zdC5pZCA9IGVsZW0uaWQ7XG5cdFx0Y2hlY2tVc2VyT2JqZWN0KG1vZGVscy5wb3N0cywgdmFsdWUpO1xuXHRcdGVkaXRPYmplY3QoJ3Bvc3RzJywgdmFsdWUpO1xuXHRcdGxvZ19pbl9sb2NrLnJlbW92ZSgpO1xuXHRcdGVkaXRQb3N0KG1vZGVscy5wb3N0cywgcG9zdCk7XG5cdFx0ZGVsZXRlRWxlbShtb2RlbHMucG9zdHMsIHBvc3QpO1xuXHRcdGVsZW0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocG9zdCwgZWxlbSk7XG5cdH07XG5cdExvZ19pbl93aW5kb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgcG9zdCk7XG5cdGxvZ19pbl9sb2NrLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgTG9nX2luX3dpbmRvdyk7XG5cdHJldHVybiBsb2dfaW5fbG9jaztcbn07XG4iLCJpbXBvcnQgeyBtb2RlbHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvb2JqZWN0TW9kZWwnO1xuaW1wb3J0IHsgaXNWYWxpZElucHV0IH0gZnJvbSAnLi4vLi4vY2hlY2tzL3ZhbGlkYXRpb24nO1xuaW1wb3J0IHsgY3JlYXRlSW5wdXRzVmFsdWVPYmplY3QsIGFwcGVuZEFuZENoZWNrT2JqZWN0IH0gZnJvbSAnLi4vLi4vY2hlY2tzL3VzZXJPYmplY3QnO1xuaW1wb3J0IHsgY3JlYXRlX2lkIH0gZnJvbSAnLi4vLi4vZGF0YWJhc2UvZGF0YWJhc2UnO1xuaW1wb3J0IHsgY3JlYXRlUG9zdCB9IGZyb20gJy4uLy4uL3Bvc3RzL2NyZWF0ZVBvc3RzJztcbmltcG9ydCB7IGxvY2tXaW5kb3dGb3JtIH0gZnJvbSAnLi4vLi4vY29uc3RydWN0b3JzL2NyZWF0ZVdpbmRvd0xvY2snO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uLy4uL2NvbnN0cnVjdG9ycy9lbGVtQ29uc3RydXN0b3InO1xuXG5leHBvcnQgY29uc3QgcG9zdEZvcm0gPSAob2JqKSA9PiB7XG5cdGNvbnN0IHNpZ25fdXBfbG9jayA9IGxvY2tXaW5kb3dGb3JtKCk7XG5cdGNvbnN0IHN1Ym1pdCA9IGNyZWF0ZUVsZW1lbnQob2JqLnN1Ym1pdF9idXR0b24pO1xuXHRjb25zdCBwb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuXHRwb3N0LmNsYXNzTGlzdC5hZGQob2JqLmNzcyk7XG5cdGNvbnN0IHsgZmllbGRzIH0gPSBvYmo7XG5cdHBvc3QuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgc3VibWl0KTtcblx0Zm9yIChjb25zdCBmaWVsZCBpbiBmaWVsZHMpIHtcblx0XHRjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZmllbGRzW2ZpZWxkXS5jc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChzdHlsZSkgPT4ge1xuXHRcdFx0ZWxlbS5jbGFzc0xpc3QuYWRkKHN0eWxlKTtcblx0XHR9KTtcblx0XHRjb25zdCBpbnB1dCA9IGNyZWF0ZUVsZW1lbnQoZmllbGRzW2ZpZWxkXSk7XG5cdFx0aW5wdXQudmFsdWUgPSBudWxsO1xuXHRcdHBvc3QuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBpbnB1dCk7XG5cdH1cblx0cG9zdC5vbmNoYW5nZSA9ICgpID0+IGlzVmFsaWRJbnB1dChvYmopO1xuXHRzdWJtaXQub25jbGljayA9ICgpID0+IHtcblx0XHRjb25zdCB1c2VyX3Bvc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcG9zdHMnKTtcblx0XHRpZiAoIXVzZXJfcG9zdHMpIHJldHVybjtcblx0XHRjb25zdCB3aW5kb3dfbG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NrJyk7XG5cdFx0Y29uc3QgdmFsdWUgPSBjcmVhdGVJbnB1dHNWYWx1ZU9iamVjdChvYmopO1xuXHRcdHZhbHVlLnVzZXJJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50X3VzZXInKTtcblx0XHR2YWx1ZS5pZCA9IGNyZWF0ZV9pZChvYmopO1xuXHRcdGFwcGVuZEFuZENoZWNrT2JqZWN0KG1vZGVscy5wb3N0cywgdmFsdWUpO1xuXHRcdGlmICh3aW5kb3dfbG9jaykge1xuXHRcdFx0d2luZG93X2xvY2sucmVtb3ZlKCk7XG5cdFx0fVxuXHRcdGNyZWF0ZVBvc3QobW9kZWxzLnBvc3RzLCB2YWx1ZSwgdXNlcl9wb3N0cyk7XG5cdH07XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kKHNpZ25fdXBfbG9jayk7XG5cdHNpZ25fdXBfbG9jay5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIHBvc3QpO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi8uLi9jb25zdHJ1Y3RvcnMvZWxlbUNvbnN0cnVzdG9yJztcbmltcG9ydCB7IGxvY2tXaW5kb3dGb3JtIH0gZnJvbSAnLi4vLi4vY29uc3RydWN0b3JzL2NyZWF0ZVdpbmRvd0xvY2snO1xuaW1wb3J0IHsgbW9kZWxzIH0gZnJvbSAnLi4vLi4vbW9kZWxzL29iamVjdE1vZGVsJztcbmltcG9ydCB7IGlzVmFsaWRJbnB1dCB9IGZyb20gJy4uLy4uL2NoZWNrcy92YWxpZGF0aW9uJztcbmltcG9ydCB7IHNpZ25VcCB9IGZyb20gJy4uLy4uL2F1dGhvcml6YXRpb24vc2lnblVwL3NpZ25VcCc7XG5pbXBvcnQgeyBjcmVhdGVJbnB1dHNWYWx1ZU9iamVjdCB9IGZyb20gJy4uLy4uL2NoZWNrcy91c2VyT2JqZWN0JztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZWluZ1NpZ25VcEZvcm0gPSAoKSA9PiB7XG5cdGNvbnN0IHNpZ25fb2JqID0gbW9kZWxzLnNpZ25fdXA7XG5cdGNvbnN0IHNpZ25fdXBfbG9jayA9IGxvY2tXaW5kb3dGb3JtKCk7XG5cblx0Y29uc3QgZXhpdCA9IGNyZWF0ZUVsZW1lbnQoc2lnbl9vYmoucmVqZWN0X2J1dHRvbik7XG5cdGV4aXQub25jbGljayA9ICgpID0+IHtcblx0XHRzaWduX3VwX2xvY2sucmVtb3ZlKCk7XG5cdH07XG5cblx0Y29uc3Qgc2lnbl91cF93aW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0c2lnbl91cF93aW5kb3cuY2xhc3NMaXN0LmFkZCgncmVnLXdpbmRvdycpO1xuXG5cdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cdGZvcm0uaWQgPSAnc2lnbi11cC1mb3JtJztcblx0Zm9ybS5uYW1lID0gJ3NpZ25fdXAnO1xuXHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcblx0XHRpc1ZhbGlkSW5wdXQoc2lnbl9vYmopO1xuXHR9KTtcblxuXHRmb3IgKGNvbnN0IGZpZWxkIGluIHNpZ25fb2JqLmZpZWxkcykge1xuXHRcdGNvbnNvbGUubG9nKHNpZ25fb2JqLmZpZWxkc1tmaWVsZF0pO1xuXHRcdGZvcm0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuXHRcdFx0J2JlZm9yZWVuZCcsXG5cdFx0XHRjcmVhdGVFbGVtZW50KHNpZ25fb2JqLmZpZWxkc1tmaWVsZF0pLFxuXHRcdCk7XG5cdH1cblxuXHRjb25zdCBzdWJtaXQgPSBjcmVhdGVFbGVtZW50KHNpZ25fb2JqLnN1Ym1pdF9idXR0b24pO1xuXHRzdWJtaXQub25jbGljayA9ICgpID0+IHNpZ25VcChjcmVhdGVJbnB1dHNWYWx1ZU9iamVjdChzaWduX29iaikpO1xuXG5cdHNpZ25fdXBfd2luZG93Lmluc2VydEFkamFjZW50SFRNTChcblx0XHQnYWZ0ZXJiZWdpbicsXG5cdFx0YDxoMT4ke3NpZ25fb2JqLndpbmRvd190ZXh0fTwvaDE+YCxcblx0KTtcblx0c2lnbl91cF93aW5kb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgZXhpdCk7XG5cdGZvcm0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBzdWJtaXQpO1xuXHRzaWduX3VwX3dpbmRvdy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGZvcm0pO1xuXHRzaWduX3VwX2xvY2suaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBzaWduX3VwX3dpbmRvdyk7XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kKHNpZ25fdXBfbG9jayk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUG9zdCwgY3JlYXRlQXBwZW5kUG9zdEZvcm0gfSBmcm9tICcuL3Bvc3RzL2NyZWF0ZVBvc3RzJztcclxuaW1wb3J0IHsgY3JlYXRlTWFpbkh0bWwgfSBmcm9tICcuL21haW4vbWFpbic7XHJcbmltcG9ydCB7IGxvZ2luQmFyIH0gZnJvbSAnLi9tYWluL2Zvb3Rlcic7XHJcbmltcG9ydCB7XHJcblx0dXBsb2FkRnJvbUxvY2FsU3RvcmFnZSxcclxuXHRmaW5kLFxyXG59IGZyb20gJy4vZGF0YWJhc2UvZGF0YWJhc2UnO1xyXG5pbXBvcnQgeyBtb2RlbHMgfSBmcm9tICcuL21vZGVscy9vYmplY3RNb2RlbCc7XHJcblxyXG5cclxudXBsb2FkRnJvbUxvY2FsU3RvcmFnZSgpO1xyXG5pZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdWxsJykpIHtcclxuXHRjcmVhdGVNYWluSHRtbCgpO1xyXG59XHJcbmNvbnN0IGN1cnJlbnRfdXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50X3VzZXInKTtcclxuaWYgKCFjdXJyZW50X3VzZXIpIHtcclxuXHRsb2dpbkJhcigpO1xyXG59XHJcbmNvbnN0IHVzZXJfcG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1wb3N0cycpO1xyXG5jcmVhdGVBcHBlbmRQb3N0Rm9ybSh1c2VyX3Bvc3RzKTtcclxuZmluZCh7IHVzZXJJZDogY3VycmVudF91c2VyIH0sICdwb3N0cycpLmZvckVhY2goKHBvc3QpID0+IHtcclxuXHRjcmVhdGVQb3N0KG1vZGVscy5wb3N0cywgcG9zdCwgdXNlcl9wb3N0cyk7XHJcbn0pO1xyXG5jb25zb2xlLmxvZygxKTsiLCJpbXBvcnQgeyBjcmVhdGVpbmdTaWduVXBGb3JtIH0gZnJvbSAnLi4vZm9ybXMvc2lnblVwRm9ybS9zaWduVXBGb3JtJztcbmltcG9ydCB7IGNyZWF0ZUxvZ0luRm9ybSB9IGZyb20gJy4uL2Zvcm1zL2xvZ0luRm9ybS9sb2dJbkZvcm0nO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9naW5CYXIoKSB7XG5cdGNvbnN0IGxvZ2luQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG5cblx0Y29uc3QgYnV0dG9uc19kaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0YnV0dG9uc19kaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9ucy1kaXYnKTtcblxuXHRjb25zdCBzaWduID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdHNpZ24uY2xhc3NMaXN0LmFkZCgnYnV0dG9ucy1yZWcnKTtcblx0c2lnbi5pbm5lclRleHQgPSAnc2lnbiB1cCc7XG5cblx0Y29uc3QgbG9naW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0bG9naW4uY2xhc3NMaXN0LmFkZCgnYnV0dG9ucy1yZWcnKTtcblx0bG9naW4uaW5uZXJUZXh0ID0gJ2xvZyBpbic7XG5cblx0YnV0dG9uc19kaXYuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBzaWduKTtcblx0YnV0dG9uc19kaXYuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBsb2dpbik7XG5cblx0Y29uc3QgdGV4dF9pbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0dGV4dF9pbmZvLmlubmVyVGV4dCA9ICdSZWdpc3RlciB0byBjcmVhdGUgeW91ciBvd24gcG9zdHMnO1xuXG5cdGNvbnN0IGZ1bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVsbCcpO1xuXHRpZiAoIWZ1bGwpIHJldHVybjtcblxuXHRsb2dpbkJhci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIHRleHRfaW5mbyk7XG5cdGxvZ2luQmFyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgYnV0dG9uc19kaXYpO1xuXHRmdWxsLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgbG9naW5CYXIpO1xuXG5cdHNpZ24ub25jbGljayA9ICgpID0+IHtcblx0XHRjcmVhdGVpbmdTaWduVXBGb3JtKCk7XG5cdH07XG5cblx0bG9naW4ub25jbGljayA9ICgpID0+IHtcblx0XHRjcmVhdGVMb2dJbkZvcm0oKTtcblx0fTtcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVNYWluSHRtbCA9ICgpID0+IHtcblx0Y29uc3QgZnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRmdWxsLmlkID0gJ2Z1bGwnO1xuXG5cdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuXG5cdGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdHNlYXJjaC5pZCA9ICdzZWFyY2gnO1xuXHRzZWFyY2gucGxhY2Vob2xkZXIgPSAnU2VhcmNoJztcblx0c2VhcmNoLnNyYyA9ICcvaWNvbnMvc2VhcmNoLnBuZyc7XG5cblx0Y29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRsb2dvLmNsYXNzTGlzdC5hZGQoJ2xvZ28nKTtcblxuXHRjb25zdCBsb2dvX2ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRsb2dvX2ltZy5jbGFzc0xpc3QuYWRkKCdsb2dvJyk7XG5cdGxvZ29faW1nLnNyYyA9ICcuLi9pY29ucy9sb2dvLnBuZyc7XG5cdGxvZ28uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBsb2dvX2ltZyk7XG5cblx0Y29uc3QgdXNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR1c2VyLmNsYXNzTGlzdC5hZGQoJ3VzZXInKTtcblxuXHRoZWFkZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBsb2dvKTtcblx0aGVhZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgc2VhcmNoKTtcblx0aGVhZGVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgdXNlcik7XG5cblx0Y29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcblxuXHRjb25zdCBsZWZ0X2JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRsZWZ0X2Jhci5pZCA9ICdsZWZ0LWNvbnRyb2wtYmFyJztcblx0bGVmdF9iYXIuc3R5bGUuaGVpZ2h0ID0gYCR7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDcwfXB4YDtcblx0Y29uc3QgbWFpbl9iYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bWFpbl9iYXIuaWQgPSAnbWFpbic7XG5cdG1haW5fYmFyLnN0eWxlLmhlaWdodCA9IGAke2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSA3MH1weGA7XG5cdG1haW5fYmFyLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuXHRtYWluLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgbGVmdF9iYXIpO1xuXHRtYWluLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgbWFpbl9iYXIpO1xuXG5cdGNvbnN0IHVzZXJfcG9zdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dXNlcl9wb3N0cy5pZCA9ICd1c2VyLXBvc3RzJztcblxuXHRjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0dGV4dC5pbm5lclRleHQgPSAneW91ciBwb3N0cyc7XG5cdG1haW5fYmFyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHVzZXJfcG9zdHMpO1xuXHRtYWluX2Jhci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCB0ZXh0KTtcblxuXHRmdWxsLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgaGVhZGVyKTtcblx0ZnVsbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIG1haW4pO1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZChmdWxsKTtcbn07XG4iLCJpbXBvcnQgeyByZWdfZXhwX2VtYWlsIH0gZnJvbSAnLi4vLi4vY2hlY2tzL3N0YW5kYXJ0Q2hlY2tzJztcblxuZXhwb3J0IGNvbnN0IGxvZ2luX29iaiA9IHtcblx0dHlwZTogJ2xvZ0luJyxcblx0d2luZG93X3RleHQ6ICdMb2cgaW4nLFxuXHRlcnJvcl9zdHlsZTogJ2ludmFsaWQnLFxuXHRpbnB1dF9jbGFzczogJ3JlZy1pbnB1dCcsXG5cdHJlamVjdF9idXR0b246IHtcblx0XHRlbGVtX3R5cGU6ICdidXR0b24nLFxuXHRcdGlkOiAncmVqZWN0X2Zvcm0nLFxuXHRcdG5hbWU6ICdyZWplY3QnLFxuXHRcdGNsYXNzTGlzdDogJ2J1dHRvbnMtcmVnJyxcblx0XHR0ZXh0OiAnWCcsXG5cdFx0dHlwZTogJ2J1dHRvbicsXG5cdH0sXG5cdHN1Ym1pdF9idXR0b246IHtcblx0XHRlbGVtX3R5cGU6ICdidXR0b24nLFxuXHRcdGlkOiAnc3VibWl0X3JlZycsXG5cdFx0bmFtZTogJ1N1Ym1pdCcsXG5cdFx0Y2xhc3NMaXN0OiAnYnV0dG9ucy1yZWcgZGlzYWJsZWQtYnV0dG9uJyxcblx0XHR0ZXh0OiAnU3VibWl0Jyxcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0XHRkaXNhYmxlZDogdHJ1ZSxcblx0fSxcblx0ZmllbGRzOiB7XG5cdFx0ZW1haWw6IHtcblx0XHRcdGVsZW1fdHlwZTogJ2lucHV0Jyxcblx0XHRcdG5hbWU6ICdlbWFpbF9pbnB1dCcsXG5cdFx0XHRjbGFzc0xpc3Q6ICdyZWctaW5wdXQnLFxuXHRcdFx0dHlwZTogJ2VtYWlsJyxcblx0XHRcdGlkOiAnZW1haWwnLFxuXHRcdFx0cGxhY2Vob2xkZXI6ICdleHphbXBsZUB1a3IubmV0Jyxcblx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0dmFsaWRhdGlvbjoge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0bWluX2xlbmd0aDogNCxcblx0XHRcdFx0bWF4X2xlbmd0aDogMTIwLFxuXHRcdFx0XHRjaGVjazogcmVnX2V4cF9lbWFpbCxcblx0XHRcdH0sXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHR9LFxuXHRcdHBhc3N3b3JkOiB7XG5cdFx0XHRlbGVtX3R5cGU6ICdpbnB1dCcsXG5cdFx0XHRuYW1lOiAncGFzc3dvcmRfaW5wdXQnLFxuXHRcdFx0Y2xhc3NMaXN0OiAncmVnLWlucHV0Jyxcblx0XHRcdHR5cGU6ICdwYXNzd29yZCcsXG5cdFx0XHRpZDogJ3Bhc3N3b3JkJyxcblx0XHRcdHBsYWNlaG9sZGVyOiAnUGFzc3dvcmQnLFxuXHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR2YWxpZGF0aW9uOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRjaGVjazogL1tcXGRcXHddezQsMTIwfS8sXG5cdFx0XHR9LFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0fSxcblx0fSxcbn07XG4iLCJpbXBvcnQgeyByZWdfZXhwX2VtYWlsIH0gZnJvbSAnLi4vLi4vY2hlY2tzL3N0YW5kYXJ0Q2hlY2tzJztcblxuZXhwb3J0IGNvbnN0IHNpZ25fb2JqID0ge1xuXHR0eXBlOiAnc2lnblVwJyxcblx0d2luZG93X3RleHQ6ICdTaWduIHVwJyxcblx0ZXJyb3Jfc3R5bGU6ICdpbnZhbGlkJyxcblx0aW5wdXRfY2xhc3M6ICdyZWctaW5wdXQnLFxuXHRyZWplY3RfYnV0dG9uOiB7XG5cdFx0ZWxlbV90eXBlOiAnYnV0dG9uJyxcblx0XHRpZDogJ3JlamVjdF9mb3JtJyxcblx0XHRuYW1lOiAncmVqZWN0Jyxcblx0XHRjbGFzc0xpc3Q6ICdyZWctaW5wdXQnLFxuXHRcdHRleHQ6ICdYJyxcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0fSxcblx0c3VibWl0X2J1dHRvbjoge1xuXHRcdGVsZW1fdHlwZTogJ2J1dHRvbicsXG5cdFx0aWQ6ICdzdWJtaXRfcmVnJyxcblx0XHRuYW1lOiAnU3VibWl0Jyxcblx0XHRjbGFzc0xpc3Q6ICdidXR0b25zLXJlZyBkaXNhYmxlZC1idXR0b24nLFxuXHRcdHRleHQ6ICdTdWJtaXQnLFxuXHRcdHR5cGU6ICdidXR0b24nLFxuXHRcdGRpc2FibGVkOiB0cnVlLFxuXHR9LFxuXHRmaWVsZHM6IHtcblx0XHRuaWNrbmFtZToge1xuXHRcdFx0ZWxlbV90eXBlOiAnaW5wdXQnLFxuXHRcdFx0bmFtZTogJ25pY2tuYW1lX2lucHV0Jyxcblx0XHRcdGNsYXNzTGlzdDogJ3JlZy1pbnB1dCcsXG5cdFx0XHR0eXBlOiAndGV4dCcsXG5cdFx0XHRpZDogJ25pY2tuYW1lJyxcblx0XHRcdHBsYWNlaG9sZGVyOiAneW91ciBuaWNrPycsXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdHZhbGlkYXRpb246IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGNoZWNrOiAvW1xcZFxcd117NCwxMjB9Lyxcblx0XHRcdH0sXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHR9LFxuXHRcdGVtYWlsOiB7XG5cdFx0XHRlbGVtX3R5cGU6ICdpbnB1dCcsXG5cdFx0XHRuYW1lOiAnZW1haWxfaW5wdXQnLFxuXHRcdFx0dHlwZTogJ2VtYWlsJyxcblx0XHRcdGNsYXNzTGlzdDogJ3JlZy1pbnB1dCcsXG5cdFx0XHRpZDogJ2VtYWlsJyxcblx0XHRcdHBsYWNlaG9sZGVyOiAnZXh6YW1wbGVAdWtyLm5ldCcsXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdHZhbGlkYXRpb246IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdG1pbl9sZW5ndGg6IDQsXG5cdFx0XHRcdG1heF9sZW5ndGg6IDEyMCxcblx0XHRcdFx0Y2hlY2s6IHJlZ19leHBfZW1haWwsXG5cdFx0XHR9LFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0fSxcblx0XHRwYXNzd29yZDoge1xuXHRcdFx0ZWxlbV90eXBlOiAnaW5wdXQnLFxuXHRcdFx0bmFtZTogJ3Bhc3N3b3JkX2lucHV0Jyxcblx0XHRcdGNsYXNzTGlzdDogJ3JlZy1pbnB1dCcsXG5cdFx0XHR0eXBlOiAncGFzc3dvcmQnLFxuXHRcdFx0aWQ6ICdwYXNzd29yZCcsXG5cdFx0XHRwbGFjZWhvbGRlcjogJ1Bhc3N3b3JkJyxcblx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0aW5pdGlhbF92YWx1ZTogMTIzNDU2NzgsXG5cdFx0XHR2YWxpZGF0aW9uOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRjaGVjazogL1tcXGRcXHddezQsMTIwfS8sXG5cdFx0XHR9LFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0fSxcblx0fSxcbn07XG4iLCJpbXBvcnQgeyBzdGFuZGFyZF9jaGVja3MgfSBmcm9tICcuL3N0YW5kYXJ0Q2hlY2tzJztcblxuZXhwb3J0IGNvbnN0IGNoZWNrcyA9IHtcblx0c3RyaW5nOiB7XG5cdFx0dHlwZTogKHsgdmFsdWUgfSkgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyxcblx0XHRtaW5fbGVuZ3RoOiAoeyB2YWx1ZSwgY2hlY2tfdmFsdWUgfSkgPT4gdmFsdWUubGVuZ3RoID4gY2hlY2tfdmFsdWUsXG5cdFx0bWF4X2xlbmd0aDogKHsgdmFsdWUsIGNoZWNrX3ZhbHVlIH0pID0+IHZhbHVlLmxlbmd0aCA8IGNoZWNrX3ZhbHVlLFxuXHRcdC4uLnN0YW5kYXJkX2NoZWNrcyxcblx0fSxcblx0bnVtYmVyOiB7XG5cdFx0dHlwZTogKHsgdmFsdWUgfSkgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcblx0XHQuLi5zdGFuZGFyZF9jaGVja3MsXG5cdH0sXG59O1xuIiwiaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL2RhdGFiYXNlL2RhdGFiYXNlJztcblxuY29uc3QgcmVnX2V4cF9lbWFpbCA9IC9bYS1mMC05XSpAXFx3ezMsNX1cXC5bYS1mXXswLDN9LztcbmNvbnN0IHN0YW5kYXJkX2NoZWNrcyA9IHtcblx0dW5pcXVlOiAoeyB2YWx1ZSwgY29sbGVjdGlvbiwgZmllbGQgfSkgPT4gIVsuLi5uZXcgU2V0KGdldENvbGxlY3Rpb24oY29sbGVjdGlvbikubWFwKChhKSA9PiBhW2ZpZWxkXSkpXS5pbmNsdWRlcyhcblx0XHR2YWx1ZSxcblx0KSxcblx0cmVxdWlyZWQ6ICh7IHZhbHVlIH0pID0+ICEhdmFsdWUsXG5cdGNoZWNrOiAoeyB2YWx1ZSwgY2hlY2tfdmFsdWUgfSkgPT4gY2hlY2tfdmFsdWUudGVzdCh2YWx1ZSksXG59O1xuZXhwb3J0IHsgcmVnX2V4cF9lbWFpbCwgc3RhbmRhcmRfY2hlY2tzIH07XG4iLCJpbXBvcnQgeyB1c2VyX21vZGVsIH0gZnJvbSAnLi91c2VyTW9kZWwvdXNlck1vZGVsJztcbmltcG9ydCB7IHBvc3RfbW9kZWwgfSBmcm9tICcuL3Bvc3RNb2RlbC9wb3N0TW9kZWwnO1xuaW1wb3J0IHsgY2hlY2tzIH0gZnJvbSAnLi9jaGVja3MvY2hlY2tzJztcbmltcG9ydCB7IGVkaXRfcG9zdF9mb3JtIH0gZnJvbSAnLi9wb3N0cy9lZGl0UG9zdEZyb20vZWRpdFBvc3RGb3JtJztcbmltcG9ydCB7IHBvc3RfZm9ybSB9IGZyb20gJy4vcG9zdHMvcG9zdEZvcm0vcG9zdEZvcm0nO1xuaW1wb3J0IHsgbG9naW5fb2JqIH0gZnJvbSAnLi9hdXRob3JpemF0aW9uL2xvZ0luTW9kZWwvbG9nSW5Nb2RlbCc7XG5pbXBvcnQgeyBzaWduX29iaiB9IGZyb20gJy4vYXV0aG9yaXphdGlvbi9zaWduVXBNb2RlbC9zaWduVXBNb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBtb2RlbHMgPSB7XG5cdHVzZXJzOiB1c2VyX21vZGVsLFxuXHRwb3N0czogcG9zdF9tb2RlbCxcblx0Y2hlY2tzLFxuXHRlZGl0X3Bvc3Q6IGVkaXRfcG9zdF9mb3JtLFxuXHRwb3N0X2Zvcm0sXG5cdGxvZ19pbjogbG9naW5fb2JqLFxuXHRzaWduX3VwOiBzaWduX29iaixcbn07XG4iLCJleHBvcnQgY29uc3QgcG9zdF9tb2RlbCA9IHtcblx0aWQ6IDMsXG5cdHR5cGU6ICdQT1NUJyxcblx0Y29sbGVjdGlvbjogJ3Bvc3RzJyxcblx0c3VibWl0X2J1dHRvbjoge1xuXHRcdGVsZW1fdHlwZTogJ2J1dHRvbicsXG5cdFx0aWQ6ICdlZGl0LXRleHQnLFxuXHRcdGNsYXNzTGlzdDogJ3Bvc3QtbW9kZWwnLFxuXHRcdGlucHV0X2NsYXNzOiAnbW9kZWwnLFxuXHRcdHRleHQ6ICdFZGl0Jyxcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0fSxcblx0ZGVsZXRlX2J1dHRvbjoge1xuXHRcdGVsZW1fdHlwZTogJ2J1dHRvbicsXG5cdFx0aWQ6ICdkZWxldGUtcG9zdCcsXG5cdFx0Y2xhc3NMaXN0OiAncG9zdC1tb2RlbCcsXG5cdFx0aW5wdXRfY2xhc3M6ICdtb2RlbCcsXG5cdFx0dGV4dDogJ1gnLFxuXHRcdHR5cGU6ICdidXR0b24nLFxuXHR9LFxuXHRjc3M6ICdwb3N0Jyxcblx0ZmllbGRzOiB7XG5cdFx0dGl0bGU6IHtcblx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRtaW5fbGVuZ3RoOiAzLFxuXHRcdFx0Y3NzOiAndGl0bGUtcG9zdCcsXG5cdFx0fSxcblx0XHR0ZXh0OiB7XG5cdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0bWluX2xlbmd0aDogMyxcblx0XHRcdGNzczogJ3RleHQtcG9zdCcsXG5cdFx0fSxcblx0XHR1c2VySWQ6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0bWluX2xlbmd0aDogMyxcblx0XHRcdGNzczogJ3VzZXItaWQnLFxuXHRcdH0sXG5cdFx0aWQ6IHtcblx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRtaW5fbGVuZ3RoOiAzLFxuXHRcdFx0Y3NzOiAncycsXG5cdFx0fSxcblx0fSxcbn07XG4iLCJleHBvcnQgY29uc3QgZWRpdF9wb3N0X2Zvcm0gPSB7XG5cdGNzczogJ2VkaXQtcG9zdCcsXG5cdGVycm9yX3N0eWxlOiAnaW52YWxpZCcsXG5cblx0c3VibWl0X2J1dHRvbjoge1xuXHRcdGVsZW1fdHlwZTogJ2J1dHRvbicsXG5cdFx0aWQ6ICdzYXZlLWVkaXQnLFxuXHRcdGNsYXNzTGlzdDogJ2VkaXQnLFxuXHRcdHRleHQ6ICdTYXZlJyxcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0fSxcblx0Y2Fuc2VsZWRfZWRpdDoge1xuXHRcdGVsZW1fdHlwZTogJ2J1dHRvbicsXG5cdFx0aWQ6ICdyZWplY3QtZWRpdCcsXG5cdFx0Y2xhc3NMaXN0OiAncmVqZWN0Jyxcblx0XHR0ZXh0OiAnQ2Fuc2VsJyxcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0fSxcblx0ZmllbGRzOiB7XG5cdFx0dGl0bGU6IHtcblx0XHRcdGVsZW1fdHlwZTogJ2lucHV0Jyxcblx0XHRcdHZhbHVlOiBudWxsLFxuXHRcdFx0aWQ6ICd0aXRsZV9wb3N0X2Zvcm1fZWRpdF9pbnB1dCcsXG5cdFx0XHRjbGFzc0xpc3Q6ICdyZWctaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RleHQnLFxuXHRcdFx0cGxhY2Vob2xkZXI6ICd0aXRsZS4uLicsXG5cdFx0XHR2YWxpZGF0aW9uOiB7XG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0bWF4X2xlbmd0aDogNTAsXG5cdFx0XHRcdG1pbl9sZW5ndGg6IDUsXG5cdFx0XHR9LFxuXHRcdFx0Y3NzOiAndGl0bGUtcG9zdCcsXG5cdFx0fSxcblx0XHR0ZXh0OiB7XG5cdFx0XHRlbGVtX3R5cGU6ICdpbnB1dCcsXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHRcdGlkOiAndGV4dF9wb3N0X2Zvcm1fZWRpdF9pbnB1dCcsXG5cdFx0XHRjbGFzc0xpc3Q6ICdyZWctaW5wdXQnLFxuXHRcdFx0dHlwZTogJ3RleHQnLFxuXHRcdFx0cGxhY2Vob2xkZXI6ICd0ZXh0Jyxcblx0XHRcdHZhbGlkYXRpb246IHtcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRtYXhfbGVuZ3RoOiAyNTAsXG5cdFx0XHRcdG1pbl9sZW5ndGg6IDUsXG5cdFx0XHR9LFxuXHRcdFx0Y3NzOiAndGV4dC1wb3N0Jyxcblx0XHR9LFxuXHR9LFxufTtcbiIsImV4cG9ydCBjb25zdCBwb3N0X2Zvcm0gPSB7XG5cdGNzczogJ3Bvc3QnLFxuXHRlcnJvcl9zdHlsZTogJ2ludmFsaWQnLFxuXHRpZDogMyxcblx0dHlwZTogJ1BPU1QnLFxuXHRzdWJtaXRfYnV0dG9uOiB7XG5cdFx0ZWxlbV90eXBlOiAnYnV0dG9uJyxcblx0XHRpZDogJ3NhdmUtZm9ybScsXG5cdFx0bmFtZTogJ3NhdmVCdXR0b24nLFxuXHRcdGNsYXNzTGlzdDogJ2Zvcm0nLFxuXHRcdHRleHQ6ICdTYXZlJyxcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0fSxcblx0Y2Fuc2VsZWRfZWRpdDoge1xuXHRcdGVsZW1fdHlwZTogJ2J1dHRvbicsXG5cdFx0aWQ6ICdyZWplY3QtZWRpdCcsXG5cdFx0Y2xhc3NMaXN0OiAncmVqZWN0Jyxcblx0XHR0ZXh0OiAnQ2Fuc2VsJyxcblx0XHR0eXBlOiAnYnV0dG9uJyxcblx0fSxcblx0ZmllbGRzOiB7XG5cdFx0dGl0bGU6IHtcblx0XHRcdGVsZW1fdHlwZTogJ2lucHV0Jyxcblx0XHRcdHZhbHVlOiBudWxsLFxuXHRcdFx0aWQ6ICd0aXRsZV9wb3N0X2Zvcm1faW5wdXQnLFxuXHRcdFx0Y2xhc3NMaXN0OiAncmVnLWlucHV0Jyxcblx0XHRcdHR5cGU6ICd0ZXh0Jyxcblx0XHRcdHBsYWNlaG9sZGVyOiAndGl0bGUuLi4nLFxuXHRcdFx0dmFsaWRhdGlvbjoge1xuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdG1heF9sZW5ndGg6IDUwLFxuXHRcdFx0XHRtaW5fbGVuZ3RoOiA1LFxuXHRcdFx0fSxcblx0XHRcdGNzczogJ3RpdGxlLXBvc3QnLFxuXHRcdH0sXG5cdFx0dGV4dDoge1xuXHRcdFx0ZWxlbV90eXBlOiAnaW5wdXQnLFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0XHRpZDogJ3RleHRfcG9zdF9mb3JtX2lucHV0Jyxcblx0XHRcdGNsYXNzTGlzdDogJ3JlZy1pbnB1dCcsXG5cdFx0XHR0eXBlOiAndGV4dCcsXG5cdFx0XHRwbGFjZWhvbGRlcjogJ3RleHQnLFxuXHRcdFx0dmFsaWRhdGlvbjoge1xuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdG1heF9sZW5ndGg6IDI1MCxcblx0XHRcdFx0bWluX2xlbmd0aDogNSxcblx0XHRcdH0sXG5cdFx0XHRjc3M6ICd0ZXh0LXBvc3QnLFxuXHRcdH0sXG5cdH0sXG59O1xuIiwiaW1wb3J0IHsgcmVnX2V4cF9lbWFpbCB9IGZyb20gJy4uL2NoZWNrcy9zdGFuZGFydENoZWNrcyc7XG5cbmV4cG9ydCBjb25zdCB1c2VyX21vZGVsID0ge1xuXHRjb2xsZWN0aW9uOiAndXNlcnMnLFxuXHRmaWVsZHM6IHtcblx0XHRuaWNrbmFtZToge1xuXHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdG1pbl9sZW5ndGg6IDMsXG5cdFx0fSxcblx0XHRlbWFpbDoge1xuXHRcdFx0dW5pcXVlOiB0cnVlLFxuXHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdGNoZWNrOiByZWdfZXhwX2VtYWlsLFxuXHRcdH0sXG5cdFx0cGFzc3dvcmQ6IHtcblx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRtaW5fbGVuZ3RoOiA0LFxuXHRcdH0sXG5cdH0sXG5cdGlkOiAzLFxuXHR0eXBlOiAnVVNSJyxcbn07XG4iLCIvLyBpbXBvcnQgeyBtb2RlbHMgfSBmcm9tICcvbW9kZWxzL29iamVjdE1vZGVsLmpzJztcbi8vIGltcG9ydCB7IGRlbGV0ZUVsZW0gfSBmcm9tICcuLi9jaGFuZ2UgZnVuY3Rpb25zL2RlbGV0ZS9kZWxldGUnO1xuLy8gaW1wb3J0IHsgZWRpdFBvc3QgfSBmcm9tICcvcG9zdHMvZWRpdFBvc3QuanMnO1xuLy8gaW1wb3J0IHsgcG9zdEZvcm0gfSBmcm9tICcvY29uc3RydWN0b3JzL3Bvc3QgRm9ybS9wb3N0Rm9ybS5qcyc7XG4vLyBpbXBvcnQgeyBncm93QW5pbWF0aW9uIH0gZnJvbSAnL2FuaW1hdGlvbnMvZ3Jvdy5qcyc7XG5cbmltcG9ydCB7IGdyb3dBbmltYXRpb24gfSBmcm9tICcuLi9hbmltYXRpb25zL2dyb3cnO1xuaW1wb3J0IHsgZGVsZXRlRWxlbSB9IGZyb20gJy4uL2NoYW5nZUZ1bmN0aW9ucy9kZWxldGUvZGVsZXRlJztcbmltcG9ydCB7IHBvc3RGb3JtIH0gZnJvbSAnLi4vZm9ybXMvcG9zdEZvcm0vcG9zdEZvcm0nO1xuaW1wb3J0IHsgbW9kZWxzIH0gZnJvbSAnLi4vbW9kZWxzL29iamVjdE1vZGVsJztcbmltcG9ydCB7IGVkaXRQb3N0IH0gZnJvbSAnLi9lZGl0UG9zdCc7XG5cblxuXG5jb25zdCBjcmVhdGVBcHBlbmRQb3N0Rm9ybSA9IChwbGFjZSkgPT4ge1xuXHRjb25zdCB7IHBvc3RfZm9ybSB9ID0gbW9kZWxzO1xuXHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LmlkID0gJ2FkZF9wb3N0Jztcblx0ZGl2LmNsYXNzTGlzdC5hZGQoJ3Bvc3QnKTtcblx0ZGl2Lm9uY2xpY2sgPSAoKSA9PiBwb3N0Rm9ybShwb3N0X2Zvcm0pO1xuXHRwbGFjZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBkaXYpO1xufTtcblxuY29uc3QgY3JlYXRlUG9zdCA9IChvYmpfbW9kZWwsIHsgdGl0bGUsIHRleHQsIGlkIH0sIGRpdikgPT4ge1xuXHRjb25zdCBwb3N0ID0gZHJhd1Bvc3Qob2JqX21vZGVsLCB7IHRpdGxlLCB0ZXh0IH0pO1xuXHRwb3N0LmlkID0gaWQ7XG5cdGVkaXRQb3N0KG9ial9tb2RlbCwgcG9zdCk7XG5cdGRlbGV0ZUVsZW0ob2JqX21vZGVsLCBwb3N0KTtcblx0aWYgKCFkaXYpIHJldHVybjtcblx0cG9zdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGdyb3dBbmltYXRpb24ocG9zdCwgZGl2KSk7XG5cdGRpdi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIHBvc3QpO1xufTtcblxuY29uc3QgZHJhd1Bvc3QgPSAoeyBmaWVsZHMsIGNzcyB9LCBvYmopID0+IHtcblx0Y29uc3QgYnV0dG9uc19iYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0YnV0dG9uc19iYXIuY2xhc3NMaXN0LmFkZCgnYnV0dG9ucy1iYXInKTtcblx0Y29uc3QgcG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChzdHlsZSkgPT4gcG9zdC5jbGFzc0xpc3QuYWRkKHN0eWxlKSk7XG5cdGZvciAoY29uc3QgdmFsdWUgaW4gb2JqKSB7XG5cdFx0Y29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGZpZWxkc1t2YWx1ZV0uY3NzLnNwbGl0KCcgJykuZm9yRWFjaCgoc3R5bGUpID0+IGVsZW0uY2xhc3NMaXN0LmFkZChzdHlsZSkpO1xuXHRcdGVsZW0uaW5uZXJUZXh0ID0gb2JqW3ZhbHVlXTtcblx0XHRwb3N0Lmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZWxlbSk7XG5cdH1cblx0cG9zdC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBidXR0b25zX2Jhcik7XG5cblx0cmV0dXJuIHBvc3Q7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVQb3N0LCBjcmVhdGVBcHBlbmRQb3N0Rm9ybSwgZHJhd1Bvc3QgfTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuLi9jb25zdHJ1Y3RvcnMvZWxlbUNvbnN0cnVzdG9yJztcbmltcG9ydCB7IGZpbmQgfSBmcm9tICcuLi9kYXRhYmFzZS9kYXRhYmFzZSc7XG5pbXBvcnQgeyBlZGl0UG9zdEZvcm0gfSBmcm9tICcuLi9mb3Jtcy9wb3N0RWRpdEZvcm0vcG9zdEVkaXRGb3JtJztcbmltcG9ydCB7IG1vZGVscyB9IGZyb20gJy4uL21vZGVscy9vYmplY3RNb2RlbCc7XG5cbmNvbnN0IGVkaXRQb3N0ID0gKHsgc3VibWl0X2J1dHRvbiB9LCBlbGVtKSA9PiB7XG5cdGNvbnN0IGVkaXRfcG9zdF9mb3JtID0gbW9kZWxzLmVkaXRfcG9zdDtcblx0Y29uc3QgZWRpdCA9IGNyZWF0ZUVsZW1lbnQoc3VibWl0X2J1dHRvbik7XG5cdGVkaXQub25jbGljayA9ICgpID0+IHtcblx0XHRjb25zdCBjdXJyZW50X3Bvc3RfdmFsdWUgPSBmaW5kKHsgaWQ6IGVsZW0uaWQgfSwgJ3Bvc3RzJylbMF07XG5cdFx0T2JqZWN0LmtleXMoY3VycmVudF9wb3N0X3ZhbHVlKS5mb3JFYWNoKChhKSA9PiB7XG5cdFx0XHRpZiAoZWRpdF9wb3N0X2Zvcm0uZmllbGRzW2FdKSB7XG5cdFx0XHRcdGVkaXRfcG9zdF9mb3JtLmZpZWxkc1thXS52YWx1ZSA9IGN1cnJlbnRfcG9zdF92YWx1ZVthXTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRjb25zdCBsb2dfaW5fbG9jayA9IGVkaXRQb3N0Rm9ybShlZGl0X3Bvc3RfZm9ybSwgZWxlbSk7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmQobG9nX2luX2xvY2spO1xuXHR9O1xuXHRlbGVtLmZpcnN0Q2hpbGQuYXBwZW5kKGVkaXQpO1xufTtcbmV4cG9ydCB7IGVkaXRQb3N0IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=