// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  isServer: false,
  utilityApiBasePath:'http://127.0.0.1:8000/api/',
  img_path: 'http://localhost:8000/img/',
  // for prerender
  host: 'http://localhost:4000',
  VENDOR_NAME:'oyslans',
  SANDBOX_INTEGRATION_KEY:'DpmuzcPOURAt0rKEXWrFK04mlpTQCG2h80eamjVB3ueUiGBzny',
  SANDBOX_INTEGRATION_PASSWORD:'bhmYJMUcMdjZg7QBtcytGuonGVXEZxw1LhwRshllDZMpUgyLu3l7czXMmCSNPsfri'
  // VENDOR_NAME:'sandbox',
  // SANDBOX_INTEGRATION_KEY:'hJYxsw7HLbj40cB8udES8CDRFLhuJ8G54O6rDpUXvE6hYDrria',
  // SANDBOX_INTEGRATION_PASSWORD:'o2iHSrFybYMZpmWOQMuhsXP52V4fBtpuSDshrKDSWsBY1OiN6hwd9Kb12z4j5Us5u'
};

