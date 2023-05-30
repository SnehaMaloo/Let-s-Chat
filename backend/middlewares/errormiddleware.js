const notFound=(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`);  //url on which original request was sent
    res.status(404);
    next(error);
};

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode;
    res.status(statusCode);
    res.json({
        messag:err.message,
        stack: process.env.NODE_ENV==="production"?null:err.stack,
    });
}

module.exports={notFound,errorHandler};