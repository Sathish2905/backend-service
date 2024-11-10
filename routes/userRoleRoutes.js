// routes/userRoleRoutes.js

const express = require('express');
const router = express.Router();
const UserRole = require('../models/UserRole');
const User = require('../models/user');
const Role = require('../models/role');


// Route to assign a role to a user
router.post('/userrole/assign', async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        const user = await User.findByPk(userId);
        const role = await Role.findByPk(roleId);

        if (!user || !role) {
            return res.status(404).json({ message: 'User or Role not found' });
        }

        await UserRole.create({ user_id: userId, role_id: roleId });
        res.status(200).json({ message: 'Role assigned to user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning role to user' });
    }
});

// Route to remove a role from a user
router.delete('/userrole/remove', async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        const userRole = await UserRole.findOne({
            where: {
                user_id: userId,
                role_id: roleId,
            },
        });

        if (!userRole) {
            return res.status(404).json({ message: 'User role relationship not found' });
        }

        await userRole.destroy();
        res.status(200).json({ message: 'Role removed from user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing role from user' });
    }
});

// Route to get all roles of a user
router.get('/userrole/roles/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Role,
                    as: 'roles',
                    through: { attributes: [] }, // Exclude UserRole fields
                },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ roles: user.roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user roles' });
    }
});

// Route to get all users with a specific role
router.get('/userrole/users/:roleId', async (req, res) => {
    const { roleId } = req.params;

    try {
        const role = await Role.findByPk(roleId, {
            include: [
                {
                    model: User,
                    as: 'users',
                    through: { attributes: [] }, // Exclude UserRole fields
                },
            ],
        });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ users: role.users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users with role' });
    }
});

module.exports = router;
