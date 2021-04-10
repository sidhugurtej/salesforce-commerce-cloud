/* eslint-disable no-use-before-define */

import { AxiosInstance } from 'axios';
import { CookieOptions } from 'express';
import { ApiInstance, IntegrationContext } from '@vue-storefront/core';
import * as Apis from './api/clients/interfaces';
import {
  Checkout as SdkCheckout,
  Search as SdkSearch,
  Product as SdkProduct,
  Customer as SdkCustomer
} from 'commerce-sdk';

export type Customer = SdkCustomer.ShopperCustomers.Customer & {
  birthday?: Date;
  creationDate?: Date;
  lastLoginTime?: Date;
  lastModified?: Date;
  lastVisitTime?: Date;
  previousLoginTime?: Date;
  previousVisitTime?: Date;
};
export type ContactInfo = {
  customerId?: string;
  customerNo?: string;
  firstName: string;
  lastName: string;
  email: string;
};
export type OrderAddress = SdkCheckout.ShopperOrders.OrderAddress;
export type ShippingMethodResult = SdkCheckout.ShopperBaskets.ShippingMethodResult;
export type PaymentMethodResult = SdkCheckout.ShopperBaskets.PaymentMethodResult;
export type PaymentInstrument = SdkCheckout.ShopperOrders.BasketPaymentInstrumentRequest
export type Cart = SdkCheckout.ShopperBaskets.Basket & {
  lineItems?: LineItem[];
};
export type CartItem = SdkCheckout.ShopperBaskets.ProductItem;
export type CouponItem = SdkCheckout.ShopperBaskets.CouponItem;
export type Wishlist = Record<string, unknown>;
export type VariationAttributeValue = SdkProduct.ShopperProducts.VariationAttributeValue & {
  selected: boolean;
};
export type VariationAttribute = SdkProduct.ShopperProducts.VariationAttribute & {
  values?: VariationAttributeValue[]
};
export type Variant = SdkProduct.Products.Variant;

export type Product = {
  _id: string;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  attributes?: VariationAttribute[];
  variationValues?: { [key: string]: string };
  variants?: Variant[];
  price: {
    original: number;
    current: number;
  };
}
export type Category = SdkProduct.ShopperProducts.Category & {
  c_showInMenu: boolean;
};
export type ProductHitTypeSearchParam = ('product' | 'master' | 'set' | 'bundle' | 'slicing_group' | 'variation_group')[];
export type ProductSearchRefinementValue = SdkSearch.ShopperSearch.ProductSearchRefinementValue & {
  selected: boolean;
  values?: ProductSearchRefinementValue[];
};
export type ProductSearchRefinement = SdkSearch.ShopperSearch.ProductSearchRefinement & {
  values?: ProductSearchRefinementValue[];
};
export type ProductSortingOption = SdkSearch.ShopperSearch.ProductSearchSortingOption & {
  selected: boolean;
};
export type ProductSearchParams = {
  q?: string;
  categorySlug?: string;
  filters?: {
    promoId?: string;
    hitType?: ProductHitTypeSearchParam;
    orderableOnly?: boolean;
    attributes?: {
      [attr: string]: string | string[];
    };
  };
  sort?: string;
  page: number;
  itemsPerPage: number;
}
export type ProductSearchResponse = {
  total: number;
  products: Product[];
  filters: ProductSearchRefinement[];
  selectedFilters: Record<string, string[]>;
  sortOptions: ProductSortingOption[];
}
export type CategoryFilter = Record<string, unknown>;
export type PaymentMethod = SdkCheckout.ShopperOrders.PaymentMethod;
export type ShippingMethod = SdkCheckout.ShopperOrders.ShippingMethod;
export declare type BasketShippingMethods = SdkCheckout.ShopperBaskets.ShippingMethodResult;
export type LineItem = Product & {
  itemId: string;
  quantity: number;
};
export type Order = SdkCheckout.ShopperOrders.Order;

export type ApiClients = {
  CustomersApi: Apis.CustomersApi,
  CategoriesApi: Apis.CategoriesApi,
  ProductsApi: Apis.ProductsApi,
  ProductSearchApi: Apis.ProductSearchApi,
  CartsApi: Apis.CartsApi,
  OrdersApi: Apis.OrdersApi
}

export type SfccSetupConfig = IntegrationContext<ApiClients, ApiClientSettings>;

export type SfccIntegrationContext = IntegrationContext<ApiClients, ApiClientSettings, ContextualizedEndpoints>;

export type Endpoints = {
  guestSignIn(context: SfccIntegrationContext): Promise<void>;
  refreshToken(context: SfccIntegrationContext): Promise<void>;
  signIn(context: SfccIntegrationContext, username: string, password: string): Promise<Customer>;
  getCustomer(context: SfccIntegrationContext): Promise<Customer>;
  createCustomer(context: SfccIntegrationContext, email: string, password: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomer(context: SfccIntegrationContext, email: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomerPassword(context: SfccIntegrationContext, currentPassword: string, newPassword: string): Promise<Customer>;
  getCategory(context: SfccIntegrationContext, id: string, levels?: number): Promise<Category>;
  searchProducts(context: SfccIntegrationContext, params: ProductSearchParams): Promise<ProductSearchResponse>;
  getProduct(context: SfccIntegrationContext, id: string): Promise<Product>;
  getProducts(context: SfccIntegrationContext, ids: string[]): Promise<Product[]>;
  getCart(context: SfccIntegrationContext,): Promise<Cart>;
  resetCart(context: SfccIntegrationContext, cartId: string): Promise<Cart>;
  addToCart(context: SfccIntegrationContext, cartId: string, product: Product, quantity: number): Promise<Cart>;
  removeFromCart(context: SfccIntegrationContext, cartId: string, item: LineItem): Promise<Cart>;
  addCouponToCart(context: SfccIntegrationContext, cartId: string, couponCode: string): Promise<Cart>;
  removeCouponFromCart(context: SfccIntegrationContext, cartId: string, couponItemId: string): Promise<Cart>;
  updateCartItem(context: SfccIntegrationContext, cartId: string, item: LineItem, quantity: number): Promise<Cart>;
  getApplicablePaymentMethods(context: SfccIntegrationContext, cartId: string): Promise<PaymentMethod[]>;
  getApplicableShippingMethods(context: SfccIntegrationContext, cartId: string): Promise<BasketShippingMethods>;
  saveShippingAddress(context: SfccIntegrationContext, cartId: string, shippingAddress: OrderAddress, shipmentId?: string): Promise<Cart>;
  saveShippingMethod(context: SfccIntegrationContext, cartId: string, shippingAddress: OrderAddress, shipmentId?: string): Promise<Cart>;
  saveBillingAddress(context: SfccIntegrationContext, cartId: string, billingAddress: OrderAddress): Promise<Cart>;
  savePaymentInstrument(context: SfccIntegrationContext, cartId: string, paymentMethodId: string, amount: number, body: any): Promise<Cart>;
  updateCart(context: SfccIntegrationContext, cartId: string, contactInfo: ContactInfo, shippingAddress: OrderAddress, shippingMethodId: string, billingAddress: OrderAddress, paymentMethodId: string): Promise<Cart>;
  createOrder(context: SfccIntegrationContext, cartId: string): Promise<Order>;
};

export type ContextualizedEndpoints = {
  [T in keyof Endpoints]: Endpoints[T] extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
};

export interface ApiClientSettings {
  origin: string;
  clientId?: string;
  siteId: string;
  ocapiVersion: string;
  commerceApiVersion?: string;
  shortCode?: string;
  organizationId?: string;
  enableCommerceApi?: boolean;
  locale?: string;
  jwtToken?: string;
  cache?: boolean;
  timeout?: number;
  viewType?: string;
  enableCookies?: boolean;
  overrideHttpPut?: boolean;
  defaultHeaders?: Record<string, string>;
  cookieNames?: {
    authToken?: string;
  },
  clientHeaders: {
    locale?: string;
  },
  callbacks?: {
    auth?: {
      onSessionTimeout?: (isGuest: boolean) => void;
      onTokenChange?: (token: string) => void;
    };
  };
  overrides?: Partial<Endpoints>;
}

export interface Context {
  $sfcc: SfccIntegrationContext;
}

export interface AppContext {
  $vsf: Context;
}

export interface SfccApiInstance extends ApiInstance {
  api: Endpoints,
  client: AxiosInstance,
  settings: ApiClientSettings
}
