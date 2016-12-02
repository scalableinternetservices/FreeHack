import { Record } from 'immutable';

export const Tweet = new Record({
  content: null,
  user: null,
  wow_count: null,
  like_count: null,
  liked: false,
  wowed: false,
  created_at: null,
  id: null
});
