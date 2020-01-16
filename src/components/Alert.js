import Notification from './Notification.js';

let messageInstance;

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({ duration = 2.5, content = '' }) {
  let instance = getMessageInstance();

  instance.add({
    content: content,
    duration: duration
  });
}

export default {
  info (options) {
    return notice(options);
  }
}