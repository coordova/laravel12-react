import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Shadcn for toast
import { toast } from 'sonner';

// Components shadcn for modal
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Payment } from '@/components/payments/columns';

// modal interface
interface EditPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    payment: Payment | null;
    onUpdate: (updatedPayment: Payment) => void;
}

// Payment interface
interface Payment {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
}

const EditPaymentModal: React.FC<EditPaymentModalProps> = ({ isOpen, onClose, payment, onUpdate }) => {
    const [formData, setFormData] = useState<Payment>({ id: '', amount: 0, status: 'pending', email: '' });
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    // use effect
    useEffect(() => {
        if (payment) {
            setFormData(payment);
        }
    }, [payment]);

    // handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };