import {
  Address,
  Company,
  EPaymentMethod,
  EPaymentStatus,
  EPaymentType,
  Payment,
  User,
} from "../backend/casaikos-api";

export const mockPayments: Payment[] = [
  {
    _id: "pay_001",
    bookingId: "book_123",
    type: EPaymentType.DEPOSIT,
    method: EPaymentMethod.STRIPE,
    status: EPaymentStatus.PAID,
    maximumDate: "2025-08-20T18:00:00.000Z",
    paymentDate: "2025-08-15T14:30:00.000Z",
    amount: 150.5,
    description: "Home nursing service payment",
    collector: {
      _id: "user_001",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
    } as User,
    company: {
      _id: "comp_001",
      name: "MediCare Services",
      address: {} as Address,
    } as Company,
    createdAt: "2025-08-14T09:15:00.000Z",
    createdBy: "admin_01",
  },
];
