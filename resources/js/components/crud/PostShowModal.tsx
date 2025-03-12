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
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { DialogFooter } from '../ui/dialog';

const Post = ({ isOpen, closeModal, post }: Props) => {
    // Render
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Post</DialogTitle>
                    <DialogDescription>
                        View post details
                    </DialogDescription>
                </DialogHeader>
                <div className="mb-3">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" name="title" value={post?.title} readOnly />
                </div>
                <div className="mb-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea name="content" value={post?.content} readOnly />
                </div>
                <div className="mb-3">
                    <Label htmlFor="picture">Picture</Label>
                    {post?.picture ? (
                        <img src={post.picture} alt="Post" className="h-16 w-16 cursor-pointer rounded-full object-cover" loading="lazy" />
                    ) : (
                        'No Picture'
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