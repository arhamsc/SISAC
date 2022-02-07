const serviceAccount = require('../../confidential/sisac-b578f-firebase-adminsdk-paojo-be36c2550f.json');

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const fcm = require('firebase-admin/messaging');

// module.exports.pushNoti = async (req, res, next) => {

// };

module.exports.sendPushNotification = async (
  title,
  bodyMessage,
  priority,
  deviceToken,
) => {
  let response = '';
  try {
    const message = {
      // data: {

      // },
      notification: {
        title,
        body: bodyMessage,
      },
      android: {
        priority,
      },
      token: deviceToken,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    await fcm
      .getMessaging()
      .send(message)
      .then((res) => {
        // Response is a message ID string.
        response = res;
      })
      .catch(() => {
        response = 'Error in sending fcm notification';
      });
    // console.log(response);
    return response;
  } catch (_) {
    response = 'Failed to send the notification';
  }
  return response;
};
