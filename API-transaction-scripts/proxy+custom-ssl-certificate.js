//
// ThousandEyes Transaction script which uses a proxy and a custom SSL certificate.
//
import { fetchAgent, test } from 'thousandeyes';
import fetch from 'node-fetch';
import assert from 'assert';

runScript();

async function runScript() {
    // X509 of the certificate
    // NOTE: this is a fake certificate make sure to replace with a real one
    const cert = `-----BEGIN CERTIFICATE-----
self signed certificate
-----END CERTIFICATE-----
`;
    // SSL options with custom certificates
    const sslOptions = { customCA: [cert] };
    // test proxy settings
    const httpsProxySettings = test.getSettings().proxy;

    // get a HTTPS proxy agent
    // NOTE: this works with getHttpProxyAgent and getPACProxyAgent too.
    const httpsProxyAgent = fetchAgent.getHttpsProxyAgent(httpsProxySettings, sslOptions);
    // set the agent in the request options
    const httpsProxyRequestOptions = {
        agent: httpsProxyAgent,
    };
    // call the endpoint with a self signed certificate 
    // NOTE: this is a fake endpoint make sure to replace with a real one
    const response2 = await fetch('https://some-website.com', httpsProxyRequestOptions);
    // verify that response status is 200
    assert.equal(200, response2.status);
};
