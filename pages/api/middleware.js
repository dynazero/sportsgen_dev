const middlewareRunner = (...middlewares) => (handler) => async (req, res) => {
    for (const middleware of middlewares) {
      try {
        await new Promise((resolve, reject) => {
          middleware(req, res, (result) => {
            if (result instanceof Error) {
              return reject(result);
            }
            return resolve(result);
          });
        });
      } catch (error) {
        console.error('Error in middleware:', error);
        res.status(500).json({ message: 'Middleware error', error: error.message });
        return;
      }
    }
    return handler(req, res);
  };
  
  export default middlewareRunner;
  