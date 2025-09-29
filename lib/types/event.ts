type EventType = {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  created_by: string; // User ID
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export default EventType;
