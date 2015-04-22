// Load modules

// Declare internals

var tasks = []

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/api/customers/add',
        config: {
            description: 'End point for adding customers to the database',
            handler: function (request, reply) {
                // Get the task
                var task = request.payload.task;
                // Let's store the task
                var key = tasks.push(task);
                reply({key: key - 1, task: task});
            
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'customers'
};

       
     