var subject = require('./mystery.js')
var mock = require('mock-fs');
subject.inc(-101,77);
subject.inc(-101,78);
subject.inc(-99,77);
subject.inc(-99,78);
subject.weird(86,69,41,"strictly");
subject.weird(86,69,41,'bob');
subject.weird(86,69,41,"strictlya");
subject.weird(86,69,41,'boba');
subject.weird(86,69,43,"strictly");
subject.weird(86,69,43,'bob');
subject.weird(86,69,43,"strictlya");
subject.weird(86,69,43,'boba');
subject.weird(86,71,41,"strictly");
subject.weird(86,71,41,'bob');
subject.weird(86,71,41,"strictlya");
subject.weird(86,71,41,'boba');
subject.weird(86,71,43,"strictly");
subject.weird(86,71,43,'bob');
subject.weird(86,71,43,"strictlya");
subject.weird(86,71,43,'boba');
subject.weird(88,69,41,"strictly");
subject.weird(88,69,41,'bob');
subject.weird(88,69,41,"strictlya");
subject.weird(88,69,41,'boba');
subject.weird(88,69,43,"strictly");
subject.weird(88,69,43,'bob');
subject.weird(88,69,43,"strictlya");
subject.weird(88,69,43,'boba');
subject.weird(88,71,41,"strictly");
subject.weird(88,71,41,'bob');
subject.weird(88,71,41,"strictlya");
subject.weird(88,71,41,'boba');
subject.weird(88,71,43,"strictly");
subject.weird(88,71,43,'bob');
subject.weird(88,71,43,"strictlya");
subject.weird(88,71,43,'boba');
mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/file1.txt','path/fileExists');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/file1.txt','path/fileExists');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('pathContent/file1.txt','path/fileExists');
mock.restore();

mock({});
	subject.fileTest('pathContent/file1.txt','path/fileExists');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/file1.txt','path/emptyDir');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/file1.txt','path/emptyDir');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('pathContent/file1.txt','path/emptyDir');
mock.restore();

mock({});
	subject.fileTest('pathContent/file1.txt','path/emptyDir');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/emptyFile.txt','path/fileExists');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/emptyFile.txt','path/fileExists');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('pathContent/emptyFile.txt','path/fileExists');
mock.restore();

mock({});
	subject.fileTest('pathContent/emptyFile.txt','path/fileExists');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{},"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/emptyFile.txt','path/emptyDir');
mock.restore();

mock({"pathContent":{"file1.txt":"text content","emptyFile.txt":""}});
	subject.fileTest('pathContent/emptyFile.txt','path/emptyDir');
mock.restore();

mock({"path/fileExists":{"file1.txt":"text from file1"},"path/emptyDir":{}});
	subject.fileTest('pathContent/emptyFile.txt','path/emptyDir');
mock.restore();

mock({});
	subject.fileTest('pathContent/emptyFile.txt','path/emptyDir');
mock.restore();

subject.normalize('');
subject.format("123456789",'',undefined);
subject.format("123456789",'',{});
subject.format("123456789",'',{"normalize": true});
subject.format("",'',undefined);
subject.format("",'',{});
subject.format("",'',{"normalize": true});
subject.blackListNumber('');
