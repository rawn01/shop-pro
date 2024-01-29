const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

// const asyncHandler = (fn) => {
//     return (req, res, next) => {
//         return Promise.resolve(fn(req, res, next, "hello")).catch(next);
//     }  
// };

export default asyncHandler;