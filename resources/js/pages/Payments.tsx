import AppLayout from '@/layouts/app-layout'
import React, { useEffect, useState } from 'react' 
import { Head } from '@inertiajs/react'
import { Toaster } from 'sonner'
import { type BreadcrumbItem } from '@/types';

import { Payment, columns } from "@/components/payments/columns"
import { DataTable } from "@/components/payments/data-table"

// breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

const Payments = ( { payments }: { payments: Payment[] } ) => {
    const [data, setData] = useState<Payment[]>(payments);

    useEffect(() => {
        setData(payments);
    }, [payments]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />
            <Toaster position="top-right" richColors />
            <DataTable columns={columns} data={ payments} />
        </AppLayout>
    )
}

export default Payments