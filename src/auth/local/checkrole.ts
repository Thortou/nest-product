export function checkUserRole(req, res, next) {
  if (req.user.role !== 'user') {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
} 