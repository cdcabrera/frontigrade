import axios from 'axios';
import cookies from 'js-cookie';
import serviceConfig from './index';

/**
 * @api {post} /auth/users/create/
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} email
 * @apiSuccess {String} username
 * @apiSuccess {Number} id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "test@redhat.com",
 *       "username": "developer",
 *       "id":1
 *     }
 */
const createUser = () =>
  axios(
    serviceConfig({
      method: 'post',
      url: process.env.REACT_APP_USER_SERVICE_CREATE
    })
  );

/**
 * @api {post} /auth/users/delete/
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "detail": "Invalid token"
 *     }
 */
const deleteUser = () =>
  axios(
    serviceConfig({
      method: 'post',
      url: process.env.REACT_APP_USER_SERVICE_DELETE
    })
  );

/**
 * @api {post} /auth/token/create/
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} auth_token
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth_token": "b704c9fc3655635646356ac2950269f352ea1139"
 *     }
 */
const loginUser = () =>
  axios(
    serviceConfig(
      {
        method: 'post',
        url: process.env.REACT_APP_USER_SERVICE_LOGIN
      },
      false
    )
  ).then(success => {
    // use session storage instead, resets on tab close
    cookies.set(process.env.REACT_APP_AUTH_TOKEN, success.auth_token);
    return success;
  });

/**
 * @api {post} /auth/token/destroy/
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "detail": "Invalid token"
 *     }
 */
const logoutUser = () =>
  axios(
    serviceConfig({
      method: 'post',
      url: process.env.REACT_APP_USER_SERVICE_LOGOUT
    })
  );

/**
 * @api {post} /account/
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Number} count
 * @apiSuccess {String} next
 * @apiSuccess {String} previous
 * @apiSuccess {Array} results
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "count": 0,
 *       "next": null,
 *       "previous": null,
 *       "results": []
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const listUsers = () =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_USER_SERVICE_LIST
    })
  );

/**
 * @api {post} /auth/me/
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} email
 * @apiSuccess {String} username
 * @apiSuccess {Number} id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "test@redhat.com",
 *       "id": 1,
 *       "username": "developer"
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const whoami = () =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_USER_SERVICE_CURRENT
    })
  );

export { createUser, deleteUser, loginUser, logoutUser, listUsers, whoami };
