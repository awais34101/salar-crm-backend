import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g. "general", "theme"
  key: { type: String, required: true, unique: true }, // e.g. "company_name"
  value: mongoose.Schema.Types.Mixed // value can be string, number, object
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
