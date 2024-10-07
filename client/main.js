import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  const instance = this;
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.user = new ReactiveVar({});
  

  this.autorun(function() {
    Session.get('reload');
    Meteor.callAsync('user/get')
    .then(function (user) {
      instance.user.set(user);
    })
    .catch(function(err) {
      console.error(err);
    }).finally(function() {
      
    })


  });



});

Template.hello.helpers({
  user: function() {
    return Template.instance().user.get();
  },
  tablebg: function() {
    const user = Template.instance().user.get();
    return user.settings?.tablebg;
  },
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'submit form#settings': function(e, instance) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const settings = {};
    for (const pair of formData.entries()) {
      const key = pair[0];
      const value = pair[1];
      settings[key] = value;
    }
    Meteor.call('settings/set', settings, function (err, user) {
      if (err) {
        console.error(err);
        toastr.error(TAPi18n.__(err.reason));
        return;
      }
      Session.set('reload', new Date());
      console.log('ok')
      Toastify({
        text: "OK",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    });

    
  },
  'click button'(e, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
