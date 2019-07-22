var PROTO_PATH = __dirname + '/employeeinfo.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var einfo_proto = grpc.loadPackageDefinition(packageDefinition).employeeinfo;
//console.log(einfo_proto);

/**
 * Implements the getEmployeeInfo RPC method.
 */
function getEmployeeInfo(req, callback) {
    if(req.request.ID=="1")
     callback (null, {Name: "Baljinder singh", Id:"1"});
     else if(req.request.ID=="2")
     callback (null, {Name: "Employee Name 2", Id:"2"});
     else
     callback (null, {Name: "Anonymous", Id:"9999"});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var url = 'localhost:454545';
  var server = new grpc.Server();
  console.log(einfo_proto.employeeinfoservice.service);
  server.addService(einfo_proto.employeeinfoservice.service, {getEmployeeInfo: getEmployeeInfo});
  server.bind(url, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('server is up and listening at '+ url);
}

main();
