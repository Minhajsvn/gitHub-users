const { userService } = require('../services')

const getUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userService.getUsername(username);

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching user data'})
    }

    
}

const getFriends = async (req, res) => {
    const { username } = req.params;

    try {
        const friends = await userService.getFriends(username);
        res.status(200).send(friends); 
    } catch (error) {
        res.status(500).send({ error: error.message });
    }


}

const searchUser = async (req, res) => {
    const { username, location } = req.query;

    try {
        const users = await userService.searchUser(username, location);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userService.deleteUser(username);
        res.status(200).send({ message: `User ${username} has been deleted`, user });
    } catch (error) {
        res.status(500).send({ error: error.message});
    }
}

const updateData = async (req, res) => {
    const { username } = req.params;
    const updates = req.body;

    try {
        const user = await userService.updateData(username, updates);
        res.status(200).send({ message: `User ${username} has been updated`, user });
    } catch (error) {
        res.status(500).send({ error: error.message});
    }

}

const sortUsers = async (req, res) => {
    const { sortBy, order = 'asc'} = req.query;

    try {
        const users = await userService.sortUsers(sortBy, order);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message});
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