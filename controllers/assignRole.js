// assignRole.js

const UserRole = require('../models/UserRole');

async function assignRoleToUser(userId, roleId) {
  try {
    const userRole = await UserRole.create({
      user_id: userId,
      role_id: roleId,
    });
    console.log('Role assigned to user:', userRole);
  } catch (error) {
    console.error('Error assigning role:', error);
  }
}
