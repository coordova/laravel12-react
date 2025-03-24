import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

import { Payment, columns } from '@/components/payments/columns';
import { DataTable } from '@/components/payments/data-table';

import AddPaymentModal from '@/components/payments/AddPaymentModal';
import EditPaymentModal from '@/components/payments/EditPaymentModal';

// breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

const Payments = ({ payments }: { payments: Payment[] }) => {
    const [data, setData] = useState<Payment[]>(payments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

    useEffect(() => {
        setData(payments);
    }, [payments]);

    const handleUpdate = (payment: Payment) => {
        setData((prev) => prev.map((p) => (p.id === payment.id ? payment : p)));
        setEditModalOpen(true);
        setSelectedPayment(payment);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
        setSelectedPayment(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />
            <Toaster position="top-right" richColors />
            <DataTable columns={columns(() => {}, setEditModalOpen, setSelectedPayment)} data={payments} />
            <EditPaymentModal isOpen={editModalOpen} onClose={handleEditClose} payment={selectedPayment} onUpdate={handleUpdate} />
            <AddPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </AppLayout>
    );
};

export default Payments;
