# College Vyapari 🎓💰
<img src="./android/app/src/assets/logo.jpeg" alt="logo" width="600" height="300" />

**"Where students meet hustles*"* - A campus marketplace for students to find and complete tasks while earning money

[![React Native](https://img.shields.io/badge/React%20Native-0.80.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Overview

College Vyapari is a React Native application that creates a trusted marketplace within college campuses where students can:

- **Find hustles** - Discover tasks and opportunities to earn money
- **Post tasks** - Get help with assignments, projects, and other academic work
- **Build trust** - Through verified profiles, ratings, and reviews
- **Earn securely** - With integrated UPI payments and wallet system
- **Compete & grow** - Through leaderboards, achievements, and gamification

## 🚀 Key Features

### ✅ **Implemented Features**

#### 1. **User Onboarding & Authentication**
- **6-step onboarding flow** with role selection (Task Poster vs Task Doer vs Both)
- **College verification** with email validation
- **Skills and subjects selection** for better task matching
- **Modern login system** with secure authentication

#### 2. **Trust & Rating System**
- **Comprehensive review system** with 5-star ratings and detailed comments
- **Task completion workflow** with proof submission
- **User rating cards** showing credibility and performance metrics
- **Completion proof system** with photo/file upload options

#### 3. **Gamification & Engagement**
- **Multi-category leaderboards** (Overall, Weekly, Monthly, Top Helpers, Top Earners)
- **Points system** with levels and achievements
- **Achievement badges** and progress tracking
- **Rank changes** and performance indicators

#### 4. **Payment Integration**
- **Complete UPI payment system** with multiple payment methods
- **Wallet management** with transaction history
- **Secure payment flow** with encryption and fraud protection
- **Transaction tracking** and status management

#### 5. **Task Management**
- **Task posting** with categories, priorities, and requirements
- **Task browsing** with search and filtering
- **Task status tracking** (Open, In Progress, Completed, etc.)
- **Response system** for task applications

### 🔄 **Pending Features**
- **Reporting System** - Admin panel and user reporting for spam/misuse prevention
- **Smart Task Matching** - Algorithm-based matching using skills and preferences
- **Enhanced College Verification** - Advanced email verification and campus-specific features

## 🏗️ Technical Architecture

### **Tech Stack**
- **Frontend**: React Native 0.80.0
- **Language**: TypeScript 5.8.3
- **Navigation**: React Navigation 7.x
- **State Management**: React Context API
- **UI Components**: Custom components with modern design

### **Project Structure**
```
collegeVyapari/
├── android/
│   └── app/
│       └── src/
│           ├── components/          # Reusable UI components
│           ├── context/            # State management (UserContext)
│           ├── navigation/         # App navigation setup
│           ├── screens/           # All app screens
│           ├── types/             # TypeScript type definitions
│           └── utils/             # Utility functions
├── ios/                           # iOS-specific files
├── App.tsx                        # Main app entry point
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

### **Key Components**

#### **Screens**
- `OnboardingScreen` - 6-step user setup and role selection
- `LoginScreen` - Enhanced authentication with modern UI
- `HomeScreen` - Task browsing and discovery
- `MyTasksScreen` - User's posted and assigned tasks
- `PostTaskScreen` - Task creation and posting
- `ReviewScreen` - Rating and review system
- `TaskCompletionScreen` - Task completion workflow
- `LeaderboardScreen` - Gamification and rankings
- `PaymentScreen` - UPI payment integration
- `WalletScreen` - Wallet and transaction management
- `ProfileScreen` - User profile and statistics

#### **Components**
- `UserRatingCard` - Reusable user rating display
- `Button` - Custom button component
- `Input` - Custom input component
- `TaskCard` - Task display component

#### **Context & State**
- `UserContext` - Centralized user state management
- `ThemeContext` - Theme and styling management

## 📱 Screenshots & Features

### **Onboarding Flow**
- Welcome screen with app introduction
- Role selection (Earn Money vs Save Time vs Both)
- College and year selection
- Skills and subjects selection
- Email verification

### **Task Management**
- Browse tasks by category (Academic, Assignment, Notes, Practical, Delivery, Events)
- Search and filter functionality
- Task details with requirements and budget
- Application and response system

### **Payment System**
- UPI integration with popular apps (Google Pay, PhonePe, Paytm, BHIM)
- Wallet management with transaction history
- Secure payment processing
- Multiple payment methods

### **Gamification**
- Leaderboards with multiple categories
- Points and level system
- Achievement badges
- Performance tracking

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js >= 20
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/collegeVyapari.git
   cd collegeVyapari
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (if developing for iOS)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npx react-native start
   ```

5. **Run the app**
   ```bash
   # For Android
   npx react-native run-android
   
   # For iOS
   npx react-native run-ios
   ```

### **Environment Setup**

Make sure your development environment is properly configured:

- **Android**: Ensure Android SDK path is correct in `android/local.properties`
- **iOS**: Ensure CocoaPods dependencies are installed
- **Metro**: If you see port errors, kill the process using `fuser -k 8081/tcp`

## 🎯 Core User Flows

### **For Task Doers (Earners)**
1. Complete onboarding with skills selection
2. Browse available tasks matching their skills
3. Apply for tasks with proposals
4. Complete assigned tasks with proof
5. Receive payments and build rating
6. Climb leaderboards and unlock achievements

### **For Task Posters (Time Savers)**
1. Complete onboarding with needs assessment
2. Post detailed task requirements
3. Review applications and select helpers
4. Monitor task progress
5. Review completed work and rate helpers
6. Make secure payments

### **For Both Roles**
1. Manage wallet and transaction history
2. Track performance and achievements
3. Build reputation through reviews
4. Participate in campus leaderboards

## 🔒 Security & Trust Features

- **College Email Verification** - Only verified students can participate
- **Rating & Review System** - Build trust through peer reviews
- **Completion Proof** - Require evidence of completed work
- **Secure Payments** - UPI integration with fraud protection
- **Report System** - Report spam and misuse (coming soon)

## 🎮 Gamification Elements

- **Points System** - Earn points for completed tasks and good ratings
- **Levels** - Progress through levels based on performance
- **Achievements** - Unlock badges for milestones
- **Leaderboards** - Compete with peers across multiple categories
- **Streaks** - Maintain consistent performance

## 💰 Payment Features

- **UPI Integration** - Support for all major UPI apps
- **Wallet System** - Manage balance and transactions
- **Secure Processing** - Bank-level encryption
- **Transaction History** - Complete payment tracking
- **Multiple Methods** - UPI, wallet, and card options

## 🚀 Future Roadmap

### **Phase 2 Features**
- [ ] **Smart Task Matching** - AI-powered task recommendations
- [ ] **Advanced Reporting** - Admin panel and moderation tools
- [ ] **Enhanced Verification** - Document verification and campus integration
- [ ] **Push Notifications** - Real-time updates and alerts
- [ ] **Offline Support** - Work without internet connection

### **Phase 3 Features**
- [ ] **Multi-language Support** - Support for regional languages
- [ ] **Advanced Analytics** - Performance insights and trends
- [ ] **Social Features** - Study groups and collaboration tools
- [ ] **API Integration** - Third-party service integrations
- [ ] **Web Dashboard** - Web-based admin and analytics panel

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Your Name]
- **UI/UX Design**: [Designer Name]
- **Backend Integration**: [Backend Developer Name]

## 📞 Support

- **Email**: support@collegevyapari.com
- **Discord**: [Join our community](https://discord.gg/collegevyapari)
- **Issues**: [GitHub Issues](https://github.com/yourusername/collegeVyapari/issues)

## 🙏 Acknowledgments

- React Native community for the amazing framework
- All contributors who helped build this project
- College students who provided feedback and suggestions

---

**Made with ❤️ for students, by students**

*College Vyapari - Where every student can find their hustle and build their future!*