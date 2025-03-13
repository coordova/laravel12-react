import React from 'react'
import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

// Post interface
interface Post {
    id?: number;
    title: string;
    content: string;
    picture?: string;
}

// Props - Post parameters
interface Props {
    isOpen: boolean;
    closeModal: () => void;
    post?: Post | null;
}

// Components shadcn for modal
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';

const Post = ({ isOpen, closeModal, post }: Props) => {
    // Render
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{post?.title}</DialogTitle>
                    <DialogDescription>
                        <pre className='text-wrap'>{post?.content}</pre>
                    </DialogDescription>
                </DialogHeader>

                <div className="mb-3">
                    {post?.picture ? (
                        <img src={post.picture} alt="Post" className="object-cover" loading="lazy" />
                    ) : (
                        <span>No Image</span>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={closeModal} variant="outline">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Post