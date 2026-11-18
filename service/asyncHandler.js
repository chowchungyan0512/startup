// Express 4 does not forward a rejected promise from an async route handler
// to the error-handling middleware on its own - it has to be caught and
// passed to next() explicitly, or an unhandled rejection crashes the
// process. Wrapping every async handler with this does that automatically.
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
