// communication with the API
// Because we're using jtoker, account update methods are wrapped for us
import PubSub from 'pubsub-js'
import Auth from 'j-toker'

PubSub.subscribe('auth.accountUpdate.success', function(ev, msg) {
  alert('Your account has been updated!');
});

PubSub.subscribe('auth.accountUpdate.error', function(ev, msg) {
  alert('There was an error while trying to update your account.');
});
