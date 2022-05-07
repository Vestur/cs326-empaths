# Database Documentation

We utilized mongodb to construct our database. Below are example implementations of the collection objects our database implements.

### User Collection:
```
{
  id: int, // the user's id number
  username: String, // user's username for logging in
  name: String, // user's real, full, government name
  password: String, // user's password for logging in
  email: String, // user's email (e.g. 'test1@charitable.org')
  bio: String, // user's personalized biography
  pfp: String, // profile picture image link
  location: String, // user's zipcode
  favlist: [String], // list of charity IDs of favorited charities
  likes: [String], //list of charity IDs of liked charities
  reviews: [int], //list of review ids
  donations: [
    { charityName: 'Fake 1', amount: '100', date: '00/00/00' },
    { charityName: 'Fake 2', amount: '100', date: '00/00/00' }
  ] // list of donation objects that hold charity name, amount donated and date
}
```

### Charity Collection:

```
{
    eid: string, // charityId, id associated with a charity
    reviews: [int] // list of review IDs (a charity's reviews from users)
    totalLikes: int // total amount of likes a charity has
}
```

### Review Collection:

```
{
    rid: int, // reviewId, id of a user's review
    uid: int, // userId, user's id number
    chid: String, // charityID, charity's id number
    stars: int, // number of stars a user gave the charity in the review
    text: String // the actual text body of the review written by the user
}
```
The collection objects interact as follows. The user database object holds lists of charities that a particular user has liked and favorited. It simply stores the ids of those charities and uses them to retrieve the actual charity database objects. The user object also stores a list of review IDs, which allows the user to uniquely identify all reviews it has written (since the review ids identify a unique review database object). The charity database object stores information about itself, similar to the user (just less extensive), and a list of review IDs to again uniquely identify any reviews made for that particular charity. The final database object: the Review object stores the userId of the user who made it, the charityId of the charity it was made for and its various personal properties as defined above. In short, the objects are created such that the user can keep track of which charities it has reviewed, liked, and favorited. In addition, the charity has access to all of its reviews. And the reviews have a mapping to the user who made them and the charity they are for. This is useful when displaying information such as favorites and likes for an individual user, as well as reviews for an individual charity.

- - - -

# Division of Labor
* Mathew Han: Search page backend, Likes page backend, Favorites page backend, Utilities. 
* Paarth Tandon: Database Implementation, Authentication/Login/Signup, Profile page backend, Review endpoints, PFP hosting, Donations page backend. 
* Edward Annatone: Likes page backend, Likes CRUD/Database, Favorites page backend, Search page Likes & Favorites, Reviews backend, Code Cleanup, Milestone3 and Final writeup.
* Parsua Atoofi: Sidebar HTML consistent, Donations page backend, Charitable Favicon & HTML, Milestone3 writeup, Final writeup.
