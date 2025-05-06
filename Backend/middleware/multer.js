import multer from 'multer';


const storage = multer.diskStorage({
  filename:function (req,file,callback) {
    callback(null,file.originalname)
  }
})

const upload= multer({storage})

export default upload



// exports.authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
