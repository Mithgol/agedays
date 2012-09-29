var fs = require('fs');
var clog = console.log;

if (process.argv.length < 3) {
	clog('Usage:');
	clog('   node agedays "filename" [N]');
	clog('');
	clog('Parameters:');
	clog('   filename     -- name of the file which age (in days) is checked');
	clog('   N (optional) -- if file is N days old (or older),');
	clog('                   errorlevel 1 is set');
} else if (process.argv.length == 3) {
	try {
		var msec = (new Date()).getTime() -
			fs.statSync(process.argv[2]).mtime.getTime();
		var days = msec / 1000 / 60 / 60 / 24;
		clog('File "' + process.argv[2] + '" is ' + days + ' days old.');
	} catch(e) {
		clog('File "' + process.argv[2] + '" cannot be opened.');
	}
} else {
	try {
		var msec = (new Date()).getTime() -
			fs.statSync(process.argv[2]).mtime.getTime();
		var days = msec / 1000 / 60 / 60 / 24;
		if( days > (+process.argv[3]) ) {
			process.exit(1);
		} else {
			process.exit(0);
		}
	} catch(e) {
		clog('File "' + process.argv[2] + '" cannot be opened.');
		process.exit(2);
	}
}