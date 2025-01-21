const { prisma } = require('../config/index');
const {hashedPassword,comparePassword,tokenGenerate} = require('../util/index');

const registerUser = async(req,res)=>{
    const { email, password, role } = req.body;

    if(!email || !password || !role) 
    {
        return res.status(400).json({
            success:false,
            message:'email,password,role are mandatory',
            error:{},
            data:{email:email,password:password,role:role}
        })
    }
    if(!['ADMIN','MANAGER','EMPLOYEE'].includes(role))
    {
        return res.status(400).json({
            success:false,
            message:'Invalid role',
            error:{},
            data:{role}
        })
    }

    const hashPassword = await hashedPassword(password);
    
    const user = await prisma.user.create({
        data: { email, password: hashPassword, role }
      });
    
    return res.status(201).json({ message: 'User created', user });

}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(400).json({
            success:false,
            message:'email and password are mandatory',
            error:{},
            data:{email:email,password:password}
        })
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid password' });
    
    const token = await tokenGenerate(user);
    res.json({ message: 'Login successful', token });
}

module.exports={
    registerUser,
    loginUser
}

