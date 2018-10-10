import sequelize from '../sequelize';
import User from './User';
import Team from './Team';
import Membership from './Membership';
import MembershipConfig from './MembershipConfig';
import AuthConfig from './AuthConfig';
import DataSet from './DataSet';
import Project from './Project';
import Sku from './Sku';

/**
 * Team has many user
 */
Team.hasMany(User, { foreignKey: 'teamId', as: 'Workers' });
User.belongsTo(Team, { foreignKey: 'teamId', as: 'Team' });

/**
 * One user has one membership
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
 * Project 1 to many sku
 */
Project.hasMany(Sku, { foreignKey: 'projectId', as: 'Skus' });
Sku.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

User.hasMany(Project, { foreignKey: 'projectId', as: 'Skus' });
Sku.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

Sku.hasMany(Invitation, {
  foreignKey: 'windFieldId',
  as: 'fieldMachines',
  onUpdate: 'cascade',
});
Invitation.belongsTo(Sku, { foreignKey: 'windFieldId', as: 'field' });

Reference.hasMany(Invitation, {
  foreignKey: 'turbineConfigId',
  as: 'turbineConfigTurbine',
  onUpdate: 'cascade',
});
Invitation.belongsTo(Reference, {
  foreignKey: 'turbineConfigId',
  as: 'turbineConfig',
});

Invitation.hasMany(Feedback, {
  foreignKey: 'windMachineId',
  as: 'machineVanes',
  onUpdate: 'cascade',
});
Feedback.belongsTo(Invitation, { foreignKey: 'windMachineId', as: 'machine' });

Feedback.hasMany(Task, {
  foreignKey: 'windVaneId',
  as: 'vaneFanPhotos',
  onUpdate: 'cascade',
});
Task.belongsTo(Feedback, { foreignKey: 'windVaneId', as: 'vane' });

Invitation.hasMany(RoutingInspect, {
  foreignKey: 'windMachineId',
  as: 'machineRoutingInspects',
  onUpdate: 'cascade',
});
RoutingInspect.belongsTo(Invitation, {
  foreignKey: 'windMachineId',
  as: 'machine',
});

RoutingInspect.hasMany(Task, {
  foreignKey: 'routingInspectId',
  as: 'routingInspectsPhotos',
  onUpdate: 'cascade',
});
Task.belongsTo(RoutingInspect, {
  foreignKey: 'routingInspectId',
  as: 'routingInspect',
});

Task.belongsToMany(Photo, {
  through: {
    model: UserLogin,
    unique: false,
  },
  foreignKey: 'fanPhotoId',
  constraints: false,
});
Photo.belongsToMany(Task, {
  through: {
    model: UserLogin,
    unique: false,
  },
  foreignKey: 'defectTypeId',
  constraints: false,
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User };
