const Teams = require('./../models/Teams');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

// const teams = [{
//   teamType: 'Dota 2',
//   teamLogo: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654196384270logo_dota2.png?alt=media&token=66fa5c49-a5ef-49c7-b9a3-089cd67902bc',
//   backgroundCover: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654196577277background_dota2_alt.jpg?alt=media&token=61b360ff-abec-4682-8762-393c2b22c4c4',
//   players: [{
//     name: 'Dryer',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: `He's called dryer cuz he washes his hair everyday and his room is filled with dryer noises`,
//     currentTeam: 'Dota 2',
//     age: 32,
//     country: 'Indonesia',
//     twitterLink: '-',
//     twitterName: '-'
//   },
//   {
//     name: 'Pan',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: ` Obviously he likes pancake`,
//     currentTeam: 'Dota 2',
//     age: 27,
//     country: 'Philippeans',
//     twitterLink: '-',
//     twitterName: '-'
//   },
//   {
//     name: 'Trouxy',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: `He got his name Trouxy because he always wear trousers`,
//     currentTeam: 'Dota 2',
//     age: 21,
//     country: 'Malaysia',
//     twitterLink: '-',
//     twitterName: '-'
//   }, {
//     name: 'Morbius',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: `Like his name he has the fastest hands, and response and sense danger very quick.`,
//     currentTeam: 'Dota 2',
//     age: 23,
//     country: 'Paskitan',
//     twitterLink: '-',
//     twitterName: '-'
//   },
//   {
//     name: 'Flag',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: `You know why he's called "Flag"? cuz he's the captain`,
//     currentTeam: 'Dota 2',
//     age: 20,
//     country: 'Singapore',
//     twitterLink: '-',
//     twitterName: '-'
//   },
//   {
//     name: 'Heshe',
//     type: 'COACH',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: `Listen to Heshe, win DOTA. Our TI-winning coach is one of the
//     brightest minds in all of DOTA, and one of the original founders
//     of caveman doto, also known as the best doto. Although we have a
//     lineup that doesn't need to just "run it down" to win, sometimes
//     the simplest path is the best path to victory.`,
//     currentTeam: 'Dota 2',
//     age: 35,
//     country: 'South Korea',
//     twitterLink: '-',
//     twitterName: '-'
//   },]
// }, {
//   teamType: 'PUBG-M',
//   teamLogo: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654196311990logo_pubgm.png?alt=media&token=ab6f1849-72aa-4516-834f-178cdd01dacf',
//   backgroundCover: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654196687841background_pubg.jpg?alt=media&token=c3d86c94-0f43-4bb5-bc58-1afbaf6d04d6',
//   players: [{
//     name: 'Yokki',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: ``,
//     currentTeam: 'PUBG-M',
//     age: 22,
//     country: 'Singapore',
//     twitterLink: '-',
//     twitterName: '-'
//   },
//   {
//     name: 'NPX',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: ` Obviously he likes pancake`,
//     currentTeam: 'PUBG-M',
//     age: 21,
//     country: 'Philippeans',
//     twitterLink: '-',
//     twitterName: '-'
//   },
//   {
//     name: 'ATOM',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: `He got his name Trouxy because he always wear trousers`,
//     currentTeam: 'PUBG-M',
//     age: 17,
//     country: 'Malaysia',
//     twitterLink: '-',
//     twitterName: '-'
//   }, {
//     name: 'Zoro',
//     type: 'PLAYER',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: ``,
//     currentTeam: 'PUBG-M',
//     age: 20,
//     country: 'Singapore',
//     twitterLink: '-',
//     twitterName: '-'
//   },
//   {
//     name: 'Flammingo',
//     type: 'ANALYST',
//     image: 'https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654200991397My%20project.png?alt=media&token=863c57ef-f4f4-41ce-b15a-5b54306cc26c',
//     desc: `Unlike someother captains, he flames too much on his teammates and other team players`,
//     currentTeam: 'PUBG-M',
//     age: 25,
//     country: 'Malaysia',
//     twitterLink: '-',
//     twitterName: '-'
//   },]
// }]

// router.get('/', async (req, res) => {
//   await Teams.deleteMany({});
//   const createdTeams = await Teams.insertMany(teams);
//   res.send({  createdTeams });
// });
//Post
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newTeams = new Teams(req.body);

  try {
    const savedTeams = await newTeams.save();
    res.status(201).json(savedTeams);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedTeams = await Teams.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTeams);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Teams.findByIdAndDelete(req.params.id);
    res.status(204).json('Teams article has been deleted...');
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET Teams
router.get('/find/:id', async (req, res) => {
  try {
    const teams = await Teams.findById(req.params.id);
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Teams
router.get('/', async (req, res) => {
  try {
    const teams = await Teams.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
