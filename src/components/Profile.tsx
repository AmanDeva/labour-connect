import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { uploadImage } from '../utils/cloudinary';
import { Labour, WeeklyAvailability } from '../types';
import { toast } from 'react-hot-toast';
import {
  Trash2,
  Edit,
  Save,
  Upload,
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  Tag,
  Camera,
  AlertCircle
} from 'lucide-react';

const defaultAvailability: WeeklyAvailability = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const Profile = () => {
  const [labour, setLabour] = useState<Labour>({
    name: '',
    contact: '',
    skills: [],
    availability: defaultAvailability,
    charges: 0,
    location: '',
    imageUrl: '',
    userId: auth.currentUser?.uid || '',
  });
  const [newSkill, setNewSkill] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    fetchLabourData();
  }, []);

  const fetchLabourData = async () => {
    if (!auth.currentUser) return;
    
    try {
      const docRef = doc(db, 'labourers', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as Labour;
        setLabour({
          ...data,
          availability: data.availability || defaultAvailability,
        });
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    } catch (error: any) {
      toast.error('Error fetching profile data');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddSkill = () => {
    if (newSkill && !labour.skills.includes(newSkill)) {
      setLabour(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setLabour(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleAvailabilityChange = (day: keyof WeeklyAvailability) => {
    setLabour(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: !prev.availability[day],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error('You must be logged in');
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = labour.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const labourData: Labour = {
        ...labour,
        imageUrl: imageUrl || '',
        userId: auth.currentUser.uid,
      };

      await setDoc(doc(db, 'labourers', auth.currentUser.uid), labourData);
      setLabour(labourData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error('Error updating profile: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!auth.currentUser) return;
    
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'labourers', auth.currentUser.uid));
        setLabour({
          name: '',
          contact: '',
          skills: [],
          availability: defaultAvailability,
          charges: 0,
          location: '',
          imageUrl: '',
          userId: auth.currentUser.uid,
        });
        toast.success('Profile deleted successfully!');
        setIsEditing(true);
      } catch (error: any) {
        toast.error('Error deleting profile: ' + error.message);
      }
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-brand-600 to-brand-700">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              {(labour.imageUrl || previewImage) ? (
                <img
                  src={previewImage || labour.imageUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-xl border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl border-4 border-white bg-slate-100 flex items-center justify-center shadow-md">
                  <Building2 className="w-12 h-12 text-slate-400" />
                </div>
              )}
              {isEditing && (
                <label className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                  <Camera className="w-4 h-4 text-slate-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
            {labour.userId && (
              <button
                onClick={handleDelete}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={labour.name}
                    onChange={(e) => setLabour(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number</label>
                  <input
                    type="text"
                    value={labour.contact}
                    onChange={(e) => setLabour(prev => ({ ...prev, contact: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Daily Charges (₹)</label>
                  <input
                    type="number"
                    value={labour.charges}
                    onChange={(e) => setLabour(prev => ({ ...prev, charges: Number(e.target.value) }))}
                    className="input-field"
                    placeholder="Enter your daily charges"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={labour.location}
                    onChange={(e) => setLabour(prev => ({ ...prev, location: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your work location"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="input-field"
                    placeholder="Add a skill (e.g., Plumbing, Carpentry)"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="btn-secondary whitespace-nowrap"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {labour.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full flex items-center space-x-1"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">Weekly Availability</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Object.keys(defaultAvailability).map((day) => (
                    <label
                      key={day}
                      className="relative flex items-center justify-between cursor-pointer bg-white border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-medium text-slate-700">
                        {capitalizeFirstLetter(day)}
                      </span>
                      <input
                        type="checkbox"
                        checked={labour.availability[day as keyof WeeklyAvailability]}
                        onChange={() => handleAvailabilityChange(day as keyof WeeklyAvailability)}
                        className="h-5 w-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    fetchLabourData();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-slate-800">{labour.name || 'Your Name'}</h2>
                    <p className="text-slate-500 flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {labour.location || 'Location not specified'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Contact Information</h3>
                    <p className="text-slate-600">{labour.contact || 'Contact not specified'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Daily Charges</h3>
                    <p className="text-2xl font-semibold text-slate-800 flex items-center">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {labour.charges}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {labour.skills.length > 0 ? (
                        labour.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full flex items-center"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          No skills added yet
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Weekly Availability</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {Object.entries(labour.availability).map(([day, available]) => (
                        <div
                          key={day}
                          className={`px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                            available
                              ? 'bg-green-50 text-green-700'
                              : 'bg-slate-50 text-slate-500'
                          }`}
                        >
                          <span>{capitalizeFirstLetter(day)}</span>
                          <Calendar className={`h-4 w-4 ${available ? 'text-green-500' : 'text-slate-400'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;