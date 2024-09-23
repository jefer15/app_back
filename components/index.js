const authRouter = require('./auth/auth.routes');
const tasksRouter = require('./tasks/tasks.routes');
const userRouter = require('./user/user.routes')
const inventoryRouter = require('./inventory/inventory.routes')
const organizationRouter = require('./organizations/organization.routes')

const registerApiRoutes = (app) => {
    app.use('/api/tasks', tasksRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/inventory', inventoryRouter);
    app.use('/api/organization', organizationRouter);
}

module.exports = registerApiRoutes;