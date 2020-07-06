import { combineReducers } from "redux";

import auth from "./auth_reducer";
import profileSetup from "./profile_reducer";
import feed from "./newsfeed_reducer";
import contest from "./contest_reducer";
import post from "./create_post_reducer";
import reactions from "./reaction_reducer";
import searchData from "./search_reducer";
import comments from "./comments_reducer";
import replies from "./reply_reducer";

export default combineReducers({
  auth,
  profileSetup,
  feed,
  contest,
  post,
  reactions,
  searchData,
  comments,
  replies
});
