import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Shadcn for toast
import { toast } from 'sonner';

// Components shadcn for modal
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '../ui/textarea';
import { Payment } from '@/components/payments/columns';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

// modal interface
interface EditPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    payment: Payment | null;
    onUpdate: (updatedPayment: Payment) => void;
}

// Payment interface
/* interface Payment {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
} */

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
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value
        }));
    };

    // handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        // csrf token
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
            toast.error('CSRF token not found');
            setMessage({ type: 'error', text: 'CSRF token not found!, Refresh the page' });
            setLoading(false);
            return;
        }
        // async function
        try {
            const response = await fetch(`/payments/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                credentials: 'same-origin',
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to update payment');
                setMessage({ type: 'error', text: errorData.message || 'Failed to update payment' });
                setLoading(false);
                setTimeout(() => {
                    onClose();
                    window.location.reload();
                    setMessage(null);
                }, 3000);
                // throw new Error(errorData.message || 'Failed to update payment');
            }
            const data = await response.json();
            toast.success('Payment updated successfully');
            setMessage({ type: 'success', text: 'Payment updated successfully' });
            onClose();
            onUpdate(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to update payment');
            console.error("Error updating payment:", error);
            setMessage({ type: 'error', text: 'Failed to update payment' });
            setLoading(false);
        } finally {
            setLoading(false);
        }
        // form data
        /* const data = new FormData();
        data.append('id', formData.id);
        data.append('amount', formData.amount.toString());
        data.append('status', formData.status);
        data.append('email', formData.email);
        router.post(`/payments/${formData.id}`, data, {
            onSuccess: () => {
                toast.success('Payment updated successfully');
                onClose();
                onUpdate(formData);
                setLoading(false);
            },
            onError: (errors) => {
                toast.error('Failed to update payment');
                console.error(errors.message || 'Failed to update payment');
                setLoading(false);
            }
        }); */
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Payment</DialogTitle>
                    <DialogDescription>
                        Edit payment details
                    </DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {message && (
                            <div className={`text-${message.type === 'success' ? 'green' : 'red'}`}>
                                {message.text}
                            </div>
                        )}
                        <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input /* type="number" */ name="amount" value={formData.amount} onChange={handleChange} placeholder='Enter amount' required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter email' required />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" value={formData.status} onValueChange={value => handleChange({ target: { name: 'status', value } })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="success">Success</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* <Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                options={[
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'failed', label: 'Failed' },
                                ]}
                            /> */}
                            {/* <select name="status" value={formData.status} onChange={handleChange} required>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select> */}

                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-primary text-white">{loading ? 'Saving...' : 'Save'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditPaymentModal;
