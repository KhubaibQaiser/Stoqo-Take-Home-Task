import ReactDOM from 'react-dom';
import { history } from './history';
import { AlertActions } from '../_store/Actions/app.control.actions';
import { store } from '../_store';

export let appController = {
    userData: {},
    localStorageName: "stoqo.",

    restoreUserData: () => {
        appController.userData = JSON.parse(appController.getLocalStorage("userData", "{}"));
    },

    updateUserData: (data) => {
        appController.userData = { ...data };
        appController.setLocalStorage("userData", appController.userData);
    },

    setLocalStorage: (key, value) => {
        if (typeof value === "object")
            value = JSON.stringify(value);
        localStorage.setItem(appController.localStorageName + key, value);
    },

    getLocalStorage: (key, defaultVal) => {
        const val = localStorage.getItem(appController.localStorageName + key);
        return val !== null ? val : defaultVal;
    },

    deleteLocalStorage: (key) => {
        localStorage.removeItem(appController.localStorageName + key);
    },

    isAuthenticated: () => {
        return (typeof appController.userData.token === "string" && appController.userData.token !== "") ? true : false;
    },

    formNavigation: function (e) {
        if (e.which === 13) {
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            let isButton = false;
            form.elements[index + 1].className.split(" ").forEach((cls) => {
                if (cls === "btn") {
                    isButton = true;
                    return;
                }
            });
            if (isButton)
                form.elements[index + 1].click();
            else
                form.elements[index + 1].focus();
            e.preventDefault();
        }
        else {
            store.dispatch(AlertActions.clear());
        }
    },

    formValidation: {
        email: function (email) {
            var re = /^(([^<>()[\]/.,;:\s@"]+(\.[^<>()[\]/.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        cnic: function (cnic) {
            var re = /^(\d{13}){1}$/g;
            return re.test(cnic);
        },
        contactNumber: function (number) {
            var re = /^[0-9]{1,}$/g;
            return re.test(number);
        },
        charsOnly: function (val) {
            var re = /^([a-zA-Z]+\s)*[a-zA-Z]+$/g;
            return re.test(val);
        }
    },

    pageSwitch: function (path, state = { direction: "ltr" }) {
        history.push(path, state);
    },

    ScrollToElement: (eleRef, scrollRef, duration) => {
        const eleNode = ReactDOM.findDOMNode(eleRef.current);
        const scrollNode = ReactDOM.findDOMNode(scrollRef.current);
        let start = scrollNode.scrollTop,
            change = eleNode.offsetTop - start,
            currentTime = 0,
            increment = 20;

        function animateScroll(scrollNode) {
            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);
            scrollNode.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(() => {
                    animateScroll(scrollNode);
                }, increment);
            }
        };

        animateScroll(scrollNode);
    },

};
