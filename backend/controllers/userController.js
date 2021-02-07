import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})


// @desc  Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const {email, password, name} = req.body

    const userExist = await User.findOne({email})

    if (userExist) {
        res.status(400)
        throw new Error('the user already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
})


// @desc  Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id) //get logged user id

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status('404')
        throw new Error('User not found')
    }

})


// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            //automatically encrypted in userModel.js {userSchema.pre 'save'}
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status('404')
        throw new Error('User not found')
    }

})

// @desc  Get all users
// @route POST /api/users/
// @access Private Admin
const getUsers = asyncHandler(async (req, res) => {

    const user = await User.find({})
    res.json(user)

})

// @desc  Get user by id
// @route POST /api/users/
// @access Private Admin
const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password') //select minus

    if(user){
        res.json(user)
    }else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc  Get  user by id for update ...
// @route POST /api/users/:id
// @access Private Admin
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password') //select minus password

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,

        })
    } else {
        res.status('404')
        throw new Error('User not found')
    }

})

// @desc  Delete users
// @route DELETE /api/users/:id
// @access Private Admin
const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
    res.json(user)

})

export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, updateUser , getUserById}