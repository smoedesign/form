'use client'

import React, { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X, Menu } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import emailjs from '@emailjs/browser'

export default function Component() {
  const formRef = useRef<HTMLFormElement>(null)
  const [name, setName] = useState('')
  const [step, setStep] = useState(0)
  const [option, setOption] = useState('')
  const [userType, setUserType] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const clearForm = () => {
    setName('')
    setStep(0)
    setOption('')
    setUserType('')
    setServices([])
    setMessage('')
    setEmail('')
    setError(null)
    setIsLoading(false)
  }

  const handleNameInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.trim() !== '') {
      setStep(1)
    }
  }

  const handleOptionSelection = (selectedOption: string) => {
    setOption(selectedOption)
    setStep(2)
  }

  const handleUserTypeSelection = (selectedType: string) => {
    setUserType(selectedType)
    if (option === 'Request service') {
      setStep(3)
    } else {
      setStep(4)
    }
  }

  const handleServiceSelection = (selectedService: string) => {
    setServices(prev => 
      prev.includes(selectedService)
        ? prev.filter(service => service !== selectedService)
        : [...prev, selectedService]
    )
  }

  const handleServicesConfirmation = () => {
    if (services.length > 0) {
      setStep(5)
    } else {
      setError('Please select at least one service.')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!name || !option || !userType || !email || !isValidEmail(email)) {
      setError('Please fill in all required fields correctly.')
      setIsLoading(false)
      return
    }

    if (option === 'Request service' && services.length === 0) {
      setError('Please select at least one service.')
      setIsLoading(false)
      return
    }

    if (option !== 'Request service' && !message.trim()) {
      setError('Please enter a message.')
      setIsLoading(false)
      return
    }

    const templateParams = {
      name: name,
      option: option,
      userType: userType,
      services: services.join(', '),
      message: message,
      email: email,
    }

    try {
      await emailjs.send('service_nvzb9qu', 'template_l95kxnm', templateParams, 'yqmShuaGhGGVev_fn')
      setShowThankYou(true)
      clearForm()
    } catch (error) {
      console.error('Failed to send email:', error)
      setError('Failed to send email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsFormOpen(false)
    clearForm()
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      {!isFormOpen && (
        <Button
          onClick={() => setIsFormOpen(true)}
          className="fixed top-4 left-4 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none"
        >
          <Menu size={24} />
        </Button>
      )}
      {isFormOpen && (
        <div className="bg-gray-100 w-full max-w-md p-6 h-svh rounded-lg shadow-md overflow-y-auto flex flex-col relative">
          <Button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
          >
            <X size={18} />
          </Button>
          <div className="text-sm text-gray-500 mb-6">TO: SMOEDESIGN</div>
          <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col h-full'>
            <div className="space-y-4 flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Hi, my name is</span>
                <Input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleNameInput}
                  className="flex-grow-0 w-24 h-8 ml-1 text-sm text-gray-700 border border-gray-300 rounded"
                  placeholder="Enter name"
                />
              </div>

              {step >= 1 && (
                <div className="mb-4 flex">
                  <p className="text-gray-700 mb-2 mr-1">I'm Here For</p>
                  <RadioGroup 
                    value={option} 
                    onValueChange={handleOptionSelection}
                    className="flex flex-wrap gap-1"
                  >
                    {['Cooperation', 'Request service', 'Other'].map((value) => (
                      <div key={value} className="flex items-center">
                        <RadioGroupItem
                          value={value}
                          id={value}
                          className="peer sr-only"
                        />
                       
                        <Label
                          htmlFor={value}
                          className={`flex items-center justify-center px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded cursor-pointer ${
                            option === value ?  'bg-primary text-primary-foreground mr-2' : ''
                          } ${option && option !== value ? 'hidden' : ''}`}
                        >
                          {value}
                          
                        </Label>
                        {option === value ? ( <Button className='m-0 p-0 w-6 h-5' onClick={()=>{ setOption('')}} ><X size={10} /></Button>): null}
                      </div>
                        
                    ))}
                  </RadioGroup>
                </div>
              )}

              {step >= 2 && (
                <div className="mb-4 flex">
                  <p className="text-gray-700 mb-2 mr-1">I am</p>
                  <RadioGroup 
                    value={userType} 
                    onValueChange={handleUserTypeSelection}
                    className="flex flex-wrap gap-1"
                  >
                    {['A Company', 'An Individual'].map((value) => (
                      <div key={value} className="flex items-center">
                        <RadioGroupItem
                          value={value}
                          id={value}
                          className="peer sr-only"
                          
                        />
                        <Label
                          htmlFor={value}
                          className={`flex items-center justify-center px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded cursor-pointer ${
                            userType === value ? 'bg-primary text-primary-foreground' : ''
                          } ${userType && userType !== value ? 'hidden' : ''}`}
                        >
                          {value}
                        </Label>
                        {userType === value ? ( <Button className='m-0 p-0 w-6 h-5' onClick={()=>{ setUserType('')}} ><X size={10} /></Button>): null}

                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {step >= 3 && option === 'Request service' && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Select Services (one or more)</p>
                  <div className="my-4 flex flex-wrap items-center gap-2">
                    {['Web Development', 'Mobile App Development', 'UI/UX Design', 'Consulting'].map((service) => (
                      <div key={service} className="flex items-center border border-gray-300 rounded">
                        <Checkbox
                          id={service}
                          checked={services.includes(service)}
                          onCheckedChange={() => handleServiceSelection(service)}
                          className='peer sr-only'
                        />
                        <Label htmlFor={service} className={` ${services.includes(service) ? 'bg-primary text-primary-foreground  rounded' : ''} py-2 px-2  h-8 flex items-center `}>
                          {service}
                       
                        </Label>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={handleServicesConfirmation}
                    className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                  >
                    Confirm Services
                  </Button>
                </div>
              )}

              {step >= 4 && option !== 'Request service' && (
                <div className="mb-4 flex items-center">
                  <Label htmlFor="message" className="block text-gray-700 mr-2">Message:</Label>
                  <Input 
                    id="message"
                    placeholder="press Enter to confirm" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (message.trim() !== '') {
                          setStep(5);
                        } else {
                          setError('Please enter a message.');
                        }
                      }
                    }}
                    className="w-full text-sm bg-transparent border-gray-300 focus:ring-0"
                  />
                </div>
              )}

              {step >= 5 && (
                <div className='flex flex-col'>
                  <div className="mb-4 flex items-center justify-center mt-6">
                    <Label htmlFor="email" className="block text-gray-700 mb-2 w-24 mr-2">My Email</Label>
                    <Input 
                      type="email" 
                      id="email"
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-8 text-sm bg-transparent border-gray-300 focus:ring-0 focus:outline-none"
                    />
                  </div>
                  {email && !isValidEmail(email) && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
                  )}
                </div>
              )}
            </div>
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-between items-center mt-8">
              <div className="text-xs text-gray-500">HELLO@SMOEDESIGN.COM</div>
              <Button 
                type='submit'
                disabled={!name || !option || !userType || !email || !isValidEmail(email) || isLoading || 
                  (option === 'Request service' && services.length === 0) || 
                  (option !== 'Request service' && !message.trim())}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      )}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl relative">
            <p className="text-gray-700 mb-10">Thank you for your interest! We will talk shortly.</p>
            <Button
              onClick={() => {
                setShowThankYou(false)
                setIsFormOpen(false)
                clearForm()
              }}
              className="absolute bottom-2 transform -translate-x-1/2 left-1/2 p-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none"
            >
              <span>Close</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}