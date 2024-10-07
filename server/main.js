import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  'user/get': async function() {
    this.unblock();
    const userId = Meteor.userId();
    if (!userId) throw new Meteor.Error('rk-err-access-denied', 'Access denied');
    const user = await Meteor.users.findOneAsync(userId);
    return user;
  },
  'settings/set': async function(settings) {
    this.unblock();
    const userId = Meteor.userId();
    if (!userId) throw new Meteor.Error('rk-err-access-denied', 'Access denied');
    const user = await Meteor.users.updateAsync(userId, {$set: {settings}});
    return user;
  },
});