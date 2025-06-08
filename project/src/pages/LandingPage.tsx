import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import SchemeCard from '../components/ui/SchemeCard';
import useSchemeStore from '../store/useSchemeStore';
import { SchemeCategory } from '../types';
import useLanguage from '../hooks/useLanguage';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchSchemes, schemes } = useSchemeStore();
  const { translate, currentLanguage } = useLanguage();
  
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory | null>(null);
  const [featuredSchemes, setFeaturedSchemes] = useState<any[]>([]);
  
  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);
  
  useEffect(() => {
    if (schemes.length > 0) {
      // Get 3 random schemes for featured section
      const randomSchemes = [...schemes].sort(() => 0.5 - Math.random()).slice(0, 3);
      setFeaturedSchemes(randomSchemes);
    }
  }, [schemes]);
  
  const handleSearch = (query: string) => {
    navigate(`/schemes?search=${encodeURIComponent(query)}`);
  };
  
  const handleCategorySelect = (category: SchemeCategory | null) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/schemes?category=${category}`);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-accent text-white py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {translate('landing.hero.title')}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              {translate('landing.hero.subtitle')}
            </p>
            
            <div className="mb-8">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder={translate('landing.search.placeholder')} 
                language={currentLanguage}
              />
            </div>
            
            <div className="pt-4">
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                onSelectCategory={handleCategorySelect} 
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Schemes Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4">Featured Schemes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest government schemes designed to provide support and benefits to citizens across various categories.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredSchemes.map(scheme => (
              <motion.div key={scheme.id} variants={itemVariants}>
                <SchemeCard scheme={scheme} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              onClick={() => navigate('/schemes')}
              className="btn btn-outline inline-flex items-center"
            >
              View All Schemes
              <ArrowRight size={16} className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform simplifies the process of finding and applying for government schemes you are eligible for.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center p-6 rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Search & Discover</h3>
              <p className="text-gray-600">
                Search for schemes or browse by categories to find relevant opportunities.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center p-6 rounded-lg">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Check Eligibility</h3>
              <p className="text-gray-600">
                Fill out your profile to instantly see which schemes you qualify for.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center p-6 rounded-lg">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply & Track</h3>
              <p className="text-gray-600">
                Submit applications, upload documents, and track your application status.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/4560092/pexels-photo-4560092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Benefits" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Why Use Our Portal?</h2>
              
              <motion.ul className="space-y-4">
                {[
                  'Access to all government schemes in one place',
                  'Personalized eligibility checking',
                  'Multi-language support for wider accessibility',
                  'Simplified application process',
                  'Real-time application status tracking',
                  'Secure document management system'
                ].map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <CheckCircle size={20} className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <button 
                  onClick={() => navigate('/eligibility')}
                  className="btn btn-primary"
                >
                  Check Your Eligibility
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;