'use client';

import { ListFilterPlus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LanguageManagement } from '@/components/dataset/LanguagesManagement';
import { SentencesManagement } from '@/components/dataset/SentencesManagement';
import { TranslationsManagement } from '@/components/dataset/TranslationsManagement';

type Tab = 'languages' | 'sentences' | 'translations';
export default function SentencesPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('languages');

    const navItemClasses = (tab: Tab) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition
     ${activeTab === tab
            ? 'bg-primary/10 text-primary'
            : 'text-text-grey hover:bg-muted'
        }`;


    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="rounded-xl  p-6 shadow-md mb-8 space-y-6
                flex flex-col w-[50%]
                border border-border-gray">

                    <div>
                        <h1 className="text-lg font-semibold">Dataset Management</h1>
                        <p className="text-xs text-text-grey">Create and manage languages, sentences, and translations</p>
                    </div>

                    <div className="flex flex-row gap-2 border-b border-border-gray pb-2">
                        <div
                            className={navItemClasses('languages')}
                            onClick={() => setActiveTab('languages')}
                        >
                            <span>Languages</span>
                        </div>

                        <div
                            className={navItemClasses('sentences')}
                            onClick={() => setActiveTab('sentences')}
                        >
                            <span>Sentences</span>
                        </div>

                        <div
                            className={navItemClasses('translations')}
                            onClick={() => setActiveTab('translations')}
                        >
                            <span>Translations</span>
                        </div>
                    </div>


                    <div className='flex flex-row gap-2 justify-between'>

                    </div>

                    {activeTab === 'languages' && <LanguageManagement />}
                    {activeTab === 'sentences' && <SentencesManagement />}
                    {activeTab === 'translations' && <TranslationsManagement />}

                </div>

            </div>

        </div>
    )

}