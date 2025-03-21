import PostFormModal from '@/components/crud/PostFormModal';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { type Post } from '@/types';

import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Eye, Trash2 } from 'lucide-react';

import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
} from '@/components/ui/pagination';

import PostShowModal from '@/components/crud/PostShowModal';

export default function Posts({ posts }: { posts: Post[] }) {
    // const { posts } = usePage<{ posts: { id: number; title: string; content: string; picture?: string }[] }>().props;
    // console.log(posts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    // Open modal
    const openModal = (post = null) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    // Open show modal
    const openShowModal = (post = null) => {
        setSelectedPost(post);
        setIsShowModalOpen(true);
    };

    // Handle delete
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
                    <Button onClick={() => openModal()} className="ml-2">
                        Add Post
                    </Button>
                </div>

                {/* Table shadcn */}
                <Table>
                    {/* <TableCaption>A list of your recent posts.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Picture</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.data.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">
                                    {/* Image & No Image */}
                                    {post.picture ? (
                                        <img
                                            src={post.picture}
                                            alt="Post"
                                            className="h-16 w-16 cursor-pointer rounded-full object-cover"
                                            loading="lazy"
                                            onClick={() => openShowModal(post)}
                                        />
                                    ) : (
                                        <span className="" onClick={() => openShowModal(post)}>
                                            <img
                                                src="/storage/uploads/no-image-svgrepo-com.svg"
                                                alt="No Image"
                                                className="bg-background text-foreground h-16 w-16 cursor-pointer rounded-full object-cover"
                                            />
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell className="">{post.created_at}</TableCell>
                                <TableCell className="">{post.updated_at}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Link href={route('posts.show', post.id)}>
                                        <Button variant="outline">
                                            <Eye />
                                        </Button>
                                    </Link>
                                    <Button onClick={() => openModal(post)} variant="outline">
                                        <Edit />
                                    </Button>
                                    <Button onClick={() => handleDelete(post.id)} variant="outline" size="icon">
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination shadcn */}
                <Pagination>
                    <PaginationContent>
                        {posts.links.map((link) =>
                            link.url ? (
                                <PaginationItem key={link.label}>
                                    <Link
                                        className={cn(
                                            buttonVariants({
                                                variant: link.active ? 'outline' : 'ghost',
                                            }),
                                        )}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={link.label}>
                                    <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: link.label }} />
                                </PaginationItem>
                            ),
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
            {/* Modal */}
            <PostFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} post={selectedPost} />
            {/* Show Modal */}
            <PostShowModal isOpen={isShowModalOpen} closeModal={() => setIsShowModalOpen(false)} post={selectedPost} />
        </AppLayout>
    );

    // return (
    //     <AppLayout>
    //         <Head title="Posts" />

    //         <Toaster position="top-right" richColors />

    //         <div className="bg-background text-foreground flex flex-col gap-6 rounded-xl p-6 shadow-lg">
    //             <div className="flex justify-end">
    //                 {/* <button onClick={() => openModal()} className="rounded bg-green-600 px-3 py-1 text-sm text-white transition hover:bg-green-700">
    //                     Add Post
    //                 </button> */}
    //                 <Button onClick={() => openModal()} className="ml-2">
    //                     Add Post
    //                 </Button>
    //             </div>

    //             <table className="bg-background text-foreground w-full border-collapse rounded-lg shadow-sm">
    //                 <thead>
    //                     <tr className="bg-background text-foreground border-b">
    //                         {['Picture', 'Title', 'Content', 'Actions'].map((header) => (
    //                             <th key={header} className="border p-3 text-center">
    //                                 {header.toUpperCase()}
    //                             </th>
    //                         ))}
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {posts.length ? (
    //                         posts.map((post) => (
    //                             <tr key={post.id} className="border-b">
    //                                 <td className="p-3">
    //                                     {post.picture ? (
    //                                         <img
    //                                             src={post.picture}
    //                                             alt="Post"
    //                                             className="h-16 w-16 cursor-pointer rounded-full object-cover"
    //                                             loading="lazy"
    //                                             onClick={() => openModal(post)}
    //                                         />
    //                                     ) : (
    //                                         'No Picture'
    //                                     )}
    //                                 </td>
    //                                 <td className="p-3">{post.title}</td>
    //                                 <td className="p-3">{post.content}</td>
    //                                 <td className="flex gap-2 p-3">
    //                                     {/* <button onClick={() => openModal(post)} className="rounded bg-blue-500 px-3 py-1 text-sm text-white">
    //                                         Edit
    //                                     </button>
    //                                     <button onClick={() => handleDelete(post.id)} className="rounded bg-red-500 px-3 py-1 text-sm text-white">
    //                                         Delete
    //                                     </button> */}
    //                                     {/* <Button onClick={() => handleDelete(post.id)} variant="destructive">
    //                                         Delete
    //                                     </Button> */}
    //                                     <Button onClick={() => openModal(post)} variant="outline">
    //                                         Edit
    //                                     </Button>
    //                                     <Button onClick={() => handleDelete(post.id)} variant="outline" size="icon">
    //                                         <Trash2 />
    //                                     </Button>
    //                                 </td>
    //                             </tr>
    //                         ))
    //                     ) : (
    //                         <tr>
    //                             <td colSpan={4} className="p-4 text-center text-gray-600">
    //                                 No posts found.
    //                             </td>
    //                         </tr>
    //                     )}
    //                 </tbody>
    //             </table>

    //             {/* Pagination */}
    //             <Pagination  />
    //         </div>

    //         <PostFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} post={selectedPost} />
    //     </AppLayout>
    // );
}
