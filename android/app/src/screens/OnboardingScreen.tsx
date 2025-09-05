import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useUser } from '../context/UserContext';

const { width, height } = Dimensions.get('window');

interface UserData {
  role: 'poster' | 'doer' | 'both';
  college: string;
  year: string;
  subjects: string[];
  skills: string[];
  interests: string[];
  email: string;
}

export default function OnboardingScreen() {
  const { completeOnboarding } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    role: 'both',
    college: '',
    year: '',
    subjects: [],
    skills: [],
    interests: [],
    email: '',
  });

  const steps = [
    {
      title: "Welcome to College Vyapari!",
      subtitle: "Let's get you started on your hustle journey",
      component: WelcomeStep,
    },
    {
      title: "What brings you here?",
      subtitle: "Choose your primary goal",
      component: RoleSelectionStep,
    },
    {
      title: "Tell us about your college",
      subtitle: "Help us verify your campus",
      component: CollegeInfoStep,
    },
    {
      title: "What are you good at?",
      subtitle: "This helps us match you with relevant tasks",
      component: SkillsStep,
    },
    {
      title: "What subjects interest you?",
      subtitle: "We'll show you tasks in these areas",
      component: SubjectsStep,
    },
    {
      title: "Almost done!",
      subtitle: "Verify your college email",
      component: EmailVerificationStep,
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        await completeOnboarding(userData);
      } catch (error) {
        Alert.alert('Error', 'Failed to complete setup. Please try again.');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / steps.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Step {currentStep + 1} of {steps.length}
          </Text>
        </View>

        {/* Step Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Text style={styles.subtitle}>{steps[currentStep].subtitle}</Text>
          
          <CurrentStepComponent 
            userData={userData}
            updateUserData={updateUserData}
          />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[
              styles.nextButton,
              currentStep === 0 && styles.nextButtonFull
            ]} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Step Components
function WelcomeStep() {
  return (
    <View style={styles.stepContainer}>
      <Image
        source={{ uri: 'https://img.icons8.com/ios-filled/100/4F46E5/school.png' }}
        style={styles.stepIcon}
      />
      <Text style={styles.stepDescription}>
        College Vyapari is your campus marketplace where students help each other 
        with tasks and earn money. Whether you need help with assignments or want 
        to earn by helping others, we've got you covered!
      </Text>
      
      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/24/10B981/checkmark.png' }}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>Secure payments via UPI</Text>
        </View>
        <View style={styles.featureItem}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/24/10B981/checkmark.png' }}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>Verified college students only</Text>
        </View>
        <View style={styles.featureItem}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/24/10B981/checkmark.png' }}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>Rating & review system</Text>
        </View>
      </View>
    </View>
  );
}

function RoleSelectionStep({ userData, updateUserData }: { userData: UserData, updateUserData: (updates: Partial<UserData>) => void }) {
  const roles = [
    {
      id: 'doer',
      title: 'I want to earn money',
      subtitle: 'Help others with tasks and get paid',
      icon: 'https://img.icons8.com/ios-filled/60/F59E0B/money.png',
      color: '#F59E0B',
    },
    {
      id: 'poster',
      title: 'I want to save time',
      subtitle: 'Post tasks and get help from others',
      icon: 'https://img.icons8.com/ios-filled/60/10B981/time.png',
      color: '#10B981',
    },
    {
      id: 'both',
      title: 'I want both',
      subtitle: 'Sometimes I need help, sometimes I help others',
      icon: 'https://img.icons8.com/ios-filled/60/4F46E5/exchange.png',
      color: '#4F46E5',
    },
  ];

  return (
    <View style={styles.stepContainer}>
      {roles.map((role) => (
        <TouchableOpacity
          key={role.id}
          style={[
            styles.roleCard,
            userData.role === role.id && styles.roleCardSelected,
            { borderColor: userData.role === role.id ? role.color : '#E5E7EB' }
          ]}
          onPress={() => updateUserData({ role: role.id as 'poster' | 'doer' | 'both' })}
        >
          <Image source={{ uri: role.icon }} style={styles.roleIcon} />
          <Text style={styles.roleTitle}>{role.title}</Text>
          <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CollegeInfoStep({ userData, updateUserData }: { userData: UserData, updateUserData: (updates: Partial<UserData>) => void }) {
  const colleges = [
    'National Institute of Technology',
    'Indian Institute of Technology',
    'Delhi University',
    'Mumbai University',
    'Bangalore University',
    'Other',
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'PhD'];

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.inputLabel}>Select your college</Text>
      <ScrollView style={styles.collegeList}>
        {colleges.map((college) => (
          <TouchableOpacity
            key={college}
            style={[
              styles.collegeItem,
              userData.college === college && styles.collegeItemSelected
            ]}
            onPress={() => updateUserData({ college })}
          >
            <Text style={[
              styles.collegeText,
              userData.college === college && styles.collegeTextSelected
            ]}>
              {college}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.inputLabel}>What year are you in?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.yearContainer}>
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={[
              styles.yearChip,
              userData.year === year && styles.yearChipSelected
            ]}
            onPress={() => updateUserData({ year })}
          >
            <Text style={[
              styles.yearText,
              userData.year === year && styles.yearTextSelected
            ]}>
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function SkillsStep({ userData, updateUserData }: { userData: UserData, updateUserData: (updates: Partial<UserData>) => void }) {
  const skills = [
    'Programming', 'Mathematics', 'Writing', 'Design', 'Photography',
    'Music', 'Sports', 'Languages', 'Research', 'Presentation',
    'Data Analysis', 'Web Development', 'Mobile Development', 'AI/ML',
    'Digital Marketing', 'Content Creation', 'Video Editing', 'Graphic Design'
  ];

  const toggleSkill = (skill: string) => {
    const updatedSkills = userData.skills.includes(skill)
      ? userData.skills.filter(s => s !== skill)
      : [...userData.skills, skill];
    updateUserData({ skills: updatedSkills });
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.inputLabel}>Select your skills (choose as many as you want)</Text>
      <View style={styles.skillsGrid}>
        {skills.map((skill) => (
          <TouchableOpacity
            key={skill}
            style={[
              styles.skillChip,
              userData.skills.includes(skill) && styles.skillChipSelected
            ]}
            onPress={() => toggleSkill(skill)}
          >
            <Text style={[
              styles.skillText,
              userData.skills.includes(skill) && styles.skillTextSelected
            ]}>
              {skill}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function SubjectsStep({ userData, updateUserData }: { userData: UserData, updateUserData: (updates: Partial<UserData>) => void }) {
  const subjects = [
    'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Economics', 'Business', 'Psychology', 'Literature', 'History',
    'Engineering', 'Medicine', 'Law', 'Architecture', 'Art & Design',
    'Music', 'Sports Science', 'Environmental Science', 'Political Science'
  ];

  const toggleSubject = (subject: string) => {
    const updatedSubjects = userData.subjects.includes(subject)
      ? userData.subjects.filter(s => s !== subject)
      : [...userData.subjects, subject];
    updateUserData({ subjects: updatedSubjects });
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.inputLabel}>What subjects are you interested in?</Text>
      <View style={styles.skillsGrid}>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject}
            style={[
              styles.skillChip,
              userData.subjects.includes(subject) && styles.skillChipSelected
            ]}
            onPress={() => toggleSubject(subject)}
          >
            <Text style={[
              styles.skillText,
              userData.subjects.includes(subject) && styles.skillTextSelected
            ]}>
              {subject}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function EmailVerificationStep({ userData, updateUserData }: { userData: UserData, updateUserData: (updates: Partial<UserData>) => void }) {
  const [email, setEmail] = useState(userData.email);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    updateUserData({ email: text });
  };

  const sendVerificationEmail = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    
    Alert.alert(
      'Verification Email Sent',
      'We\'ve sent a verification link to your email. Please check your inbox and click the link to verify your account.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.inputLabel}>Enter your college email address</Text>
      <TextInput
        style={styles.emailInput}
        placeholder="your.email@college.edu"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TouchableOpacity style={styles.verifyButton} onPress={sendVerificationEmail}>
        <Text style={styles.verifyButtonText}>Send Verification Email</Text>
      </TouchableOpacity>

      <Text style={styles.verificationNote}>
        We'll use this to verify you're a student at your college and send you important updates.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  stepDescription: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  featureList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
  },
  roleCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  roleCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F8FAFF',
  },
  roleIcon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  roleSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  collegeList: {
    maxHeight: 200,
    width: '100%',
    marginBottom: 30,
  },
  collegeItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  collegeItemSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F8FAFF',
  },
  collegeText: {
    fontSize: 16,
    color: '#374151',
  },
  collegeTextSelected: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  yearContainer: {
    marginBottom: 20,
  },
  yearChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  yearChipSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  yearText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  yearTextSelected: {
    color: '#FFFFFF',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: '45%',
  },
  skillChipSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  skillText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  skillTextSelected: {
    color: '#FFFFFF',
  },
  emailInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  verificationNote: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    marginLeft: 20,
  },
  nextButtonFull: {
    marginLeft: 0,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
