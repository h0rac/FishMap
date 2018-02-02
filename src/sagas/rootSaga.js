import {all} from 'redux-saga/effects'

import {fishmarkSaga} from "./fishmarks";
import {usersSaga} from "./users";


export default function* rootSaga() {

    yield all([
        ...fishmarkSaga,
        ...usersSaga
    ])

}