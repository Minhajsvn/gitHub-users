const User = require('../models/user.model')
const axios = require('axios');

async function fetchGithubUsers(url){
    try {
        const response = await axios.get(url);
        return response.data.map(user => user.login);
    } catch (error) {
        console.error(`Error fetching users from ${url}`);
        return [];
    }
}

const getUsername = async (username) => {
        let user = await User.findOne({ login: username });
        
        if(user){
            return user;
        }
        const response = await axios.get(`https://api.github.com/users/${username}`);
        user = new User(response.data);

        await user.save();
        return user;
}

const getFriends = async (username) => {
    try {
        let user = await User.findOne({  login: username });

        if (!user) {
            throw new Error('User not found in database');
        }

        const followers = await fetchGithubUsers(`https://api.github.com/users/${username}/followers`);

        const following = await fetchGithubUsers(`https://api.github.com/users/${username}/following`);

        const friends = following.filter(followingUsers => followers.includes(followingUsers));

        user.friends = friends;
        await user.save();

        return { friends };

    } catch (error) {
        throw new Error('An error occurred while fetching friends',  error.message)
    }
}

const searchUser = async (username, location) => {

    let query = {};
    if (username) query.login = new RegExp(username, 'i');
    if (location) query.location = new RegExp(location, 'i');

    try {
        let users = await User.find(query);
        return users;
    } catch (error) {
        throw new Error('An error occurred while searching for users');
    }
}

const deleteUser = async (username) => {
    try {
        const user = await User.findOneAndUpdate({ login: username }, {deleted: true}, {new: true});

        if(!user){
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('An error occurred while delete the user:', error.message);
    }    
}

const updateData = async (username, updates) => {
    try {
        const user = await User.findOneAndUpdate({ login: username }, updates, { new: true });
        if(!user){
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error('An error occurred while attempting to update the user');
    }
}

const sortUsers = async (sortBy, order) => {
    if(!sortBy){
        throw new Error('sortBy query parameter is required');
    }

    const sortOrder = order === 'desc' ? -1 : 1;

    try {
        const users = await User.find({ deleted: false}).sort({ [sortBy]: sortOrder });
        return users;
    } catch (error) {
        throw new Error('An error occurred while fetching users')
    }
}


module.exports = {
    getUsername,
    getFriends,
    searchUser,
    deleteUser,
    updateData,
    sortUsers
}