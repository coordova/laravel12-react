import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const AddPaymentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        if (!csrfToken) {
            setMessage({ type: 'error', text: 'CSRF token missing! Refresh the page.' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
                body: JSON.stringify({ email, amount, status }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Payment added successfully!' });

                setEmail('');
                setAmount('');
                setStatus('');

                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 1500);
            } else {
                const errorData = await response.json();
                setMessage({ type: 'error', text: errorData.message || 'Failed to add payment.' });
            }
        } catch (error) {
            console.error('Error adding payment:', error);
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Payment</DialogTitle>{' '}
                </DialogHeader>{' '}
                <form onSubmit={handleSubmit} className="space-y-2">
                    {message && (
                        <div className={`rounded p-2 ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {message.text}
                        </div>
                    )}
                    <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    {/* <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded border p-2" required>
                        <option value="">Select status</option> <option value="processing">Processing</option>{' '}
                        <option value="pending">Pending</option> <option value="success">Success</option> <option value="failed">Failed</option>{' '}
                    </select>{' '} */}
                    {/* select */}
                    <Select name="status" value={status} onValueChange={(value) => setStatus(value)}>
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
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
                            Cancel{' '}
                        </Button>{' '}
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Add Payment'}
                        </Button>{' '}
                    </DialogFooter>{' '}
                </form>{' '}
            </DialogContent>{' '}
        </Dialog>
    );
};

export default AddPaymentModal;
