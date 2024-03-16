import {makeAutoObservable} from 'mobx';
import {productApi} from '../../api/products';
import {
  IAddAmountProduct,
  IAddNewProduct,
  IEditProduct,
  IGetProductsParams,
  IOrganisation,
  IProducts,
} from '../../api/products/types';
import {addAxiosErrorNotification, successNotification} from '../../utils/notification';
class ProductsStore {
  products: IProducts[] = [];
  totalProducts = 0;
  organisations: IOrganisation[] = [];
  isOpenProductModal = false;
  page = 1;
  size = 10;
  isOpenAmountModal = false;
  singleProduct: IProducts | null = null;
  search: string | null = null;
  isOpenEditProductModal = false;
  editProductStore: IProducts | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = (params: IGetProductsParams) =>
    productApi.getProducts(params)
      .then(res => {
        if (res) {
          this.setProducts(res?.productList);
          this.setTotalProducts(res?.totalProducts);
        }
      })
      .catch(addAxiosErrorNotification);

  editProducts = (params: IEditProduct) =>
    productApi.updateProduct(params)
      .then(res => {
        if (res) {
          this.getProducts({
            search: this.search!,
            page: this.page,
            size: this.size,
          });
        }
      })
      .catch(addAxiosErrorNotification);

  getOrganisation = () =>
    productApi.getOrganisation()
      .then(res => {
        if (res) {
          this.setOrganisation(res?.data);
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  addProducts = (params: IAddNewProduct) =>
    productApi.addNewProduct(params)
      .then(res => {
        if (res) {
          successNotification('Success add new product');

          this.getProducts({
            page: this.page,
            size: this.size,
          });
        }

        return res;
      })
      .catch(addAxiosErrorNotification);

  productAmountChange = (params: IAddAmountProduct) =>
    productApi.productAmountChange(params)
      .then(res => {
        if (res) {
          successNotification('Success change amount');

          this.getProducts({
            page: this.page,
            size: this.size,
          });
        }
      })
      .catch(addAxiosErrorNotification);

  setIsOpenProductEditModal = (isOpen: boolean) => {
    this.isOpenEditProductModal = isOpen;
  };

  setEditProduct = (product: IProducts | null) => {
    this.editProductStore = product;
  };

  setProducts = (products: IProducts[]) => {
    this.products = products;
  };

  setIsOpenProductModal = (isOpen: boolean) => {
    this.isOpenProductModal = isOpen;
  };

  setOrganisation = (organisation: IOrganisation[]) => {
    this.organisations = organisation;
  };

  setTotalProducts = (total: number) => {
    this.totalProducts = total;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setSize = (size: number) => {
    this.size = size;
  };

  setIsAmountModal = (isOpen: boolean) => {
    this.isOpenAmountModal = isOpen;
  };

  setSingleProduct = (singleProduct: IProducts | null) => {
    this.singleProduct = singleProduct;
  };

  setSearch = (search: string) => {
    this.search = search;
  };

  reset() {
    this.products = [];
    this.totalProducts = 0;
    this.organisations = [];
    this.isOpenProductModal = false;
    this.page = 1;
    this.size = 10;
  }
}

export const productStore = new ProductsStore();
