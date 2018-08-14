const API_RESPONSE_ACCOUNTS = 'cloud_account_overviews';
const API_RESPONSE_ACCOUNTS_ARN = 'arn';
const API_RESPONSE_ACCOUNTS_ID = 'id';
const API_RESPONSE_ACCOUNTS_ACCOUNT_ID = 'cloud_account_id';
const API_RESPONSE_ACCOUNTS_IMAGES = 'images';
const API_RESPONSE_ACCOUNTS_INSTANCES = 'instances';
const API_RESPONSE_ACCOUNTS_NAME = 'name';
const API_RESPONSE_ACCOUNTS_OPENSHIFT = 'openshift_instances';
const API_RESPONSE_ACCOUNTS_RHEL = 'rhel_instances';
const API_RESPONSE_ACCOUNTS_START = 'start';
const API_RESPONSE_ACCOUNTS_END = 'end';
const API_RESPONSE_ACCOUNTS_DATE = 'creation_date';

const API_RESPONSE_ACCOUNT_ACCOUNT_ID = 'aws_account_id';
const API_RESPONSE_ACCOUNT_ID = 'id';
const API_RESPONSE_ACCOUNT_NAME = 'name';
const API_RESPONSE_ACCOUNT_UPDATED_AT = 'updated_at';

const API_RESPONSE_AUTH_USERNAME = 'username';
const API_RESPONSE_AUTH_EMAIL = 'email';

const API_RESPONSE_IMAGES = 'images';
const API_RESPONSE_IMAGES_ID = 'id';
const API_RESPONSE_IMAGES_ENCRYPTED = 'is_encrypted';
const API_RESPONSE_IMAGES_NAME = 'name';
const API_RESPONSE_IMAGES_IMAGE_ID = 'cloud_image_id';
const API_RESPONSE_IMAGES_INSTANCES = 'instances_seen';
const API_RESPONSE_IMAGES_SECONDS = 'runtime_seconds';
const API_RESPONSE_IMAGES_STATUS = 'status';
const API_RESPONSE_IMAGES_RHEL = 'rhel';
const API_RESPONSE_IMAGES_RHEL_CHALLENGED = 'rhel_challenged';
const API_RESPONSE_IMAGES_RHEL_DETECTED = 'rhel_detected';
const API_RESPONSE_IMAGES_OPENSHIFT = 'openshift';
const API_RESPONSE_IMAGES_OPENSHIFT_CHALLENGED = 'openshift_challenged';
const API_RESPONSE_IMAGES_OPENSHIFT_DETECTED = 'openshift_detected';

const API_RESPONSE_INSTANCES_USAGE = 'daily_usage';
const API_RESPONSE_INSTANCES_USAGE_DATE = 'date';
const API_RESPONSE_INSTANCES_USAGE_OPENSHIFT = 'openshift_instances';
const API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME = 'openshift_runtime_seconds';
const API_RESPONSE_INSTANCES_USAGE_RHEL = 'rhel_instances';
const API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME = 'rhel_runtime_seconds';
const API_RESPONSE_INSTANCES_OPENSHIFT = 'instances_seen_with_openshift';
const API_RESPONSE_INSTANCES_RHEL = 'instances_seen_with_rhel';

const API_QUERY_START = 'start';
const API_QUERY_END = 'end';
const API_QUERY_NAME = 'name_pattern';
const API_QUERY_ACCOUNT_ID = 'account_id';
const API_QUERY_USER_ID = 'user_id';

const API_SUBMIT_AUTH_USERNAME = 'username';
const API_SUBMIT_AUTH_PASSWORD = 'password';
const API_SUBMIT_ACCOUNT_ID = 'id';
const API_SUBMIT_ACCOUNT_ARN = 'account_arn';
const API_SUBMIT_ACCOUNT_NAME = 'name';
const API_SUBMIT_ACCOUNT_RESOURCE_TYPE = 'resourcetype';
const API_SUBMIT_ACCOUNT_AWS_ID = 'aws_account_id';

const apiTypes = {
  API_RESPONSE_ACCOUNTS,
  API_RESPONSE_ACCOUNTS_ARN,
  API_RESPONSE_ACCOUNTS_ID,
  API_RESPONSE_ACCOUNTS_ACCOUNT_ID,
  API_RESPONSE_ACCOUNTS_IMAGES,
  API_RESPONSE_ACCOUNTS_INSTANCES,
  API_RESPONSE_ACCOUNTS_NAME,
  API_RESPONSE_ACCOUNTS_OPENSHIFT,
  API_RESPONSE_ACCOUNTS_RHEL,
  API_RESPONSE_ACCOUNTS_START,
  API_RESPONSE_ACCOUNTS_END,
  API_RESPONSE_ACCOUNTS_DATE,
  API_RESPONSE_ACCOUNT_ACCOUNT_ID,
  API_RESPONSE_ACCOUNT_ID,
  API_RESPONSE_ACCOUNT_NAME,
  API_RESPONSE_ACCOUNT_UPDATED_AT,
  API_RESPONSE_AUTH_USERNAME,
  API_RESPONSE_AUTH_EMAIL,
  API_RESPONSE_IMAGES,
  API_RESPONSE_IMAGES_ID,
  API_RESPONSE_IMAGES_ENCRYPTED,
  API_RESPONSE_IMAGES_NAME,
  API_RESPONSE_IMAGES_IMAGE_ID,
  API_RESPONSE_IMAGES_INSTANCES,
  API_RESPONSE_IMAGES_SECONDS,
  API_RESPONSE_IMAGES_STATUS,
  API_RESPONSE_IMAGES_RHEL,
  API_RESPONSE_IMAGES_RHEL_CHALLENGED,
  API_RESPONSE_IMAGES_RHEL_DETECTED,
  API_RESPONSE_IMAGES_OPENSHIFT,
  API_RESPONSE_IMAGES_OPENSHIFT_CHALLENGED,
  API_RESPONSE_IMAGES_OPENSHIFT_DETECTED,
  API_RESPONSE_INSTANCES_USAGE,
  API_RESPONSE_INSTANCES_USAGE_DATE,
  API_RESPONSE_INSTANCES_USAGE_OPENSHIFT,
  API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME,
  API_RESPONSE_INSTANCES_USAGE_RHEL,
  API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME,
  API_RESPONSE_INSTANCES_OPENSHIFT,
  API_RESPONSE_INSTANCES_RHEL,
  API_QUERY_START,
  API_QUERY_END,
  API_QUERY_NAME,
  API_QUERY_ACCOUNT_ID,
  API_QUERY_USER_ID,
  API_SUBMIT_AUTH_USERNAME,
  API_SUBMIT_AUTH_PASSWORD,
  API_SUBMIT_ACCOUNT_ID,
  API_SUBMIT_ACCOUNT_ARN,
  API_SUBMIT_ACCOUNT_NAME,
  API_SUBMIT_ACCOUNT_RESOURCE_TYPE,
  API_SUBMIT_ACCOUNT_AWS_ID
};

export {
  apiTypes as default,
  apiTypes,
  API_RESPONSE_ACCOUNTS,
  API_RESPONSE_ACCOUNTS_ARN,
  API_RESPONSE_ACCOUNTS_ID,
  API_RESPONSE_ACCOUNTS_ACCOUNT_ID,
  API_RESPONSE_ACCOUNTS_IMAGES,
  API_RESPONSE_ACCOUNTS_INSTANCES,
  API_RESPONSE_ACCOUNTS_NAME,
  API_RESPONSE_ACCOUNTS_OPENSHIFT,
  API_RESPONSE_ACCOUNTS_RHEL,
  API_RESPONSE_ACCOUNTS_START,
  API_RESPONSE_ACCOUNTS_END,
  API_RESPONSE_ACCOUNTS_DATE,
  API_RESPONSE_ACCOUNT_ACCOUNT_ID,
  API_RESPONSE_ACCOUNT_ID,
  API_RESPONSE_ACCOUNT_NAME,
  API_RESPONSE_ACCOUNT_UPDATED_AT,
  API_RESPONSE_AUTH_USERNAME,
  API_RESPONSE_AUTH_EMAIL,
  API_RESPONSE_IMAGES,
  API_RESPONSE_IMAGES_ID,
  API_RESPONSE_IMAGES_ENCRYPTED,
  API_RESPONSE_IMAGES_NAME,
  API_RESPONSE_IMAGES_IMAGE_ID,
  API_RESPONSE_IMAGES_INSTANCES,
  API_RESPONSE_IMAGES_SECONDS,
  API_RESPONSE_IMAGES_STATUS,
  API_RESPONSE_IMAGES_RHEL,
  API_RESPONSE_IMAGES_RHEL_CHALLENGED,
  API_RESPONSE_IMAGES_RHEL_DETECTED,
  API_RESPONSE_IMAGES_OPENSHIFT,
  API_RESPONSE_IMAGES_OPENSHIFT_CHALLENGED,
  API_RESPONSE_IMAGES_OPENSHIFT_DETECTED,
  API_RESPONSE_INSTANCES_USAGE,
  API_RESPONSE_INSTANCES_USAGE_DATE,
  API_RESPONSE_INSTANCES_USAGE_OPENSHIFT,
  API_RESPONSE_INSTANCES_USAGE_OPENSHIFT_RUNTIME,
  API_RESPONSE_INSTANCES_USAGE_RHEL,
  API_RESPONSE_INSTANCES_USAGE_RHEL_RUNTIME,
  API_RESPONSE_INSTANCES_OPENSHIFT,
  API_RESPONSE_INSTANCES_RHEL,
  API_QUERY_START,
  API_QUERY_END,
  API_QUERY_NAME,
  API_QUERY_ACCOUNT_ID,
  API_QUERY_USER_ID,
  API_SUBMIT_AUTH_USERNAME,
  API_SUBMIT_AUTH_PASSWORD,
  API_SUBMIT_ACCOUNT_ID,
  API_SUBMIT_ACCOUNT_ARN,
  API_SUBMIT_ACCOUNT_NAME,
  API_SUBMIT_ACCOUNT_RESOURCE_TYPE,
  API_SUBMIT_ACCOUNT_AWS_ID
};
