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
import UserLogin from './UserLogin';
import Task from './Task';
import UserTeams from './UserTeams';
import Photo from './Photo';
import TaskPhotos from './TaskPhotos';
import Label from './Label';
import Activity from './Activity';
import Feedback from './Feedback';
import Reply from './Reply';
import Message from './Message';

/**
 * Team N to N user
 */
Team.belongsToMany(User, {through: UserTeams});
User.belongsToMany(Team, {through: UserTeams});

/**
 *  User 1 to 1 membership
 */
Membership.belongsTo(User, {foreignKey: 'userId'});

/**
 * User N to N projects
 */
User.belongsToMany(Project, {through: UserProjects});
Project.belongsToMany(User, {through: UserProjects});

/**
 * User 1 to N invitation
 */
User.hasMany(Invitation, {foreignKey: 'userId', as: 'Invitations'});
Invitation.belongsTo(User, {foreignKey: 'userId', as: 'User'});

/**
 * User 1 to N feedback
 */
User.hasMany(Feedback, {foreignKey: 'userId', as: 'Feedback'});
Feedback.belongsTo(User, {foreignKey: 'userId', as: 'User'});

/**
 * User 1 to N user login record
 */
User.hasMany(UserLogin, {foreignKey: 'userId', as: 'LoginRecord'});
UserLogin.belongsTo(User, {foreignKey: 'userId', as: 'User'});

/**
 * User 1 to N messages
 */
User.hasMany(Message, {foreignKey: 'userId', as: 'Messages'});
Message.belongsTo(User, {foreignKey: 'userId', as: 'User'});

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
 * Project 1 to N sku
 */
Project.hasMany(Sku, {foreignKey: 'projectId', as: 'Skus'});
Sku.belongsTo(Project, {foreignKey: 'projectId', as: 'Project'});

/**
 * Feedback 1 to N reply
 */
Feedback.hasMany(Reply, {foreignKey: 'feedbackId', as: 'Replies'});
Reply.belongsTo(Feedback, {foreignKey: 'feedbackId', as: 'Feedback'});

/**
 * Project 1 to N tasks
 */
Project.hasMany(Task, {foreignKey: 'projectId', as: 'Tasks'});
Task.belongsTo(Project, {foreignKey: 'projectId', as: 'Project'});

/**
 * Project 1 to N Datasets
 */
Project.hasMany(DataSet, {foreignKey: 'projectId', as: 'DataSets'});
DataSet.belongsTo(Project, {foreignKey: 'projectId', as: 'Project'});

/**
 * Task N to N Photos
 */
Task.belongsToMany(Photo, {through: TaskPhotos});
Photo.belongsToMany(Task, {through: TaskPhotos});

/**
 * Sku 1 to N reference
 */
Sku.hasMany(Reference, {foreignKey: 'skuId', as: 'References'});
Reference.belongsTo(Sku, {foreignKey: 'skuId', as: 'Sku'});

/**
 * Photo 1 to N labels
 */
Photo.hasMany(Label, {foreignKey: 'photoId', as: 'Labels'});
Label.belongsTo(Photo, {foreignKey: 'photoId', as: 'Photo'});

/**
 *  Label 1 to 1 Sku
 */
Label.belongsTo(Sku, {foreignKey: 'skuId'});

/**
 * Photo 1 to N Activity
 */
Photo.hasMany(Activity, {foreignKey: 'photoId', as: 'Activities'});
Activity.belongsTo(Photo, {foreignKey: 'photoId', as: 'Photo'});

function sync(...args) {
    return sequelize.sync(...args);
}

export default {sync};
export {User};
