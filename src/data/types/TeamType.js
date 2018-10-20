import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const TeamType = new ObjectType({
  name: 'teamSetStory',
  fields: {
    teamId: { type: StringType },
    name: { type: StringType },
    /**
     * 0: Pure Local team, 1: Pure www team, 2: mixed team
     */
    type: { type: IntType },
    icon: { type: StringType },
    /**
     * team score
     */
    score: { type: FloatType },
    /**
     * team level calc from level config
     */
    level: { type: IntType },
    /**
     * team level title get from level config related
     */
    levelTitle: { type: StringType },
  },
});

export default TeamType;
