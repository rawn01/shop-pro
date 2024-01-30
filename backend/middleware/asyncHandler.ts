import express from "express";

const asyncHandler = (fn) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

// const asyncHandler = (fn) => {
//     return (req, res, next) => {
//         return Promise.resolve(fn(req, res, next, "hello")).catch(next);
//     }  
// };

export default asyncHandler;