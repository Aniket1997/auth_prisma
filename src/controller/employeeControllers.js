const {hashedPassword} = require('../util/index');
const {prisma} = require('../config/index');

const addEmployee = async(req,res)=>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:'email,password,role are mandatory',
            error:{},
            data:{}
        })
    }
    console.log(req.user.role);
    
    if (!['ADMIN', 'MANAGER'].includes(req.user?.role)) {
        return res.status(403).json({
            success: false,
            message: 'Unauthorized',
        });
    }

    try {
        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists.',
            });
        }

        // Hash the password
        const hashedPass = await hashedPassword(password);

        // Create the new employee
        const newEmployee = await prisma.user.create({
            data: {
                email,
                password: hashedPass,
                role: 'EMPLOYEE',
            },
        });

        return res.status(201).json({
            success: true,
            message: 'Employee added successfully.',
            data: newEmployee,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong.',
            error: error.message,
        });
    }
}

module.exports={
    addEmployee
}