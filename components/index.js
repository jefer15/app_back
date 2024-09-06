const tasksRouter = require('./tasks/tasks.routes') 
const authRouter = require('./auth/auth.routes')

const registerApiRoutes = (app) => {
    app.use('/api/tasks', tasksRouter);
    app.use('/api/auth', authRouter);
}

module.exports = registerApiRoutes;