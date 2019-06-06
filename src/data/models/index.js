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
import UserTasks from './UserTasks';
import Invitation from './Invitation';
import Reference from './Reference';
import UserLogin from './UserLogin';
import Task from './Task';
import UserTeams from './UserTeams';
import UserContacts from './UserContacts'
import Photo from './Photo';
import TaskPhotos from './TaskPhotos';
import SkuProjects from './SkuProjects';
import Label from './Label';
import Activity from './Activity';
import Feedback from './Feedback';
import Reply from './Reply';
import Message from './Message';
import FilterQuestion from './FilterQuestion';
import LabelQuestion from './LabelQuestion';
import QuestionClassification from './QuestionClassification';
import QuestionItem from './QuestionItem';
import Company from './Company'

/**
 * Team N to N user
 */
Team.belongsToMany(User, { through: UserTeams });
User.belongsToMany(Team, { through: UserTeams });

/**
 * User N to N user
 */
User.belongsToMany(User, { as: 'contacts', foreignKey: 'userId', through: UserContacts });
User.belongsToMany(User, { as: 'users', foreignKey: 'contactId', through: UserContacts });

/**
 *  User 1 to 1 membership
 */
Membership.belongsTo(User, { foreignKey: 'userId' });
User.belongsTo(Company,{foreignKey:'companyId'})

/**
 * User N to N projects
 */
User.belongsToMany(Project, { as: 'projects', foreignKey: 'userId',through: UserProjects });
Project.belongsToMany(User, { as: 'users', foreignKey:'projectId', through: UserProjects });

/**
 * User N to N tasks (task assign)
 */
User.belongsToMany(Task, { as: 'tasks', foreignKey: 'userId',through: UserTasks });
Task.belongsToMany(User, { as: 'users', foreignKey:'taskId', through: UserTasks });

/**
 * User 1: N Task (task owner)
 */
User.hasMany(Task, { as: 'myTasks', foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'Owner' });

/**
 * User 1: N Photo (photo owner)
 */
User.hasMany(Photo, { as: 'myPhotos', foreignKey: 'userId' });
Photo.belongsTo(User, { foreignKey: 'userId', as: 'Owner' });

/**
 * User 1 to N invitation
 */
User.hasMany(Invitation, { foreignKey: 'userId', as: 'Invitations' });
Invitation.belongsTo(User, { foreignKey: 'userId', as: 'User' });

/**
 * User 1 to N feedback
 */
User.hasMany(Feedback, { foreignKey: 'userId', as: 'Feedback' });
Feedback.belongsTo(User, { foreignKey: 'userId', as: 'User' });

/**
 * User 1 to N user login record
 */
User.hasMany(UserLogin, { foreignKey: 'userId', as: 'loginRecords' });
UserLogin.belongsTo(User, { foreignKey: 'userId', as: 'User' });

/**
 * User 1 to N messages
 */
User.hasMany(Message, { foreignKey: 'userId', as: 'Messages' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'User' });

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
 * Feedback 1 to N reply
 */
Feedback.hasMany(Reply, { foreignKey: 'feedbackId', as: 'Replies' });
Reply.belongsTo(Feedback, { foreignKey: 'feedbackId', as: 'Feedback' });

/**
 * Project 1 to N tasks
 */
Project.hasMany(Task, { foreignKey: 'projectId', as: 'Tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

/**
 * User 1 to N skus
 */
User.hasMany(Sku, { foreignKey: 'userId', as: 'Skus' });
Sku.belongsTo(User, { foreignKey: 'userId', as: 'User' });

/**
 * Project 1 to N FilterQuestions
 */
Project.hasMany(FilterQuestion, {
  foreignKey: 'projectId',
  as: 'FilterQuestions',
});
FilterQuestion.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

/**
 * Project 1 to N LabelQuestions
 */
Project.hasMany(LabelQuestion, {
  foreignKey: 'projectId',
  as: 'LabelQuestions',
});
LabelQuestion.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

/**
 * LabelQuestion 1 to N Question item
 */
LabelQuestion.hasMany(QuestionItem, {
  foreignKey: 'LabelQuestionId',
  as: 'QuestionItems',
});
QuestionItem.belongsTo(LabelQuestion, {
  foreignKey: 'LabelQuestionId',
  as: 'LabelQuestion',
});

/**
 * QuestionItem 1 to N Sku
 */
QuestionItem.hasMany(Sku, { foreignKey: 'questionItemId', as: 'Skus' });
Sku.belongsTo(QuestionItem, {
  foreignKey: 'questionItemId',
  as: 'QuestionItem',
});

/**
 * Project 1 to N QuestionClassification
 */
Project.hasMany(QuestionClassification, {
  foreignKey: 'projectId',
  as: 'QuestionClassifications',
});
QuestionClassification.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'Project',
});

/**
 * Project 1 to N DataSets
 */
Project.hasMany(DataSet, { foreignKey: 'projectId', as: 'DataSets' });
DataSet.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

/**
 * Filter Question 1 to N Reference
 */
FilterQuestion.hasMany(Reference, {
  foreignKey: 'filterQuestionId',
  as: 'References',
});
Reference.belongsTo(FilterQuestion, {
  foreignKey: 'filterQuestionId',
  as: 'FilterQuestion',
});

/**
 * Task N to N Photos
 */
Task.belongsToMany(Photo, { foreignKey: 'taskId', through: TaskPhotos });
Photo.belongsToMany(Task, { foreignKey: 'photoId', through: TaskPhotos });

/**
 * Project N to N Skus
 */
Sku.belongsToMany(Project, { foreignKey: 'skuId', through: SkuProjects });
Project.belongsToMany(Sku, { foreignKey: 'projectId', through: SkuProjects });

/**
 * Sku 1 to N reference
 */
Sku.hasMany(Reference, { foreignKey: 'skuId', as: 'References' });
Reference.belongsTo(Sku, { foreignKey: 'skuId', as: 'Sku' });

/**
 * Photo 1 to N labels
 */
Photo.hasMany(Label, { foreignKey: 'photoId', as: 'Labels' });
Label.belongsTo(Photo, { foreignKey: 'photoId', as: 'Photo' });

/**
 *  Label 1 to 1 Sku
 */
Label.belongsTo(Sku, { foreignKey: 'skuId' });

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User };
