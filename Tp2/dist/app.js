"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApp = makeApp;
const express_1 = __importDefault(require("express"));
// import ordersRouter from './routes/order.routes';
function makeApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // app.use('/', ordersRouter);
    // basic error handler (for unexpected)
    app.use((err, _req, res, _next) => {
        console.error(err);
        res.status(500).json({ error: 'internal' });
    });
    return app;
}
exports.default = makeApp;
//# sourceMappingURL=app.js.map