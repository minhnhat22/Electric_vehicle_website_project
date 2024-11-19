import HomePage from '../pages/HomePage/HomePage';
import ProductdetailsPage from '../pages/ProductdetailsPage/ProductdetailsPage';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import Storecriteriapage from '../pages/Storecriteriapage/Storecriteriapage.jsx';
import NewsPage from '../pages/NewsPage/NewsPage.jsx';
import TextPage from '../pages/TextPage/TextPage.jsx';
import ViewInvoicePage from '../pages/ViewInvoicePage/ViewInvoicePage.jsx';
import ViewInvoiceDetailsPage from '../pages/ViewInvoiceDetailsPage/ViewInvoiceDetailsPage.jsx';

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true
  },
 
  {
    path: '/productdetails/:productId',
    page: ProductdetailsPage,
    isShowHeader: true
  },

  {
    path: '/orders',
    page: OrdersPage,
    isShowHeader: true
  },

  {
    path: '/Storecriteria',
    page: Storecriteriapage, // Chỉ định Storecriteriapage cho route /Storecriteria
    isShowHeader: true
  },

  {
    path: '/news',
    page: NewsPage,
    isShowHeader: true
  },

  {
    path: '/test/:id',
    page: TextPage,
    isShowHeader: true
  },

  {
    path: '/viewinvoice',
    page: ViewInvoicePage,
    isShowHeader: true
  },

  {
    path: '/viewinvoicedetails',
    page: ViewInvoiceDetailsPage,
    isShowHeader: true
  },
];
