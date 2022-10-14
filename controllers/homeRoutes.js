const router = require('express').Router();
const { SavedCharacters, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const savedCharacterData = await SavedCharacters.findAll({
      include: [
        {
          // Change
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const characters = savedCharacterData.map((character) => character.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('searchByResults', { 
      characters, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET House by id 
    // Name, Title, House Saying

// Get character by id
    // render character, namee, house, culture, aliases, allegiances, & titles
    // Additional information shown in a model: Father, Mother Spouse

// Get Book by ID
    // render the Name, ISDN, Author, # of pages, release date
    // & the POV characters and thir details
router.get('/charecter/:id', async (req, res) => {
  try {
    const savedCharacterData = await SavedCharacters.findByPk(req.params.id, {
      include: [
        {
          // Change
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const character = savedCharacterData.get({ plain: true });

    res.render('searchByResults', {
      ...character,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET & render saved character

// GET & render saved House


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('searchByResults', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('loginPage');
});
router.get('/books', (req, res) => {
  axios.get("https://www.anapioficeandfire.com/api/books")
  .then(response => {
      // now we have the data so we jus tog and bring it to the model
     
      console.log(response.data);
      res.render('book', {bookData: response.data})
  })
})

module.exports = router;

