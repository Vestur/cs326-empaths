# 1 A brief and precise representation of APIs for you application
    createCharity - pass in a charity ein (id), add a charity to our database that can be extracted to a charity object.
    getCharity - returns a charity object based on the ein passed in, of the form {eid: num, name: str, address: str, accountability: num, mission: str, current_rating: num, likes: num}
    updateCharity - update the charity object (may not be necessary)
    deleteCharity - remove charity from database (pass in charity id)
    createLike - pass in charity id (add like to charity in database)
    deleteLike - undo a like (reduce number of likes charity has - add functionality to verify user doing the unliking had actually liked it)
    getLikedCharities - gives list of charity objects
    createReview - create a review object (add said review object to user and charity) of the form {  rid: faker.datatype.number(),
                uid: faker.datatype.number(),
                chid: faker.datatype.number(),
                stars: faker.datatype.number(),
                text: faker.lorem.paragraph()},
                {  rid: faker.datatype.number(),
                uid: faker.datatype.number(),
                chid: faker.datatype.number(),
                stars: faker.datatype.number(),
                text: faker.lorem.paragraph()} 
    deleteReview - remove review from user and charity
    getReviews - gives list of review objects for a user
    search - returns list of charity ids (i.e. the result of the search)
    getDonation - return list of donations object (of form {charity_name: faker.company.companyName(), amount: faker.finance.amount(), date: faker.date.recent()}
    createDonation - creates a donation object for a particular user and charity
    deleteDonation - untrack a donation (you can't undo a donation)
    createAccount - creates a user account using username, password, and email at a minimum
    getAccount - returns a user object of the form ({
                id: '1', 
                name: faker.name.firstName() + " " + faker.name.lastName(),
                username: faker.name.firstName(), 
                email: faker.internet.email(), 
                bio: faker.lorem.paragraph(),
                pfp: faker.datatype.string(), 
                location: faker.lorem.paragraph(), 
                favlist: [],
                likes: [],
                reviews: [ review objects],
                donations: []
            })
    updateAccount - update fields in account/user object
    deleteAccount - delete specified user account
    addFavorite - add a charity to a partiular user's favorites list
    removeFavorite - remove a charity from a particular user's favorite's list
    getFavoritedCharities - get a list of favorited charities 
    "/" - sends index.html file
# 2 At least one set of four screenshots of your client interface with descriptions

# 3 The URL of your Heroku Application

# Part 2: Front-end Implementation

<img width="1440" alt="Screen Shot 2022-04-20 at 2 17 56 PM" src="https://user-images.githubusercontent.com/77020125/164296574-4d3a6978-4ca6-4dad-a0f6-35b0e02b83c8.png">

# Part 3: Deployment
