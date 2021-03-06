import axios from 'axios';
import serviceConfig from './index';
import apiTypes from '../constants/apiConstants';

/**
 * @api {post} /api/v1/account/ Post account
 * @apiDescription Add an account.
 * @apiDescription Use this endpoint to add an account.
 *
 * @apiParam (Request message body) {String} [name] Account name
 * @apiParam (Request message body) {String} account_arn ARN in the form of "arn:aws:iam::123456789012:role/Cloud-Meter-role"
 * @apiParam (Request message body) {String} resourcetype Resource type, standard is currently "AwsAccount"
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:01:30.046910Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "account_arn": [
 *          "account_arn is required"
 *       ]
 *     }
 */
const addAccount = (data = {}) =>
  axios(
    serviceConfig({
      method: 'post',
      url: process.env.REACT_APP_ACCOUNTS_SERVICE,
      data
    })
  );

/**
 * @api {get} /api/v1/account/:id/ Get account
 * @apiDescription Retrieve a specific account.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem Ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:01:30.046910Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const getAccount = id =>
  axios(
    serviceConfig({
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}/`
    })
  );

/**
 * @api {get} /api/v1/report/accounts/ Get accounts overview
 * @apiDescription List all accounts, and their summaries.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {Array} cloud_account_overviews
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "cloud_account_overviews": [
 *         {
 *           "arn": "arn:aws:iam::114204391493:role/role-for-cloudigrade",
 *           "creation_date": "2018-07-06T15:09:21.442412Z",
 *           "id": "1",
 *           "images": 1,
 *           "instances": 2,
 *           "name": "Lorem ipsum",
 *           "openshift_instances": null,
 *           "rhel_instances": 2,
 *           "type": "aws",
 *           "user_id": 1
 *         }
 *       ]
 *     }
 * @apiError {String} end
 * @apiError {String} start
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "end": [
 *         "This field is required."
 *       ],
 *       "start": [
 *         "This field is required."
 *       ]
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const getAccounts = (query = {}) =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_ACCOUNTS_SERVICE_OVERVIEW,
      params: query
    })
  );

/**
 * @api {get} /api/v1/report/images/ Get images
 * @apiDescription Get images for an account (or account detail).
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "images": [
 *         {
 *           "cloud_image_id": "ami-rhel7",
 *           "id": 2,
 *           "instances_seen": 2,
 *           "is_encrypted": false,
 *           "name": null,
 *           "openshift": false,
 *           "openshift_challenged": false,
 *           "openshift_detected": false,
 *           "rhel": true,
 *           "rhel_challenged": false,
 *           "rhel_detected": true,
 *           "runtime_seconds": 90362.5,
 *           "status": "inspected"
 *         },
 *         {
 *           "cloud_image_id": "ami-rhel8",
 *           "id": 7,
 *           "instances_seen": 1,
 *           "is_encrypted": false,
 *           "name": null,
 *           "openshift": false,
 *           "openshift_challenged": false,
 *           "openshift_detected": false,
 *           "rhel": true,
 *           "rhel_challenged": false,
 *           "rhel_detected": true,
 *           "runtime_seconds": 3600.0,
 *           "status": "inspected"
 *         },
 *         {
 *           "cloud_image_id": "ami-plain",
 *           "id": 9,
 *           "instances_seen": 1,
 *           "is_encrypted": false,
 *           "name": null,
 *           "openshift": false,
 *           "openshift_challenged": false,
 *           "openshift_detected": false,
 *           "rhel": false,
 *           "rhel_challenged": false,
 *           "rhel_detected": false,
 *           "runtime_seconds": 0.0,
 *           "status": "inspected"
 *         }
 *       ]
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
/**
 * FixMe: API - issue
 * The API requires the account id be passed as a query param. In order to emulate consistent
 * routing behavior we handle that query bundle at the service level instead.
 */
const getAccountImages = (id, query = {}) =>
  axios(
    serviceConfig({
      url: process.env.REACT_APP_ACCOUNTS_SERVICE_IMAGES,
      params: {
        ...{ [apiTypes.API_QUERY_ACCOUNT_ID]: id },
        ...query
      }
    })
  );

/**
 * @api {put} /api/v1/account/:id/ Put account
 * @apiDescription Update a specific account.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:07:47.078088Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const updateAccount = (id, data = {}) =>
  axios(
    serviceConfig({
      method: 'put',
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}/`,
      data
    })
  );

/**
 * @api {patch} /api/v1/account/:id/ Patch account field
 * @apiDescription Update a specific field for account.
 *
 * @apiHeader {String} Authorization Authorization: Token AUTH_TOKEN
 * @apiSuccess {String} account_arn
 * @apiSuccess {String} aws_account_id
 * @apiSuccess {Date} created_at
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} resourcetype
 * @apiSuccess {Date} updated_at
 * @apiSuccess {String} url
 * @apiSuccess {Number} user_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "account_arn": "arn:aws:iam::273470430754:role/role-for-cloudigrade",
 *       "aws_account_id": "273470430754",
 *       "created_at": "2018-07-05T16:01:30.046877Z",
 *       "id": 4,
 *       "name": "Lorem ipsum",
 *       "resourcetype": "AwsAccount",
 *       "updated_at": "2018-07-05T16:07:47.078088Z",
 *       "url": "http://localhost:8080/api/v1/account/4/",
 *       "user_id": 2
 *     }
 * @apiError {String} detail
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "detail": "Authentication credentials were not provided."
 *     }
 */
const updateAccountField = (id, data = {}) =>
  axios(
    serviceConfig({
      method: 'patch',
      url: `${process.env.REACT_APP_ACCOUNTS_SERVICE}${id}/`,
      data
    })
  );

export { addAccount, getAccount, getAccounts, getAccountImages, updateAccount, updateAccountField };
