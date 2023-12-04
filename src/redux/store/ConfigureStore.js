import { createStore, combineReducers } from 'redux';
import signUpReducer from '../reducers/SignUpReducer';
import branchReducer from '../reducers/BranchReducer';
import reportReducer from '../reducers/ReportReducer';

const rootReducer = combineReducers({
    signUp: signUpReducer,
    themeBranch: branchReducer,
    report: reportReducer
});

const store = createStore(rootReducer);

export default store;