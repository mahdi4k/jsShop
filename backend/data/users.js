import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name: 'john Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'adam Doe',
        email: 'adam@example.com',
        password: bcrypt.hashSync('123456',10),
    },


]
export default users