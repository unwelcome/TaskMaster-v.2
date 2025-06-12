"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logsController = logsController;
function logsController(req, res, next) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    console.log(`Request: time: ${formattedDate}; path: ${req.path}; params: ${JSON.stringify(req.params)}; query: ${JSON.stringify(req.query)}; body: ${JSON.stringify(req === null || req === void 0 ? void 0 : req.body)}`);
    next();
}
