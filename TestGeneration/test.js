var subject = require('./subject.js')
var mock = require('mock-fs');
subject.inc(-1,undefined);
subject.inc(-1,false);
subject.inc(1,undefined);
subject.inc(1,false);
subject.weird(8,-1,41,"strict");
subject.weird(8,-1,41,'werw');
subject.weird(8,-1,41,"stricta");
subject.weird(8,-1,41,'werwa');
subject.weird(8,-1,43,"strict");
subject.weird(8,-1,43,'werw');
subject.weird(8,-1,43,"stricta");
subject.weird(8,-1,43,'werwa');
subject.weird(8,1,41,"strict");
subject.weird(8,1,41,'werw');
subject.weird(8,1,41,"stricta");
subject.weird(8,1,41,'werwa');
subject.weird(8,1,43,"strict");
subject.weird(8,1,43,'werw');
subject.weird(8,1,43,"stricta");
subject.weird(8,1,43,'werwa');
subject.weird(6,-1,41,"strict");
subject.weird(6,-1,41,'werw');
subject.weird(6,-1,41,"stricta");
subject.weird(6,-1,41,'werwa');
subject.weird(6,-1,43,"strict");
subject.weird(6,-1,43,'werw');
subject.weird(6,-1,43,"stricta");
subject.weird(6,-1,43,'werwa');
subject.weird(6,1,41,"strict");
subject.weird(6,1,41,'werw');
subject.weird(6,1,41,"stricta");
subject.weird(6,1,41,'werwa');
subject.weird(6,1,43,"strict");
subject.weird(6,1,43,'werw');
subject.weird(6,1,43,"stricta");
subject.weird(6,1,43,'werwa');
mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/fileExists','pathContent/file1.txt');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/fileExists','pathContent/file1.txt');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('path/fileExists','pathContent/file1.txt');
mock.restore();

mock({});
	subject.fileTest('path/fileExists','pathContent/file1.txt');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/fileExists','pathContent/emptyFile.txt');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/fileExists','pathContent/emptyFile.txt');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('path/fileExists','pathContent/emptyFile.txt');
mock.restore();

mock({});
	subject.fileTest('path/fileExists','pathContent/emptyFile.txt');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/emptyDir','pathContent/file1.txt');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/emptyDir','pathContent/file1.txt');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('path/emptyDir','pathContent/file1.txt');
mock.restore();

mock({});
	subject.fileTest('path/emptyDir','pathContent/file1.txt');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/emptyDir','pathContent/emptyFile.txt');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('path/emptyDir','pathContent/emptyFile.txt');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('path/emptyDir','pathContent/emptyFile.txt');
mock.restore();

mock({});
	subject.fileTest('path/emptyDir','pathContent/emptyFile.txt');
mock.restore();

subject.normalize('');
subject.format('','',undefined);
subject.format('','',{});
subject.format('','',{"normalize": true});
subject.blackListNumber('');
