import dotenv from "dotenv";
import mongoose from "mongoose";

import Perk from "../src/models/Perk.js";
import User from "../src/models/User.js";

const MONGODB_URI = "mongodb://localhost:27017/conhacks";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Perk.deleteMany({});
    console.log("Cleared existing users and perks");

    // Create users
    const newUser = new User({
      email: "newuser@example.com",
      name: "New User",
      password: "password123",
      points: 0,
      profiles: {
        experience: 1,
        goals_assigned: [],
        goals_completed: 0,
        items_available: [],
        items_purchased: [],
        level: 1,
        sign_up_selections: {
          commute_distance: "10-30 km",
          commute_type: "Car",
          garbage_bags_biweekly: "3-5",
          recycle_frequency: "Sometimes"
        },
        streaks: 0
      }
    });

    const experiencedUser = new User({
      email: "experienced@example.com",
      name: "Experienced User",
      password: "password123",
      points: 5000,
      profiles: {
        experience: 80,
        goals_assigned: [],
        goals_completed: 45,
        items_available: [],
        items_purchased: [],
        level: 10,
        sign_up_selections: {
          commute_distance: "0-10 km",
          commute_type: "Bike",
          garbage_bags_biweekly: "0-2",
          recycle_frequency: "Always"
        },
        streaks: 15
      }
    });

    // Save users
    await newUser.save();
    await experiencedUser.save();

    console.log("Users created successfully:");
    console.log("1. New User (Level 1) - Email: newuser@example.com");
    console.log(
      "2. Experienced User (Level 10) - Email: experienced@example.com"
    );
    console.log("Password for both users: password123");

    // Create perks
    const perksData = [
      {
        companyName: "EcoStore",
        description: "10% off on all reusable products",
        image: "https://example.com/images/ecostore.jpg",
        level: 1,
        link: "https://example.com/deals/ecostore"
      },
      {
        companyName: "GreenTransport",
        description: "Free first ride on electric scooters",
        image: "https://example.com/images/greentransport.jpg",
        level: 3,
        link: "https://example.com/deals/greentransport"
      },
      {
        companyName: "SustainableFood",
        description: "15% discount on organic produce",
        image: "https://example.com/images/sustainablefood.jpg",
        level: 5,
        link: "https://example.com/deals/sustainablefood"
      },
      {
        companyName: "EcoFashion",
        description: "20% off on sustainable clothing",
        image: "https://example.com/images/ecofashion.jpg",
        level: 7,
        link: "https://example.com/deals/ecofashion"
      },
      {
        companyName: "RenewableEnergy",
        description: "Free home energy assessment",
        image: "https://example.com/images/renewableenergy.jpg",
        level: 10,
        link: "https://example.com/deals/renewableenergy"
      }
    ];

    // Insert perks
    await Perk.insertMany(perksData);

    console.log(`${perksData.length} perks created successfully`);
    perksData.forEach((perk, index) => {
      console.log(
        `${index + 1}. ${perk.companyName} (Level ${perk.level}) - ${perk.description}`
      );
    });

    console.log("\nDatabase seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seed function
seedDatabase();
