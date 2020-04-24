# ip-locator

###### Retrieve the information of an IP address or hostname.

Uses [ip-api.com](http://ip-api.com/) to query for information.

Usage limits
-------

 [ip-api.com](http://ip-api.com/) will automatically ban any IP addresses doing over 150 requests per minute. To unban your IP click [here](http://ip-api.com/docs/unban).

You are free to use [ip-api.com](http://ip-api.com/) for non-commercial use.   [ip-api.com](http://ip-api.com/) does not allow commercial use without prior approval.

For commercial, unlimited use see ip-api.com [pro service](http://ip-api.com/docs/pro).


Install
-------

    npm i --save ip-locator


Usage
-----


```js
var ipLocator = require('ip-locator')

ipLocator.getDomainOrIPDetails(IpOrhostnameString, ResponseTypeString, function (err, data, quota) {
	console.log(data);
	console.log(quota);
});

ipLocator.getDomainOrIPDetails(IpOrhostnameString, ResponseTypeString)
	.then(function(result) {
		console.log(result.data);
		console.log(result.quota);
	})
	.catch(function(error) {
		console.log(error);
	});

const result = await ipLocator.getDomainOrIPDetails(IpOrhostnameString, ResponseTypeString);
```

Quota
---------
```js
{
	secondsToReset, // how many secons until remaining requests count will be reset
	requestsRemaining // how many requests can be sent
};
```

Response Types
---------

1. json
2. xml
3. csv
4. line

Example
-----
```js
var ipLocator = require('ip-locator')

ipLocator.getDomainOrIPDetails('google.com','json', function (err, data) {
  console.log(data)
});
```

Outputs:

```
{ as: 'AS15169 Google Inc.',
  city: 'Mountain View',
  country: 'United States',
  countryCode: 'US',
  isp: 'Google',
  lat: 37.4192,
  lon: -122.0574,
  org: 'Google',
  query: '74.125.130.101',
  region: 'CA',
  regionName: 'California',
  status: 'success',
  timezone: 'America/Los_Angeles',
  zip: '94043' }
```

Collaborators
-------

[Shahid Iqbal](http://nodejs-shahidiqbal.rhcloud.com/)