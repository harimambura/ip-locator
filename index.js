const ipapi = require('./lib/ip-api');

module.exports.getDomainOrIPDetails = function(domainOrIp, reponseType, callback) {
	let promise;
	if (!callback) {
		promise = new Promise(function(resolve, reject) {
			callback = function(err, res, quota) {
				err ? reject(err) : resolve({
					data: res,
					quota: quota
				});
			};
		});
	}

	ipapi.fireRequest(domainOrIp, reponseType, function(err, result, quota) {
		callback(err, result, quota);
	});

	return promise;
};
