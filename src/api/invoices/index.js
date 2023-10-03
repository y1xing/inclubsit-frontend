import { endOfDay, startOfDay } from 'date-fns';
import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';

import { invoice, invoices } from './data';

class InvoicesApi {
  getInvoices(request = {}) {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(invoices);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((invoice) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const matched = invoice.number.toLowerCase().includes(filters.query.toLowerCase());

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.startDate !== 'undefined') {
          if (typeof invoice.issueDate === 'undefined') {
            return false;
          }

          const matched = endOfDay(invoice.issueDate) >= startOfDay(filters.startDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.endDate !== 'undefined') {
          if (typeof invoice.issueDate === 'undefined') {
            return false;
          }

          const matched = startOfDay(invoice.issueDate) <= endOfDay(filters.endDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.customers !== 'undefined' && filters.customers.length > 0) {
          const matched = filters.customers.includes(invoice.customer.name);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.status !== 'undefined') {
          if (invoice.status !== filters.status) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  getInvoice(request) {
    return Promise.resolve(deepCopy(invoice));
  }
}

export const invoicesApi = new InvoicesApi();
