'use client'
import { createClient } from '@/lib/supabase/client';

export const LanguageProficiency = () => {

    const supabase = createClient();

    const languages = [
        { id: 1, name: 'English', iso_code: 'en', type: 'source' },
        { id: 2, name: 'Tagalog', iso_code: 'tl', type: 'source' },
        { id: 3, name: 'Cebuano', iso_code: 'ceb', type: 'source' },
        { id: 4, name: 'Siargaonon', iso_code: 'sia', type: 'target' }
    ]

    return (
        <div className="rounded-xl p-6 w-full shadow-md border mt-4 border-border-gray bg-box-bg">

            <div className="mb-4 gap-4 flex flex-col">

                <p className="font-semibold text-base">Source Language</p>

                <div className="flex flex-row flex-wrap gap-2">

                    {languages.filter((language) => language.type === 'source').map((language) => (
                        <div key={language.id}>
                            <button
                                type="button"
                                onClick={() => handleLanguageToggle(language.id)}
                                className={`
                          w-fit p-2 rounded-lg text-sm font-medium border text-teal-400 duration-200
                        `}
                            >
                                {language.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4 gap-4 flex flex-col">

                <p className="font-semibold text-base">Target Language</p>

                <div className="flex flex-row flex-wrap gap-2">

                    {languages.filter((language) => language.type === 'target').map((language) => (
                        <div key={language.id}>
                            <button
                                type="button"
                                onClick={() => handleLanguageToggle(language.id)}
                                className={`
                          w-fit p-2 rounded-lg text-sm font-medium border text-teal-400 duration-200
                        `}
                            >
                                {language.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}