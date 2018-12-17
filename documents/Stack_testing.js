Object.defineProperty(global, '__stack', {
  get: function() {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

function tracker() {
  console.log('#####Line####')
  console.log(__stack[1].getLineNumber())
  console.log(__stack[0].getLineNumber())
  console.log('#####Function####')
  console.log(__stack[1].getFunctionName())
  console.log(__stack[0].getFunctionName())
  console.log('#####Method####')
  console.log(__stack[1].getMethodName())
  console.log(__stack[0].getMethodName())
  console.log('#####Filename####')
  console.log(__stack[1].getFileName())
  console.log(__stack[0].getFileName())
  console.log('#####Eval Origin####')
  console.log(__stack[1].getEvalOrigin())
  console.log(__stack[0].getEvalOrigin())
  console.log('#####Top Level Invocation####')
  console.log(__stack[1].isToplevel())
  console.log(__stack[0].isToplevel())
}

tracker()
