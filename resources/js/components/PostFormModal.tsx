import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface Post {
    id?: number;
    title: string;
    content: string;
    picture?: string;
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    post?: Post | null;
}

export default function PostFormModal({ isOpen, closeModal, post }: Props) {
    const [formData, setFormData] = useState<Post>({ title: '', content: '', picture: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {
        if (post) {
            setFormData({ title: post.title, content: post.content, picture: post.picture || '' });
            setPreview(post.picture || '');
            setSelectedFile(null);
        } else {
            setFormData({ title: '', content: '', picture: '' });
            setPreview('');
            setSelectedFile(null);
        }
    }, [post]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (selectedFile) {
            data.append('picture', selectedFile);
        }

        // success message
        const successMessage = post?.id ? 'Post updated successfully.' : 'Post created successfully.';
        // error message
        const errorMessage = post?.id ? 'Failed to update post.' : 'Failed to create post.';

        if (post?.id) {
            data.append('_method', 'PUT');
            router.post(`/posts/${post.id}`, data, {
                onSuccess: () => {
                    toast.success(successMessage);
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    toast.error(errorMessage);
                    console.error(errors.message || 'Failed to submit post.');
                },
            });
        } else {
            router.post('/posts', data, {
                onSuccess: () => {
                    toast.success(successMessage);
                    closeModal();
                    router.reload();
                },
                onError: (errors) => {
                    toast.error(errorMessage);
                    console.error(errors.message || 'Failed to submit post.');
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">{post ? 'Edit Post' : 'Add Post'}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        {/* <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                            required
                        /> */}
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                    </div>
                    <div className="mb-3">
                        {/* <label className="block text-sm font-medium">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                            required
                        ></textarea> */}
                        <Label htmlFor="content">Content</Label>
                        <Textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Picture (optional)</label>
                        <input type="file" name="picture" onChange={handleFileChange} className="w-full" accept="image/*" />
                    </div>
                    {preview && (
                        <div className="mb-3">
                            <p className="mb-1 text-sm">Image Preview:</p>
                            <img src={preview} alt="Preview" className="h-32 w-32 rounded object-cover" />
                        </div>
                    )}
                    <div className="flex justify-end gap-2">
                        {/* <button type="button" onClick={closeModal} className="rounded bg-gray-500 px-4 py-2 text-white">
                            Cancel
                        </button>
                        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
                            {post ? 'Update' : 'Create'}
                        </button> */}

                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button>{post ? 'Update' : 'Create'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
