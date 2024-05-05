import mongoose from 'mongoose';
import { Password } from '../services/pasword';

// An interface that describe properties to new user
interface UsersAttrs {
	email: string;
	password: string;
}

// An interface that describe properties that user modal has
interface UsersModal extends mongoose.Model<UsersDocument> {
	build(attrs: UsersAttrs): UsersDocument;
}

// An interface that describe properties that user document has
interface UsersDocument extends mongoose.Document {
	email: string;
	password: string;
}

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
	},
);

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	next();
});

UserSchema.statics.build = (attrs: UsersAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UsersDocument, UsersModal>('User', UserSchema);
const user = User.build({ email: '', password: '' });

export { User };
