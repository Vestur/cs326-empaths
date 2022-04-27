import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class CharitableDatabase {
	constructor(dburl) {
		this.dburl = dburl;
	}

	async connect() {
		this.client = await MongoClient.connect(this.dburl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
    	});

	    // Get the database.
	    this.db = this.client.db('charitable');

	    // Init the database.
	    await this.init();
	}

	async close() {
		this.client.close();
	}

	async init() {
		this.userCollection = this.db.collection('users');

		const userCount = await this.userCollection.countDocuments();
		if (userCount === 0) {
			await this.userCollection.insertMany([
				{
					id: 0,
					username: 'Test Subject 1',
					email: 'test1@charitable.org',
					bio: 'I am test subject one. Commmence with your testing.',
					pfp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih0.redbubble.net%2Fimage.193421889.8165%2Fflat%2C1000x1000%2C075%2Cf.jpg&f=1&nofb=1',
					location: '00000',
					favlist: ['000000030', '000000144'],
					likes: ['000000030', '000000144', '000000147'],
					reviews: [0],
					donations: [
						{ charityName: 'Fake 1', amount: '100', date: '00/00/00' },
						{ charityName: 'Fake 2', amount: '100', date: '00/00/00' }
					]
				},
				{
					id: 1,
					username: 'Test Subject 2',
					email: 'test2@charitable.org',
					bio: 'I am test subject two. Commmence with your testing.',
					pfp: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnecaonline.com%2Fwp-content%2Fuploads%2F2013%2F06%2F1300h-PBody.jpg&f=1&nofb=1',
					location: '00000',
					favlist: ['000000030', '000000147'],
					likes: ['000000147', '000000144'],
					reviews: [1, 2],
					donations: [
						{ charityName: 'Fake 2', amount: '100', date: '00/00/00' },
						{ charityName: 'Fake 3', amount: '100', date: '00/00/00' }
					]
				}
			]);
		}

		this.reviewCollection = this.db.collection('reviews');

		const reviewCount = await this.reviewCollection.countDocuments();
		if (reviewCount === 0) {
			await this.reviewCollection.insertMany([
				{
					rid: 0,
					uid: 0,
					chid: '000000144',
					stars: 3,
					text: 'Banana Slicer Saved My Life: What can I say about the 571B Banana Slicer that hasn’t already been said about the wheel, penicillin, or the iPhone…. this is one of the greatest inventions of all time. My husband and I would argue constantly over who had to cut the day’s banana slices. It’s one of those chores NO ONE wants to do! You know, the old ‘I spent the entire day rearing OUR children, maybe YOU can pitch in a little and cut these bananas?’ Then there’s, ‘You think I have the energy to slave over your damn bananas? I worked a 12-hour shift just to come home to THIS?!’ These are the things that can destroy an entire relationship. It got to the point where our children could sense the tension. The minute I heard our six-year-old girl in her bedroom, re-enacting our daily banana fight with her Barbie dolls, I knew we had to make a change. That’s when I found the 571B Banana Slicer. Our marriage has never been healthier.'
				},
				{
					rid: 1,
					uid: 1,
					chid: '000000030',
					stars: 1,
					text: 'One star is too much for this product. I don’t know if this is a scam or if mine was broken, but it doesn’t work and I am still getting abducted by UFOs on a regular basis. Maybe the battery’s dead? I’m literally inside of a UFO right now, and the thing’s just sitting there.'
				},
				{
					rid: 2,
					uid: 1,
					chid: '000000147',
					stars: 5,
					text: 'DO IT, just DO IT! Don’t let your dreams be dreams. Yesterday, you said tomorrow. So just. DO IT! Make. your dreams. COME TRUE! Just… do it! Some people dream of success, while you’re gonna wake up and work HARD at it! NOTHING IS IMPOSSIBLE!You should get to the point where anyone else would quit, and you’re not gonna stop there. NO! What are you waiting for? … DO IT! Just… DO IT! Yes you can! Just do it! If you’re tired of starting over, stop. giving. up.'
				}
			]);
		}

		this.charityCollection = this.db.collection('charities');

		const charityCount = await this.charityCollection.countDocuments();
		if (charityCount === 0) {
			await this.charityCollection.insertMany([
				{
					eid: '000000030',
					reviews: [1],
					totalLikes: 1
				},
				{
					eid: '000000144',
					reviews: [0],
					totalLikes: 2
				},
				{
					eid: '000000147',
					reviews: [2],
					totalLikes: 2
				}
			]);
		}
	}

	async createUser(username, email, bio, pfp, location) {
		try {
			const idObj = await this.userCollection.find().sort({ "id": -1 }).limit(1).toArray();
			const id = idObj[0]['id'] + 1;

			const usrObj = {
				id: id,
				username: username,
				email: email,
				bio: bio,
				pfp: pfp,
				location: location,
				favlist: [],
				likes: [],
				reviews: [],
				donations: []
			};

			const res = await this.userCollection.insertOne(usrObj);
			return res;
		} catch(err) {
			return err;
		}
	}

	async readUser(id) {
		try {
			const res = await this.userCollection.findOne({ id: id });
			return res;
		} catch(err) {
			return err;
		}
	}

	async updateUser(id, changes) {
		try {
			const res = await this.userCollection.updateOne({ id: id }, { $set: changes });
			return res;
		} catch(err) {
			return err;
		}
	}

	async deleteUser(id) {
		try {
			const res = await this.userCollection.deleteOne({ id: id });
			return res;
		} catch(err) {
			return err;
		}
	}

	async createFavorite(userId, charityId) {
		try {
			const res = await this.userCollection.updateOne({ id: userId }, { $push: { favlist: charityId }});
			return res;
		} catch(err) {
			return err;
		}
	}

	async deleteFavorite(userId, charityId) {
		try {
			const res = await this.userCollection.updateOne({ id: userId }, { $pull: { favlist: charityId }});
			return res;
		} catch(err) {
			return err;
		}
	}

	async createLike(userId, charityId) {
		try {
			await this.userCollection.updateOne({ id: userId }, { $push: { likes: charityId }});
			const res = await this.charityCollection.updateOne({ eid: charityId }, { $inc: { totalLikes: 1 }});
			return res;
		} catch(err) {
			return err;
		}
	}

	async deleteLike(userId, charityId) {
		try {
			await this.userCollection.updateOne({ id: userId }, { $pull: { likes: charityId }});
			const res = await this.charityCollection.updateOne({ eid: charityId }, { $inc: { totalLikes: -1 }});
			return res;
		} catch(err) {
			return err;
		}
	}

	async createReview(userId, charityId, stars, text) {
		try {
			const idObj = await this.reviewCollection.find().sort({ "rid": -1 }).limit(1).toArray();
			const id = idObj[0]['rid'] + 1;

			await this.userCollection.updateOne({ id: userId }, { $push: { reviews: id }});
			await this.charityCollection.updateOne({ eid: charityId }, { $push: { reviews: id }});
			const res = await this.reviewCollection.insertOne({ rid: id, uid: userId, chid: charityId, stars: stars, text: text });
			return res;
		} catch(err) {
			return err;
		}
	}

	async updateReview(reviewId, stars, text) {
		try {
			const res = await this.reviewCollection.updateOne({ rid: reviewId }, { $set: { stars: stars, text: text } });
			return res;
		} catch(err) {
			return err;
		}
	}

	async deleteReview(reviewId) {
		try {
			await this.userCollection.updateMany({}, { $pull: { reviews: reviewId } });
			await this.charityCollection.updateMany({}, { $pull: { reviews: reviewId } });
			const res = await this.reviewCollection.deleteOne({ rid: reviewId });
			return res;
		} catch(err) {
			return err;
		}
	}
}
