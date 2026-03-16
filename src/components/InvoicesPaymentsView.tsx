import React, { useState } from 'react';
import {
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Clock,
  CheckCircle2,
  RefreshCcw,
  X,
  CreditCard,
  Banknote,
  Smartphone,
  Building,
  ChevronDown,
  Eye,
  Send,
  AlertCircle,
  ArrowUpRight,
  DollarSign,
  Calendar,
  User,
  Receipt,
  BarChart2,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Types ────────────────────────────────────────────────────────────────────
type PaymentStatus = 'Paid' | 'Pending' | 'Overdue' | 'Refunded' | 'Partial';

interface Invoice {
  id: string;
  bookingId: string;
  guest: string;
  property: string;
  room: string;
  amount: number;
  tax: number;
  total: number;
  status: PaymentStatus;
  dueDate: string;
  issuedDate: string;
  paymentMethod: string;
}

interface Transaction {
  id: string;
  invoiceId: string;
  guest: string;
  amount: number;
  method: string;
  status: 'Success' | 'Failed' | 'Pending' | 'Refunded';
  date: string;
  property: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockInvoices: Invoice[] = [
  { id: 'INV-1001', bookingId: 'BK-4421', guest: 'James Anderson', property: 'Grand Plaza Hotel', room: 'Deluxe King Suite', amount: 1200, tax: 120, total: 1320, status: 'Paid', dueDate: '2026-03-10', issuedDate: '2026-03-01', paymentMethod: 'Credit Card' },
  { id: 'INV-1002', bookingId: 'BK-4422', guest: 'Priya Sharma', property: 'Sunset Resort', room: 'Ocean View Double', amount: 850, tax: 85, total: 935, status: 'Pending', dueDate: '2026-03-20', issuedDate: '2026-03-05', paymentMethod: 'UPI' },
  { id: 'INV-1003', bookingId: 'BK-4423', guest: 'Michael Chen', property: 'Urban Suites', room: 'Standard Twin', amount: 600, tax: 60, total: 660, status: 'Overdue', dueDate: '2026-03-08', issuedDate: '2026-02-28', paymentMethod: 'Bank Transfer' },
  { id: 'INV-1004', bookingId: 'BK-4424', guest: 'Sarah Williams', property: 'Grand Plaza Hotel', room: 'Presidential Suite', amount: 3500, tax: 350, total: 3850, status: 'Paid', dueDate: '2026-03-15', issuedDate: '2026-03-07', paymentMethod: 'Stripe' },
  { id: 'INV-1005', bookingId: 'BK-4425', guest: 'David Park', property: 'Sunset Resort', room: 'Family Bungalow', amount: 1800, tax: 180, total: 1980, status: 'Refunded', dueDate: '2026-03-12', issuedDate: '2026-03-04', paymentMethod: 'PayPal' },
  { id: 'INV-1006', bookingId: 'BK-4426', guest: 'Emma Johnson', property: 'Urban Suites', room: 'Business Room', amount: 420, tax: 42, total: 462, status: 'Partial', dueDate: '2026-03-22', issuedDate: '2026-03-08', paymentMethod: 'Debit Card' },
  { id: 'INV-1007', bookingId: 'BK-4427', guest: 'Ravi Mehta', property: 'Grand Plaza Hotel', room: 'Junior Suite', amount: 950, tax: 95, total: 1045, status: 'Pending', dueDate: '2026-03-25', issuedDate: '2026-03-10', paymentMethod: 'UPI' },
  { id: 'INV-1008', bookingId: 'BK-4428', guest: 'Lena Müller', property: 'Sunset Resort', room: 'Deluxe Sea View', amount: 1100, tax: 110, total: 1210, status: 'Paid', dueDate: '2026-03-18', issuedDate: '2026-03-09', paymentMethod: 'Credit Card' },
];

const mockTransactions: Transaction[] = [
  { id: 'TXN-7001', invoiceId: 'INV-1001', guest: 'James Anderson', amount: 1320, method: 'Credit Card', status: 'Success', date: '2026-03-10 09:42', property: 'Grand Plaza Hotel' },
  { id: 'TXN-7002', invoiceId: 'INV-1004', guest: 'Sarah Williams', amount: 3850, method: 'Stripe', status: 'Success', date: '2026-03-14 14:15', property: 'Grand Plaza Hotel' },
  { id: 'TXN-7003', invoiceId: 'INV-1005', guest: 'David Park', amount: 1980, method: 'PayPal', status: 'Refunded', date: '2026-03-13 11:00', property: 'Sunset Resort' },
  { id: 'TXN-7004', invoiceId: 'INV-1006', guest: 'Emma Johnson', amount: 231, method: 'Debit Card', status: 'Success', date: '2026-03-09 16:30', property: 'Urban Suites' },
  { id: 'TXN-7005', invoiceId: 'INV-1003', guest: 'Michael Chen', amount: 660, method: 'Bank Transfer', status: 'Failed', date: '2026-03-07 10:05', property: 'Urban Suites' },
  { id: 'TXN-7006', invoiceId: 'INV-1008', guest: 'Lena Müller', amount: 1210, method: 'Credit Card', status: 'Success', date: '2026-03-17 09:22', property: 'Sunset Resort' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const statusConfig: Record<PaymentStatus, { label: string; color: string; bg: string }> = {
  Paid: { label: 'Paid', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  Pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50' },
  Overdue: { label: 'Overdue', color: 'text-red-700', bg: 'bg-red-50' },
  Refunded: { label: 'Refunded', color: 'text-purple-700', bg: 'bg-purple-50' },
  Partial: { label: 'Partial', color: 'text-blue-700', bg: 'bg-blue-50' },
};

const txnStatusConfig: Record<string, { color: string; bg: string }> = {
  Success: { color: 'text-emerald-700', bg: 'bg-emerald-50' },
  Failed: { color: 'text-red-700', bg: 'bg-red-50' },
  Pending: { color: 'text-amber-700', bg: 'bg-amber-50' },
  Refunded: { color: 'text-purple-700', bg: 'bg-purple-50' },
};

const paymentMethodIcons: Record<string, React.ElementType> = {
  'Credit Card': CreditCard,
  'Debit Card': CreditCard,
  'UPI': Smartphone,
  'Bank Transfer': Building,
  'Stripe': DollarSign,
  'PayPal': Banknote,
};

const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ─── Modals ────────────────────────────────────────────────────────────────────
const Overlay = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// Create Invoice Modal
const CreateInvoiceModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({
    guest: '', booking: '', room: '', checkIn: '', checkOut: '',
    roomPrice: '', extraCharges: '', tax: '', discount: '', paymentMethod: 'Credit Card',
  });

  const roomPrice = parseFloat(form.roomPrice) || 0;
  const extra = parseFloat(form.extraCharges) || 0;
  const taxPct = parseFloat(form.tax) || 0;
  const discount = parseFloat(form.discount) || 0;
  const subtotal = roomPrice + extra;
  const taxAmt = subtotal * (taxPct / 100);
  const total = subtotal + taxAmt - discount;

  return (
    <Overlay onClose={onClose}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Create Invoice</h2>
          <p className="text-sm text-slate-500 mt-0.5">Generate a new booking invoice</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
      </div>
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Guest Name</label>
            <input className="input w-full" placeholder="e.g. John Smith" value={form.guest} onChange={e => setForm(p => ({ ...p, guest: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Booking Reference</label>
            <input className="input w-full" placeholder="e.g. BK-4429" value={form.booking} onChange={e => setForm(p => ({ ...p, booking: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Room</label>
            <input className="input w-full" placeholder="e.g. Deluxe Suite" value={form.room} onChange={e => setForm(p => ({ ...p, room: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Payment Method</label>
            <select className="input w-full" value={form.paymentMethod} onChange={e => setForm(p => ({ ...p, paymentMethod: e.target.value }))}>
              {['Credit Card', 'Debit Card', 'UPI', 'Bank Transfer', 'Stripe', 'PayPal'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Check-in Date</label>
            <input type="date" className="input w-full" value={form.checkIn} onChange={e => setForm(p => ({ ...p, checkIn: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Check-out Date</label>
            <input type="date" className="input w-full" value={form.checkOut} onChange={e => setForm(p => ({ ...p, checkOut: e.target.value }))} />
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pricing Breakdown</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Room Price ($)</label>
              <input type="number" className="input w-full" placeholder="0.00" value={form.roomPrice} onChange={e => setForm(p => ({ ...p, roomPrice: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Extra Charges ($)</label>
              <input type="number" className="input w-full" placeholder="0.00" value={form.extraCharges} onChange={e => setForm(p => ({ ...p, extraCharges: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Tax (%)</label>
              <input type="number" className="input w-full" placeholder="10" value={form.tax} onChange={e => setForm(p => ({ ...p, tax: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Discount ($)</label>
              <input type="number" className="input w-full" placeholder="0.00" value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))} />
            </div>
          </div>
          <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Total</span>
            <span className="text-xl font-bold text-slate-900">{fmt(Math.max(0, total))}</span>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
        <button onClick={onClose} className="btn-secondary px-5">Cancel</button>
        <button onClick={onClose} className="btn-primary px-5"><Send className="w-4 h-4" />Generate Invoice</button>
      </div>
    </Overlay>
  );
};

// Record Payment Modal
const RecordPaymentModal = ({ invoice, onClose }: { invoice: Invoice | null; onClose: () => void }) => {
  const [method, setMethod] = useState('Credit Card');
  const [amount, setAmount] = useState(invoice ? String(invoice.total) : '');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');

  return (
    <Overlay onClose={onClose}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Record Payment</h2>
          <p className="text-sm text-slate-500 mt-0.5">{invoice ? `Invoice ${invoice.id} · ${invoice.guest}` : 'Record a new payment'}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
      </div>
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount ($)</label>
            <input type="number" className="input w-full" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Payment Date</label>
            <input type="date" className="input w-full" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {['Credit Card', 'Debit Card', 'UPI', 'Bank Transfer', 'Stripe', 'PayPal'].map(m => {
              const Icon = paymentMethodIcons[m] || CreditCard;
              return (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${method === m ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  <Icon className="w-5 h-5" />
                  {m}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Notes (optional)</label>
          <textarea className="input w-full h-20 resize-none" placeholder="Add any payment notes..." value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
      </div>
      <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
        <button onClick={onClose} className="btn-secondary px-5">Cancel</button>
        <button onClick={onClose} className="btn-primary px-5"><CheckCircle2 className="w-4 h-4" />Confirm Payment</button>
      </div>
    </Overlay>
  );
};

// Refund Modal
const RefundModal = ({ invoice, onClose }: { invoice: Invoice | null; onClose: () => void }) => {
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(invoice ? String(invoice.total) : '');

  return (
    <Overlay onClose={onClose}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Issue Refund</h2>
          <p className="text-sm text-slate-500 mt-0.5">{invoice ? `${invoice.id} · ${invoice.guest}` : 'Process a refund'}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
      </div>
      <div className="p-6 space-y-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 font-medium">Refunds are irreversible. Please review the details carefully before confirming.</p>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Refund Amount ($)</label>
          <input type="number" className="input w-full" value={amount} onChange={e => setAmount(e.target.value)} max={invoice?.total} />
          {invoice && <p className="text-xs text-slate-400">Max refundable: {fmt(invoice.total)}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Reason for Refund</label>
          <select className="input w-full" value={reason} onChange={e => setReason(e.target.value)}>
            <option value="">Select a reason...</option>
            <option>Guest Cancellation</option>
            <option>Property Issue</option>
            <option>Booking Error</option>
            <option>Duplicate Payment</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Additional Notes</label>
          <textarea className="input w-full h-20 resize-none" placeholder="Describe the reason in detail..." />
        </div>
      </div>
      <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
        <button onClick={onClose} className="btn-secondary px-5">Cancel</button>
        <button onClick={onClose} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"><RefreshCcw className="w-4 h-4" />Process Refund</button>
      </div>
    </Overlay>
  );
};

// Invoice Detail Panel
const InvoiceDetailPanel = ({ invoice, onClose, onRecordPayment, onRefund }: {
  invoice: Invoice;
  onClose: () => void;
  onRecordPayment: (inv: Invoice) => void;
  onRefund: (inv: Invoice) => void;
}) => {
  const cfg = statusConfig[invoice.status];
  const Icon = paymentMethodIcons[invoice.paymentMethod] || CreditCard;
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl border-l border-slate-200 z-40 flex flex-col"
    >
      <div className="p-6 border-b border-slate-100 flex items-start justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-slate-900">{invoice.id}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
          </div>
          <p className="text-sm text-slate-500">Issued {invoice.issuedDate}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Guest Info */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guest Details</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{invoice.guest}</p>
              <p className="text-sm text-slate-500">{invoice.bookingId}</p>
            </div>
          </div>
        </div>

        {/* Booking Info */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booking Info</p>
          <div className="space-y-2.5">
            {[
              { label: 'Property', value: invoice.property, icon: Building },
              { label: 'Room', value: invoice.room, icon: FileText },
              { label: 'Due Date', value: invoice.dueDate, icon: Calendar },
              { label: 'Payment Method', value: invoice.paymentMethod, icon: Icon },
            ].map(({ label, value, icon: Ic }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Ic className="w-4 h-4" />
                  {label}
                </div>
                <span className="text-sm font-semibold text-slate-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amount Breakdown */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Breakdown</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>{fmt(invoice.amount)}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Tax</span><span>{fmt(invoice.tax)}</span></div>
            <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200"><span>Total</span><span>{fmt(invoice.total)}</span></div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-slate-100 space-y-2 shrink-0">
        {(invoice.status === 'Pending' || invoice.status === 'Overdue' || invoice.status === 'Partial') && (
          <button onClick={() => onRecordPayment(invoice)} className="btn-primary w-full justify-center"><CheckCircle2 className="w-4 h-4" />Record Payment</button>
        )}
        {invoice.status === 'Paid' && (
          <button onClick={() => onRefund(invoice)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors"><RefreshCcw className="w-4 h-4" />Issue Refund</button>
        )}
        <button className="btn-secondary w-full justify-center"><Download className="w-4 h-4" />Download PDF</button>
        <button className="btn-secondary w-full justify-center"><Send className="w-4 h-4" />Send to Guest</button>
      </div>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function InvoicesPaymentsView() {
  const [activeSection, setActiveSection] = useState<'invoices' | 'transactions' | 'reports'>('invoices');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentTarget, setPaymentTarget] = useState<Invoice | null>(null);
  const [refundTarget, setRefundTarget] = useState<Invoice | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  // Filtered invoices
  const filtered = mockInvoices.filter(inv => {
    const matchSearch = inv.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Summary cards data
  const totalRevenue = mockInvoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.total, 0);
  const outstanding = mockInvoices.filter(i => ['Pending', 'Overdue', 'Partial'].includes(i.status)).reduce((s, i) => s + i.total, 0);
  const paidCount = mockInvoices.filter(i => i.status === 'Paid').length;
  const refundedTotal = mockInvoices.filter(i => i.status === 'Refunded').reduce((s, i) => s + i.total, 0);

  const overviewCards = [
    { label: 'Total Revenue', value: fmt(totalRevenue), change: '+18.2%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Outstanding Payments', value: fmt(outstanding), change: '3 invoices', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Paid Invoices', value: String(paidCount), change: `of ${mockInvoices.length} total`, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Refunds Issued', value: fmt(refundedTotal), change: '1 refund', icon: RefreshCcw, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  ];

  const revenueByProperty = [
    { property: 'Grand Plaza Hotel', revenue: 5195, pct: 100 },
    { property: 'Sunset Resort', revenue: 3145, pct: 61 },
    { property: 'Urban Suites', revenue: 1122, pct: 22 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices & Payments</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage booking invoices and track payments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary h-10 px-4" onClick={() => {}}>
            <Download className="w-4 h-4" />
            Export Invoices
          </button>
          <button className="btn-secondary h-10 px-4" onClick={() => { setPaymentTarget(null); setShowPaymentModal(true); }}>
            <Receipt className="w-4 h-4" />
            Record Payment
          </button>
          <button className="btn-primary h-10 px-4" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {overviewCards.map((card) => (
          <div key={card.label} className={`bg-white rounded-xl border ${card.border} p-5 shadow-sm hover:shadow-md transition-all group`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <span className={`text-xs font-bold ${card.color} ${card.bg} px-2.5 py-1 rounded-full`}>{card.change}</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {([
          { id: 'invoices', label: 'Invoices', icon: FileText },
          { id: 'transactions', label: 'Transactions', icon: Receipt },
          { id: 'reports', label: 'Financial Reports', icon: BarChart2 },
        ] as { id: 'invoices' | 'transactions' | 'reports'; label: string; icon: React.ElementType }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === tab.id ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ──── INVOICES TABLE ──── */}
      {activeSection === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                className="input w-full pl-9"
                placeholder="Search by guest, invoice or booking ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex items-center gap-1">
                {['All', 'Paid', 'Pending', 'Overdue', 'Refunded', 'Partial'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {['Invoice ID', 'Booking ID', 'Guest Name', 'Property', 'Amount', 'Tax', 'Total', 'Status', 'Due Date', ''].map(col => (
                    <th key={col} className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(inv => {
                  const cfg = statusConfig[inv.status];
                  const MethodIcon = paymentMethodIcons[inv.paymentMethod] || CreditCard;
                  return (
                    <tr
                      key={inv.id}
                      className="group hover:bg-slate-50/70 transition-colors cursor-pointer"
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-primary">{inv.id}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 font-medium">{inv.bookingId}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                            {inv.guest.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{inv.guest}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 max-w-[130px] truncate">{inv.property}</td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-700">{fmt(inv.amount)}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">{fmt(inv.tax)}</td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-900">{fmt(inv.total)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{inv.dueDate}</td>
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                          <button
                            onClick={() => setActionMenuId(actionMenuId === inv.id ? null : inv.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="w-4 h-4 text-slate-500" />
                          </button>
                          <AnimatePresence>
                            {actionMenuId === inv.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 4 }}
                                className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 w-44 py-1"
                              >
                                <button onClick={() => { setSelectedInvoice(inv); setActionMenuId(null); }} className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"><Eye className="w-4 h-4 text-slate-400" />View Details</button>
                                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"><Download className="w-4 h-4 text-slate-400" />Download PDF</button>
                                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"><Send className="w-4 h-4 text-slate-400" />Send to Guest</button>
                                {(inv.status === 'Pending' || inv.status === 'Overdue') && (
                                  <button onClick={() => { setPaymentTarget(inv); setShowPaymentModal(true); setActionMenuId(null); }} className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"><CheckCircle2 className="w-4 h-4" />Record Payment</button>
                                )}
                                {inv.status === 'Paid' && (
                                  <button onClick={() => { setRefundTarget(inv); setShowRefundModal(true); setActionMenuId(null); }} className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"><RefreshCcw className="w-4 h-4" />Issue Refund</button>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-16 text-center text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No invoices found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {filtered.length} of {mockInvoices.length} invoices</span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors">Previous</button>
              <span className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold">1</span>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* ──── TRANSACTIONS TABLE ──── */}
      {activeSection === 'transactions' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Transaction History</h3>
            <p className="text-sm text-slate-500 mt-0.5">All payment transactions across properties</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {['Transaction ID', 'Invoice', 'Guest', 'Amount', 'Method', 'Property', 'Date', 'Status'].map(col => (
                    <th key={col} className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockTransactions.map(txn => {
                  const cfg = txnStatusConfig[txn.status];
                  const Icon = paymentMethodIcons[txn.method] || CreditCard;
                  return (
                    <tr key={txn.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 text-sm font-bold text-primary">{txn.id}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 font-medium">{txn.invoiceId}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800">{txn.guest}</td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-900">{fmt(txn.amount)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Icon className="w-4 h-4 text-slate-400" />
                          {txn.method}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">{txn.property}</td>
                      <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{txn.date}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.color}`}>{txn.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ──── FINANCIAL REPORTS ──── */}
      {activeSection === 'reports' && (
        <div className="space-y-6">
          {/* Revenue by Property */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900">Revenue by Property</h3>
                <p className="text-sm text-slate-500 mt-0.5">Performance breakdown per property</p>
              </div>
              <button className="btn-secondary px-4 h-9 text-sm"><Download className="w-4 h-4" />Export</button>
            </div>
            <div className="space-y-4">
              {revenueByProperty.map((row, i) => (
                <div key={row.property} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-semibold text-slate-800">
                      <span className={`w-2.5 h-2.5 rounded-full ${['bg-primary', 'bg-indigo-400', 'bg-purple-400'][i]}`} />
                      {row.property}
                    </div>
                    <span className="font-bold text-slate-900">{fmt(row.revenue)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className={`h-full rounded-full ${['bg-primary', 'bg-indigo-400', 'bg-purple-400'][i]}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: 'Avg Booking Value', value: fmt(mockInvoices.reduce((s, i) => s + i.total, 0) / mockInvoices.length), icon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Collection Rate', value: '72.4%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Overdue Rate', value: '12.5%', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Monthly bar chart */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900">Monthly Revenue</h3>
                <p className="text-sm text-slate-500 mt-0.5">Revenue trend for the last 12 months</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Revenue
              </div>
            </div>
            <div className="flex items-end gap-2 h-48">
              {[42, 58, 45, 72, 65, 88, 74, 92, 85, 78, 95, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full bg-slate-100 rounded-t relative overflow-hidden" style={{ height: 160 }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="absolute bottom-0 left-0 right-0 bg-primary/80 group-hover:bg-primary rounded-t transition-colors"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──── MODALS & PANELS ──── */}
      {showCreateModal && <CreateInvoiceModal onClose={() => setShowCreateModal(false)} />}
      {showPaymentModal && <RecordPaymentModal invoice={paymentTarget} onClose={() => { setShowPaymentModal(false); setPaymentTarget(null); }} />}
      {showRefundModal && <RefundModal invoice={refundTarget} onClose={() => { setShowRefundModal(false); setRefundTarget(null); }} />}

      <AnimatePresence>
        {selectedInvoice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-30"
              onClick={() => setSelectedInvoice(null)}
            />
            <InvoiceDetailPanel
              invoice={selectedInvoice}
              onClose={() => setSelectedInvoice(null)}
              onRecordPayment={(inv) => { setPaymentTarget(inv); setShowPaymentModal(true); }}
              onRefund={(inv) => { setRefundTarget(inv); setShowRefundModal(true); }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Close action menu on outside click */}
      {actionMenuId && <div className="fixed inset-0 z-20" onClick={() => setActionMenuId(null)} />}
    </div>
  );
}
