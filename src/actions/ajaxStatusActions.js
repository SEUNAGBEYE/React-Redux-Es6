import * as types from './actionTypes';

export function beginAjaxCalls() {
    return { type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
    return { type: types.AJAX_CALL_ERR0R};
}