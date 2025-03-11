import PostFormModal from '@/components/PostFormModal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

import { Trash2 } from 'lucide-react';

export default function Posts() {
    const { posts } = usePage<{ posts: { id: number; title: string; content: string; picture?: string }[] }>().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const openModal = (post = null) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        router.delete(`/posts/${id}`, {
            onSuccess: () => {
                toast.success('Post deleted successfully.');
                router.reload();
            },
            onError: () => {
                toast.error('Failed to delete post.');
                console.error('Failed to delete post.');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Posts" />

            <Toaster position="top-right" richColors />

            <div className="bg-background text-foreground flex flex-col gap-6 rounded-xl p-6 shadow-lg">
                <div className="flex justify-end">
                    {/* <button onClick={() => openModal()} className="rounded bg-green-600 px-3 py-1 text-sm text-white transition hover:bg-green-700">
                        Add Post
                    </button> */}
                    <Button onClick={() => openModal()} className="ml-2">
                        Add Post
                    </Button>
                </div>

                <table className="bg-background text-foreground w-full border-collapse rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-background text-foreground border-b">
                            {['Picture', 'Title', 'Content', 'Actions'].map((header) => (
                                <th key={header} className="border p-3 text-center">
                                    {header.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length ? (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b">
                                    <td className="p-3">
                                        {post.picture ? (
                                            <img
                                                src={post.picture}
                                                alt="Post"
                                                className="h-16 w-16 cursor-pointer rounded-full object-cover"
                                                loading="lazy"
                                                onClick={() => openModal(post)}
                                            />
                                        ) : (
                                            'No Picture'
                                        )}
                                    </td>
                                    <td className="p-3">{post.title}</td>
                                    <td className="p-3">{post.content}</td>
                                    <td className="flex gap-2 p-3">
                                        {/* <button onClick={() => openModal(post)} className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(post.id)} className="rounded bg-red-500 px-3 py-1 text-sm text-white">
                                            Delete
                                        </button> */}
                                        {/* <Button onClick={() => handleDelete(post.id)} variant="destructive">
                                            Delete
                                        </Button> */}
                                        <Button onClick={() => openModal(post)} variant="outline">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(post.id)} variant="outline" size="icon">
                                            <Trash2 />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-600">
                                    No posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <PostFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} post={selectedPost} />
        </AppLayout>
    );
}
