import test, { chromium } from "@playwright/test";
const fs = require("fs");
const request = require("request");

test("test first suggestion on github feature request", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.route("**/*", (route, req) => { // Should I create a server that whould contain this route??
    // and then should I use http req to activate it? and even if it work how should I assert that?
    const options = {
      uri: req.url(),
      method: req.method(),
      headers: req.headers(),
      body: req.postDataBuffer(),
      timeout: 10000,
      followRedirect: false,
      agentOptions: {
        // ca: fs.readFileSync("./certs/ca.pem"),
        pfx: fs.readFileSync("./certs/Jude Law.pfx"),
        // passphrase: fs.readFileSync("./certs/user_cert.p12.pwd"),
      },
    };
    let firstTry = true;
    const handler = function handler(err, resp, data) {
      if (err) {
        /* Strange random connection error on first request, do one re-try */
        if (firstTry) {
          firstTry = false;
          return request(options, handler);
        }
        console.error(`Unable to call ${options.uri}`, err.code, err);
        return route.abort();
      } else {
        return route.fulfill({
          status: resp.statusCode,
          headers: resp.headers,
          body: data,
        });
      }
    };
    return request(options, handler);
  });
});
