import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Home = () => {
  return (      
    <>
     <Header/>
        <section className="bg-blue-700 text-white py-20">
            <div className="container mx-auto text-center space-y-6">
              <h1 className="text-4xl font-semibold">Manage Your Tasks Efficiently</h1>
              <p className="text-xl">Organize your work, stay on track, and hit your goals with ease.</p>
              <Link to={'/login'}>
                  <button className="mt-6 px-8 py-3 bg-white text-blue-600 text-lg font-bold rounded-lg hover:bg-gray-100">
                    Get Started Today
                  </button>
              </Link>
            </div>
          </section>
    
          
          <section className="py-20 bg-white">
            <div className="container mx-auto text-center space-y-12">
              <h2 className="text-3xl font-semibold">Why Choose TaskMaster?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-4">🗂️</div>
                  <h3 className="text-2xl font-semibold mb-4">Organize Your Tasks</h3>
                  <p className="text-gray-600">Easily categorize and prioritize your tasks for a more organized workflow.</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-4">⚡</div>
                  <h3 className="text-2xl font-semibold mb-4">Fast and Intuitive</h3>
                  <p className="text-gray-600">Our app is designed to help you get things done faster with minimal clicks.</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                  <div className="text-blue-600 text-4xl mb-4">📅</div>
                  <h3 className="text-2xl font-semibold mb-4">Stay on Track</h3>
                  <p className="text-gray-600">Set deadlines, reminders, and notifications to keep your tasks on track.</p>
                </div>
              </div>
            </div>
          </section>
    
          <section className="bg-blue-600 text-white py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-6">Join thousands of others who are managing their tasks smarter and more efficiently.</p>
              <button className="px-8 py-3 bg-white text-blue-600 text-lg font-bold rounded-lg hover:bg-gray-100">
                Start for Free
              </button>
            </div>
          </section>
         
    </>
       )
}

export default Home