import React from 'react'
import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

// Post interface
interface Post {
    id?: number;
    title: string;
    content: string;
    picture?: string;
    created_at: string;
    updated_at: string;
}

// Props - Post parameters
interface Props {
    isOpen: boolean;
    closeModal: () => void;
    post?: Post | null;
}

const Post = ({ isOpen, closeModal, post }: Props) => {
  return (
    <AppLayout>
        <Head title="Post" />
        {/* Card horizontal and vertical centered */}
        <div className="container mx-auto p-6">
            {post && (
                <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl lg:items-start lg:gap-10">
                    <div>
                        {post.picture && (
                            <img src={post.picture} alt="Post" className="size-32 rounded-full md:size-48 md:shadow-xl md:rounded-md object-cover lg:size-64 xl:size-80 " loading="lazy" />
                        )}
                    </div>
                    <div className="flex flex-col items-center md:items-start md:gap-2 lg:gap-4">
                        <span className="text-2xl font-medium">{post.title}</span>
                        <span className="font-medium text-sky-500">{post.content}</span>
                        <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                            <span>Laravel 12</span>
                            <span>·</span>
                            <span>2025</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    </AppLayout>
  )
}

export default Post