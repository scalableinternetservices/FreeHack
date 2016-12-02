import { Button, notification } from 'antd';

const openNotificationWithIcon = (type, message, description) => () => (
  notification[type]({
    message: message,
    description: description
  })
)

export const tweetSuccessNotification = openNotificationWithIcon(
                                        'success', 'Posted!',
                                        'Your tweet is out in the world.')
