import { createReducer, actionType } from "../utils";
import * as Actions from "../actions/index";

const initial = {
    
};

type stateType = {
  title: string;
};

const handlers = {
  [Actions.SET_GLOBAL]: (
    state: Partial<stateType>,
    action: actionType<Partial<stateType>>
  ) => {
    return Object.assign({}, state, action.data);
  },
};

const reducer = createReducer(initial, handlers);

export default reducer;
