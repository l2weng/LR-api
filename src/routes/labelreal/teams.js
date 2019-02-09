import Team from '../../data/models/Team';
import User from '../../data/models/User';
import { resBuild, generateColor, resErrorBuild } from '../../data/dataUtils';
import express from 'express';

const router = express.Router();

router.post('/create', (req, res) => {
  const teamObj = { avatarColor: generateColor(), ...req.body };
  Team.create(teamObj)
    .then(team => {
      User.findByPk(req.body.userId).then(user => {
        user.addTeam(team, { through: { isOwner: true } });
        res.json(resBuild(team));
      });
    })
    .catch(err => {
      resErrorBuild(res, 500, err);
    });
});

export default router;
