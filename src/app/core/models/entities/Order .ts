export interface Order {
    id: number;
    custId: number;
    empId: number;
    shipperId: number;
    productId: number;
    orderDate?: string;
    requiredDate?: string;
    shippedDate?: string;
    shipName?: string;
    shipAddress?: string;
    shipCity?: string;
    freight: number;
    shipCountry?: string;
    unitPrice: number;
    qty: number;
    discount: number;
  }
  