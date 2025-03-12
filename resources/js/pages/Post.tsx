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

const Post = ({ isOpen, closeModal, post }: Props) => {
  return (
    <div>Post</div>
  )
}

export default Post