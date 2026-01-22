'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const settingsSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface ProfileSettingsProps {
  currentUsername: string | null;
  onUpdate: (username: string) => Promise<void>;
}

export const ProfileSettings = ({ currentUsername, onUpdate }: ProfileSettingsProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: currentUsername || '',
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    setLoading(true);
    setSuccess(false);

    try {
      if (data.username) {
        await onUpdate(data.username);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl  p-6 shadow-md ">
      <h3 className="mb-4 text-lg font-semibold ">Settings</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium ">
            Username
          </label>
          <input
            {...register('username')}
            type="text"
            className="mt-1 block w-full rounded-lg border  px-3 py-2  focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 "
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="mt-1 text-sm ">
              {errors.username.message}
            </p>
          )}
        </div>
        {success && (
          <p className="text-sm ">Settings updated successfully!</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg  px-4 py-2  transition-colors hover:bg-teal-700 disabled:opacity-50 "
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};
