const http = require('http');
const https = require('https');
const url = require('url');
const jstoxml = require('./jstoxml');
const responsetype = require('./responsetype');
const error = require('./error').errors;
const baseURL = "http://ip-api.com/"

module.exports.fireRequest = function(domainOrip, reponseType, callback) {
	reponseType = reponseType.toLowerCase();

	const index = responsetype.type.indexOf(reponseType.toLowerCase());
	if(index > -1) {
		if (reponseType === 'xml') {
			reponseTypeTemp = 'json';
		} else {
			reponseTypeTemp = reponseType;
		}
		const urlData = url.parse(baseURL + reponseTypeTemp + "/" + domainOrip);
		const http_ = urlData.protocol === 'https:' ? https : http;

		const done = function(quota, err, result) {
			callback(err, result, quota);
		};

		const req = http_.request(urlData, function(res) {
			let data = '';
			const quota = {
				secondsToReset: res.headers['x-ttl'],
				requestsRemaining: res.headers['x-rl']
			};
			res.on('data', function(buffer) {
				data += buffer.toString('utf8');
			})
			res.on('end', function() {
				parseResponse(data, reponseType, done.bind(null, quota));
			});
		});

		req.on('error', done);

		req.end();
	} else {
		callback(null, error['incorrect_formate']);
	}
};

function parseResponse(data, responseType, done) {
	if (responsetype.JSON === responseType) {
		data = JSON.parse(data);
		if (data.status === 'fail') {
			error_code = data.message.replace(/ /g, '_');
			done(null, error[error_code]);
		} else {
			done(null, data);
		}
	} else if (responsetype.CSV === responseType) {
		dataArray = data.split(',');
		if (dataArray[0] === 'fail') {
			error_code = dataArray[1].replace(/"/g, '').replace(/ /g, '_');
			done(null, error[error_code]);
		} else {
			done(null, data);
		}
	} else if (responsetype.XML === responseType) {
		data = JSON.parse(data);
		if (data.status === 'fail') {
			error_code = data.message.replace(/ /g, '_');
			done(null, error[error_code]);
		} else {
			result = jstoxml.toXML(data);
			done(null, result);
		}
	} else if (responsetype.LINE === responseType) {
		dataArray = data.split('\n');
		if (dataArray[0] === 'fail') {
			error_code = dataArray[1].replace(/ /g, '_');
			done(null, error[error_code]);
		} else {
			done(null, data);
		}
	}
}
