import { Language } from '../types';

// This is a mock implementation. In production, this would fetch from your API
export const loadTranslations = async (language: Language): Promise<Record<string, string>> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const translations = {
    en: {
      // Common
      'app.name': 'Jan Samarth',
      'app.description': 'National Platform for Government Schemes',
      
      // Navigation
      'nav.home': 'Home',
      'nav.schemes': 'Explore Schemes',
      'nav.eligibility': 'Check Eligibility',
      'nav.dashboard': 'Dashboard',
      'nav.login': 'Login',
      'nav.register': 'Register',
      
      // Landing Page
      'landing.hero.title': 'One Nation, One Platform for All Government Schemes',
      'landing.hero.subtitle': 'Access and apply for various government schemes through a single platform',
      'landing.search.placeholder': 'Search for schemes, benefits, or categories...',
      'landing.featured.title': 'Featured Schemes',
      'landing.categories.title': 'Browse by Category',
      'landing.how.title': 'How It Works',
      'landing.benefits.title': 'Why Use Our Portal',
      
      // Categories
      'category.all': 'All Schemes',
      'category.students': 'Students',
      'category.farmers': 'Farmers',
      'category.women': 'Women',
      'category.seniors': 'Senior Citizens',
      'category.health': 'Health',
      'category.housing': 'Housing',
      'category.financial': 'Financial',
      
      // Scheme Details
      'scheme.eligibility': 'Eligibility Criteria',
      'scheme.benefits': 'Benefits',
      'scheme.documents': 'Required Documents',
      'scheme.process': 'Application Process',
      'scheme.apply': 'Apply Now',
      'scheme.share': 'Share Scheme',
      'scheme.save': 'Save Scheme',
      'scheme.download': 'Download PDF',
      
      // Eligibility Form
      'eligibility.title': 'Check Your Eligibility',
      'eligibility.subtitle': 'Complete the form to find schemes you qualify for',
      'eligibility.step1': 'Personal Information',
      'eligibility.step2': 'Demographics',
      'eligibility.step3': 'Employment',
      'eligibility.step4': 'Government ID',
      'eligibility.step5': 'Results',
      
      // Form Fields
      'form.required': 'Required',
      'form.name': 'Full Name',
      'form.age': 'Age',
      'form.gender': 'Gender',
      'form.location': 'Location',
      'form.category': 'Category',
      'form.income': 'Annual Income',
      'form.education': 'Education',
      'form.employment': 'Employment Status',
      'form.aadhaar': 'Aadhaar Number',
      
      // Dashboard
      'dashboard.profile': 'Profile',
      'dashboard.applications': 'Applications',
      'dashboard.saved': 'Saved Schemes',
      'dashboard.documents': 'Documents',
      
      // Status
      'status.draft': 'Draft',
      'status.submitted': 'Submitted',
      'status.review': 'Under Review',
      'status.approved': 'Approved',
      'status.rejected': 'Rejected',
      
      // Buttons
      'button.next': 'Next',
      'button.previous': 'Previous',
      'button.submit': 'Submit',
      'button.save': 'Save',
      'button.cancel': 'Cancel',
      'button.edit': 'Edit',
      'button.delete': 'Delete',
      'button.upload': 'Upload',
      
      // Messages
      'msg.required': 'This field is required',
      'msg.invalid': 'Invalid input',
      'msg.success': 'Success',
      'msg.error': 'Error',
      'msg.loading': 'Loading...',
    },
    hi: {
      // Hindi translations
      'app.name': 'जन समर्थ',
      'app.description': 'सरकारी योजनाओं के लिए राष्ट्रीय मंच',
      
      'nav.home': 'मुख्य पृष्ठ',
      'nav.schemes': 'योजनाएं खोजें',
      'nav.eligibility': 'पात्रता जांचें',
      'nav.dashboard': 'डैशबोर्ड',
      'nav.login': 'लॉगिन',
      'nav.register': 'पंजीकरण',
      
      'landing.hero.title': 'एक राष्ट्र, सभी सरकारी योजनाओं के लिए एक मंच',
      'landing.hero.subtitle': 'एक ही मंच के माध्यम से विभिन्न सरकारी योजनाओं तक पहुंचें और आवेदन करें',
      'landing.search.placeholder': 'योजनाएं, लाभ या श्रेणियां खोजें...',
      'landing.featured.title': 'प्रमुख योजनाएं',
      'landing.categories.title': 'श्रेणी के अनुसार ब्राउज़ करें',
      'landing.how.title': 'यह कैसे काम करता है',
      'landing.benefits.title': 'हमारा पोर्टल क्यों उपयोग करें',
      
      // Add all other Hindi translations...
    },
    ta: {
      // Tamil translations
      'app.name': 'ஜன் சமர்த்',
      'app.description': 'அரசு திட்டங்களுக்கான தேசிய தளம்',
      // Add all Tamil translations...
    },
    bn: {
      // Bengali translations
      'app.name': 'জন সমর্থ',
      'app.description': 'সরকারি প্রকল্পের জন্য জাতীয় প্ল্যাটফর্ম',
      // Add all Bengali translations...
    },
    mr: {
      // Marathi translations
      'app.name': 'जन समर्थ',
      'app.description': 'सरकारी योजनांसाठी राष्ट्रीय व्यासपीठ',
      // Add all Marathi translations...
    }
  };
  
  return translations[language] || translations.en;
};