import AppLayout from '@/layouts/app-layout'
import React from 'react'
import { Head } from '@inertiajs/react'
import { Toaster } from 'sonner'
import { type BreadcrumbItem } from '@/types';

// breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

const Payments = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Payments" />
        <Toaster position="top-right" richColors />
        
    </AppLayout>
  )
}

export default Payments