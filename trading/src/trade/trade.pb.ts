/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "bitget";

export interface PlaceOrderRequest {
  symbol: string;
  side: string;
  orderType: string;
  force: string;
  price: string;
  quantity: string;
  clientOrderId: string;
}

export interface OrderResponse {
  orderId: string;
  clientOrderId: string;
}

export interface BatchOrderRequest {
  symbol: string;
  orderList: OrderData[];
}

export interface OrderData {
  side: string;
  orderType: string;
  force: string;
  price: string;
  quantity: string;
  clientOrderId: string;
}

export interface BatchOrderResponse {
  resultList: OrderResult[];
  failure: OrderFailure[];
}

export interface OrderResult {
  orderId: string;
  clientOrderId: string;
}

export interface OrderFailure {
  orderId: string;
  clientOrderId: string;
  errorMsg: string;
}

export interface CancelOrderRequest {
  symbol: string;
  orderId: string;
  clientOid: string;
}

export interface OrderDetailsRequest {
  symbol: string;
  orderId: string;
  clientOrderId: string;
}

export interface OrderDetailsResponse {
  data: OrderInfo[];
}

export interface OrderInfo {
  accountId: string;
  symbol: string;
  orderId: string;
  clientOrderId: string;
  price: string;
  quantity: string;
  orderType: string;
  side: string;
  status: string;
  fillPrice: string;
  fillQuantity: string;
  fillTotalAmount: string;
  enterPointSource: string;
  feeDetail: string;
  orderSource: string;
  cTime: string;
}

export interface OrderListRequest {
  symbol: string;
}

export interface OrderListResponse {
  data: OrderInfo[];
}

export interface OrderHistoryRequest {
  symbol: string;
  after: string;
  before: string;
  limit: number;
}

export interface OrderHistoryResponse {
  data: OrderInfo[];
}

export interface TransactionDetailsRequest {
  symbol: string;
  orderId: string;
  after: string;
  before: string;
  limit: number;
}

export interface TransactionDetailsResponse {
  data: TransactionInfo[];
}

export interface TransactionInfo {
  accountId: string;
  symbol: string;
  orderId: string;
  fillId: string;
  orderType: string;
  side: string;
  fillPrice: string;
  fillQuantity: string;
  fillTotalAmount: string;
  cTime: string;
  feeCcy: string;
  fees: string;
}

/** No parameters required */
export interface ApiKeyInfoRequest {
}

export interface ApiKeyInfoResponse {
  userId: string;
  inviterId: string;
  ips: string;
  authorities: string[];
  parentId: string;
  trader: boolean;
  isSpotTrader: boolean;
}

export interface AccountAssetsRequest {
  coin: string;
}

export interface AccountAssetsResponse {
  data: AssetInfo[];
}

export interface AssetInfo {
  coinId: string;
  coinName: string;
  available: string;
  frozen: string;
  lock: string;
  uTime: string;
}

export interface TransferListRequest {
  symbol: string;
  after: string;
  before: string;
  limit: number;
}

export interface TransferListResponse {
  data: TransferInfo[];
}

/** Fields as per the API specification */
export interface TransferInfo {
}

export const BITGET_PACKAGE_NAME = "bitget";

/** Trading service for handling trading operations */

export interface TradingServiceClient {
  placeOrder(request: PlaceOrderRequest): Observable<OrderResponse>;

  batchOrder(request: BatchOrderRequest): Observable<BatchOrderResponse>;

  cancelOrder(request: CancelOrderRequest): Observable<OrderResponse>;

  getOrderDetails(request: OrderDetailsRequest): Observable<OrderDetailsResponse>;

  getOrderList(request: OrderListRequest): Observable<OrderListResponse>;

  getOrderHistory(request: OrderHistoryRequest): Observable<OrderHistoryResponse>;

  getTransactionDetails(request: TransactionDetailsRequest): Observable<TransactionDetailsResponse>;
}

/** Trading service for handling trading operations */

export interface TradingServiceController {
  placeOrder(request: PlaceOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;

  batchOrder(
    request: BatchOrderRequest,
  ): Promise<BatchOrderResponse> | Observable<BatchOrderResponse> | BatchOrderResponse;

  cancelOrder(request: CancelOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;

  getOrderDetails(
    request: OrderDetailsRequest,
  ): Promise<OrderDetailsResponse> | Observable<OrderDetailsResponse> | OrderDetailsResponse;

  getOrderList(
    request: OrderListRequest,
  ): Promise<OrderListResponse> | Observable<OrderListResponse> | OrderListResponse;

  getOrderHistory(
    request: OrderHistoryRequest,
  ): Promise<OrderHistoryResponse> | Observable<OrderHistoryResponse> | OrderHistoryResponse;

  getTransactionDetails(
    request: TransactionDetailsRequest,
  ): Promise<TransactionDetailsResponse> | Observable<TransactionDetailsResponse> | TransactionDetailsResponse;
}

export function TradingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "placeOrder",
      "batchOrder",
      "cancelOrder",
      "getOrderDetails",
      "getOrderList",
      "getOrderHistory",
      "getTransactionDetails",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TradingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TradingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TRADING_SERVICE_NAME = "TradingService";

/** Account service for handling account-related operations */

export interface AccountServiceClient {
  getApiKeyInfo(request: ApiKeyInfoRequest): Observable<ApiKeyInfoResponse>;

  getAccountAssets(request: AccountAssetsRequest): Observable<AccountAssetsResponse>;

  getTransferList(request: TransferListRequest): Observable<TransferListResponse>;
}

/** Account service for handling account-related operations */

export interface AccountServiceController {
  getApiKeyInfo(
    request: ApiKeyInfoRequest,
  ): Promise<ApiKeyInfoResponse> | Observable<ApiKeyInfoResponse> | ApiKeyInfoResponse;

  getAccountAssets(
    request: AccountAssetsRequest,
  ): Promise<AccountAssetsResponse> | Observable<AccountAssetsResponse> | AccountAssetsResponse;

  getTransferList(
    request: TransferListRequest,
  ): Promise<TransferListResponse> | Observable<TransferListResponse> | TransferListResponse;
}

export function AccountServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getApiKeyInfo", "getAccountAssets", "getTransferList"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNT_SERVICE_NAME = "AccountService";
