import { authSagas } from './auth';
import { tweetSagas } from './entities/tweets';
import { userSagas } from './entities/users'


export default function* sagas() {
  yield [
    ...authSagas,
    ...tweetSagas,
    ...userSagas
  ];
}
