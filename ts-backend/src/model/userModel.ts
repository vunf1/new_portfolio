import { Schema, model, Document, CallbackError } from 'mongoose';
import { hashPassword } from '../middleware/bcrypt';

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error as CallbackError);
  }     
});

const User = model<IUser>('User', userSchema);

export default User;
