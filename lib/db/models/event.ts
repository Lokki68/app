import EventType from "@/lib/types/event";
import mongoose from "mongoose";
import slugify from "slugify";

const eventSchema = new mongoose.Schema<EventType>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: { type: String, required: true },
    active: { type: Boolean, default: true },
    // created_by: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

eventSchema.pre("save", async function (next) {
  if (!this.slug) {
    let slugCandidate = slugify(this.title, { lower: true, strict: true });

    let slugExists = await mongoose.models.Event.findOne({
      slug: slugCandidate,
    });

    let suffix = 1;
    while (slugExists) {
      slugCandidate = `${slugCandidate}-${suffix}`;
      slugExists = await mongoose.models.Event.findOne({ slug: slugCandidate });
      suffix++;
    }

    this.slug = slugCandidate;
  }

  next();
});

export const Event =
  mongoose.models?.Event || mongoose.model("Event", eventSchema);
