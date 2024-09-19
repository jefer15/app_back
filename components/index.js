const authRouter = require('./auth/auth.routes');
const tasksRouter = require('./tasks/tasks.routes');
const userRouter = require('./user/user.routes')
const filesRouter = require('./files/files.routes')

const registerApiRoutes = (app) => {
    app.use('/api/tasks', tasksRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/files', filesRouter);
}

module.exports = registerApiRoutes;