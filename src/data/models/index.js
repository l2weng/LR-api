import sequelize from '../sequelize';
import User from './User';
import Team from './Team';
import Membership from './Membership';
import MembershipConfig from './MembershipConfig';
import AuthConfig from './AuthConfig';
import DataSet from './DataSet';
import Project from './Project';
import Sku from './Sku';
import UserProjects from './UserProjects';
import Invitation from './Invitation';
import Reference from './Reference';

/**
 * Team N to N user
 */
Team.hasMany(User, { foreignKey: 'teamId', as: 'Workers' });
User.belongsTo(Team, { foreignKey: 'teamId', as: 'Team' });

/**
 *  User 1 to 1 membership
 */
Membership.belongsTo(User, { foreignKey: 'userId' });

/**
 * MembershipConfig has many auth details config
 */
MembershipConfig.hasMany(AuthConfig, {
  foreignKey: 'membershipConfigId',
  as: 'MembershipAuth',
});
AuthConfig.belongsTo(MembershipConfig, {
  foreignKey: 'membershipConfigId',
  as: 'MembershipConfig',
});

/**
 * DataSet 1 to 1 project
 */
DataSet.belongsTo(Project, { foreignKey: 'projectId' });

/**
 * Project 1 to N sku
 */
Project.hasMany(Sku, { foreignKey: 'projectId', as: 'Skus' });
Sku.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

/**
 * Sku 1 to N reference
 */
Sku.hasMany(Reference, { foreignKey: 'skuId', as: 'References' });
Reference.belongsTo(Sku, { foreignKey: 'skuId', as: 'Sku' });

/**
 * User N to N projects
 */
User.belongsToMany(Project, { through: UserProjects });
Project.belongsToMany(User, { through: UserProjects });

/**
 * User 1 to N invitation
 */
User.hasMany(Invitation, { foreignKey: 'userId', as: 'Invitations' });
Invitation.belongsTo(User, { foreignKey: 'userId', as: 'User' });

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User };
