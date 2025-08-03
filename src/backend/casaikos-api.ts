/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum ETaskSelectFields {
  Title = "title",
  Status = "status",
  Priority = "priority",
  DueDate = "dueDate",
  CompletedAt = "completedAt",
  IsArchived = "isArchived",
  Tags = "tags",
  CreatedAt = "createdAt",
  Agent = "agent",
  AssignedTo = "assignedTo",
  Owner = "owner",
  Tenant = "tenant",
  Booking = "booking",
  Notes = "notes",
}

export enum ETaskSortFields {
  Title = "title",
  Status = "status",
  Priority = "priority",
  DueDate = "dueDate",
  CreatedAt = "createdAt",
}

export enum ETaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Urgent = "urgent",
}

export enum ETaskStatus {
  Todo = "todo",
  InProgress = "in_progress",
  Done = "done",
  Blocked = "blocked",
}

export enum EFrequency {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

export enum EChannel {
  Whatsapp = "Whatsapp",
  Email = "Email",
}

export enum EModuleNames {
  Users = "users",
  Owners = "owners",
  Invoices = "invoices",
  Companies = "companies",
  Department = "department",
  Tenants = "tenants",
  TenantHostedFiles = "tenantHostedFiles",
  PropertyHostedFiles = "propertyHostedFiles",
  PayrollFiles = "payrollFiles",
  EmailsPropertiesCRM = "emailsPropertiesCRM",
  EmailsLogsTenants = "emailsLogsTenants",
  WhatsappPropertiesCRMChat = "whatsappPropertiesCRMChat",
  Chat = "chat",
  TelegramLogs = "telegramLogs",
  Bookings = "bookings",
  Payrolls = "payrolls",
  Properties = "properties",
  Campaigns = "campaigns",
  Enquiries = "enquiries",
  TimesheetSettings = "timesheetSettings",
  Timesheets = "timesheets",
  Availability = "availability",
  HistoryLogs = "historyLogs",
  Notifications = "notifications",
  HostedFiles = "hostedFiles",
  Notes = "notes",
}

export enum EWebsocketType {
  Select = "select",
  Message = "message",
  Notification = "notification",
  Email = "email",
  Connect = "connect",
  REFRESH = "REFRESH",
}

export enum EOwnerSelectFields {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
}

export enum EOwnerSortFields {
  FirstName = "firstName",
  AddressCity = "address.city",
  AddressZip = "address.zip",
  AgentFirstName = "agent.firstName",
  IsProfileComplete = "isProfileComplete",
}

export enum EPropertySelectFields {
  Title = "title",
  OwnerFirstName = "owner.firstName",
  PropertyType = "propertyType",
  PropertySize = "propertySize",
  AddressCity = "address.city",
  AddressCountry = "address.country",
  CompliancesStatus = "compliancesStatus",
  Compliances = "compliances",
}

export enum EPropertySortFields {
  Title = "title",
  PropertyType = "propertyType",
  OwnerFirstName = "owner.firstName",
  PropertySize = "propertySize",
  AgentFirstName = "agent.firstName",
  AddressCountry = "address.country",
  AddressCity = "address.city",
  AddressZip = "address.zip",
  IsProfileComplete = "isProfileComplete",
  ComplianceWarningDaysBeforeExpiry = "compliance.warningDaysBeforeExpiry",
}

export enum ESocketRefreshModule {
  USERS = "USERS",
  PROPERTIES = "PROPERTIES",
  AVAILABILITIES = "AVAILABILITIES",
  TARGETS = "TARGETS",
  TENANTS = "TENANTS",
  OWNERS = "OWNERS",
  BOOKINGS = "BOOKINGS",
  COMPANIES = "COMPANIES",
  PAYMENTS = "PAYMENTS",
  TASKS = "TASKS",
  MESSAGES = "MESSAGES",
}

export enum ENotificationType {
  BOOKING_CREATED = "BOOKING_CREATED",
  BOOKING_CANCELLED = "BOOKING_CANCELLED",
  BOOKING_CHECKED_IN = "BOOKING_CHECKED_IN",
  BOOKING_CHECKED_OUT = "BOOKING_CHECKED_OUT",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  TENANT_CREATED = "TENANT_CREATED",
  AI_NOT_RESPONDING = "AI_NOT_RESPONDING",
}

export enum ETenantSelectFields {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
}

export enum ETenantSortFields {
  FirstName = "firstName",
  PassportNationality = "passport.nationality",
  AddressCity = "address.city",
  AgentFirstName = "agent.firstName",
  IsProfileComplete = "isProfileComplete",
  CreatedAt = "createdAt",
}

export enum EBookingSelectFields {
  From = "from",
  To = "to",
}

export enum EBookingSortFields {
  TenantFirstName = "tenant.firstName",
  PropertyTitle = "property.title",
  From = "from",
  To = "to",
  TotalAmount = "totalAmount",
  LastStatusValue = "lastStatus.value",
  AgentFirstName = "agent.firstName",
}

export enum EPaymentStatus {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  PAID = "PAID",
  ABORTED = "ABORTED",
  DUPLICATED = "DUPLICATED",
  UNKNOWN_PAYMENT = "UNKNOWN_PAYMENT",
}

export enum EPaymentMethod {
  STRIPE = "STRIPE",
  BANK = "BANK",
  CASH = "CASH",
}

export enum EPaymentType {
  DEPOSIT = "DEPOSIT",
  RENT = "RENT",
}

export enum EBookingStatus {
  INITIAL = "INITIAL",
  VIEWING = "VIEWING",
  TENANT_REJECTED_BEFORE_BOOKING = "TENANT_REJECTED_BEFORE_BOOKING",
  AGENT_DECLINED_BEFORE_BOOKING = "AGENT_DECLINED_BEFORE_BOOKING",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  BOOKED = "BOOKED",
  TENANT_CANCELED_AFTER_BOOKING = "TENANT_CANCELED_AFTER_BOOKING",
  AGENT_CANCELED_AFTER_BOOKING = "AGENT_CANCELED_AFTER_BOOKING",
  CHECK_IN = "CHECK_IN",
  AGENT_STOPPED_DURING_RENT = "AGENT_STOPPED_DURING_RENT",
  TENANT_STOPPED_DURING_RENT = "TENANT_STOPPED_DURING_RENT",
  CHECK_OUT = "CHECK_OUT",
  REFUND = "REFUND",
  DONE = "DONE",
}

/** @default "time" */
export enum EPayOption {
  Time = "time",
  Fixed = "fixed",
}

export enum EEnquiryStatus {
  Hired = "hired",
  Pending = "pending",
  Active = "active",
  Closed = "closed",
}

/** Status of compliance */
export enum EComplianceStatus {
  Passed = "passed",
  Warning = "warning",
  Expired = "expired",
  IssuesFound = "issues_found",
  NotAssigned = "not_assigned",
}

export enum EComplianceType {
  DEWA_BILL = "DEWA_BILL",
  EJARI = "EJARI",
  WIFI_SUBSCRIPTION = "WIFI_SUBSCRIPTION",
  AC_MAINTENANCE = "AC_MAINTENANCE",
  FIRE_SAFETY = "FIRE_SAFETY",
  PEST_CONTROL = "PEST_CONTROL",
  TOURISM_PERMIT = "TOURISM_PERMIT",
  INSURANCE = "INSURANCE",
}

export enum ETenantType {
  FAMILY = "FAMILY",
  BACHELORS = "BACHELORS",
  MIXED = "MIXED",
  PROFESSIONALS = "PROFESSIONALS",
  STUDENTS = "STUDENTS",
}

export enum EAmenityType {
  AirConditioning = "Air Conditioning",
  PetsAllowed = "Pets Allowed",
  Balcony = "Balcony",
  CableTV = "Cable TV",
  Internet = "Internet",
  Parking = "Parking",
  SwimmingPool = "Swimming Pool",
  Gym = "Gym",
  Garden = "Garden",
  Security = "Security",
  MaidService = "Maid Service",
  Laundry = "Laundry",
}

export enum EPropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  STUDIO = "STUDIO",
  VILLA = "VILLA",
  PENTHOUSE = "PENTHOUSE",
  TOWNHOUSE = "TOWNHOUSE",
}

export enum EAvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  NOT_AVAILABLE = "NOT_AVAILABLE",
  RENTED = "RENTED",
  FREE = "FREE",
}

export enum EChatMessageType {
  AgentTookLead = "AgentTookLead",
  AiTookLead = "AiTookLead",
}

export enum EUserSelectFields {
  FirstName = "firstName",
  LastName = "lastName",
}

export enum EUsersSortFields {
  FirstName = "firstName",
  Email = "email",
  PhoneNumber = "phoneNumber",
  Role = "role",
  CreatedAt = "createdAt",
}

export enum EUserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  AGENT = "AGENT",
  OPERATION = "OPERATION",
}

export enum ECompanySelectFields {
  Name = "name",
  FirstName = "firstName",
  WhatsappWebhookVerifyToken = "whatsappWebhookVerifyToken",
}

export enum ECompanySortFields {
  Name = "name",
  Email = "email",
  PhoneNumber = "phoneNumber",
  AddressCity = "address.city",
}

export enum EOrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export enum EGender {
  Male = "male",
  Female = "female",
}

export interface AddressDto {
  street?: string;
  district?: string;
  city?: string;
  country?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export interface Bank {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  branchCode: string;
}

export interface CreateCompanyDto {
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  address: AddressDto;
  bank: Bank;
  aiName: string;
  aiGender: EGender;
  airbnbProfile?: string;
  adminPhoneNumber: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  whatsappPhoneId?: string;
  whatsappAccessToken?: string;
  whatsappWebhookVerifyToken?: string;
}

export interface Address {
  street?: string;
  district?: string;
  city?: string;
  country?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export interface Company {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  name: string;
  website: string;
  email: string;
  phoneNumber: string;
  address: Address;
  bank: Bank;
  logo: string;
  aiName: string;
  aiGender: EGender;
  airbnbProfile: string;
  whatsappPhoneId: string;
  whatsappAccessToken: string;
  whatsappWebhookVerifyToken: string;
  stripeAccountId: string;
  isWhatsappValid: boolean;
}

export interface PaginationDto {
  page?: number;
  pageSize?: number;
  bypassPagination?: boolean;
}

export interface CompanyFilterDto {
  name?: string;
  whatsappWebhookVerifyToken?: string;
  cities?: string[];
}

export interface CompanySortDto {
  sortDirection?: EOrderDirection;
  sortBy?: ECompanySortFields;
}

export interface FetchCompaniesDto {
  pagination?: PaginationDto;
  filter?: CompanyFilterDto;
  sort?: CompanySortDto;
  select?: ECompanySelectFields[];
}

export interface UpdateWhatsappConfigDto {
  whatsappPhoneId: string;
  whatsappAccessToken: string;
  whatsappWebhookVerifyToken: string;
}

export interface CreateUserDto {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: EUserRole;
  company: string;
}

export interface RefreshToken {
  token: string;
  deviceId: string;
  /** @format date-time */
  expiresAt: string;
}

export interface User {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: EUserRole;
  refreshTokens: RefreshToken[];
  company: Company;
}

export interface UserFilterDto {
  name?: string;
}

export interface UsersSortDto {
  sortDirection?: EOrderDirection;
  sortBy?: EUsersSortFields;
}

export interface FetchUsersDto {
  pagination?: PaginationDto;
  filter?: UserFilterDto;
  sort?: UsersSortDto;
  select?: EUserSelectFields[];
}

export interface UpdateUserDto {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: EUserRole;
  company?: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  otpRequired: boolean;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface ForgetPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
}

export interface SendMessageDto {
  /** Tenant id */
  tenantId: string;
  message: string;
  /** @format binary */
  file: File;
}

export interface Metadata {
  display_phone_number: string;
  phone_number_id: string;
}

export interface Profile {
  name: string;
}

export interface Contact {
  profile: Profile;
  wa_id: string;
}

export interface Text {
  body: string;
}

export interface Image {
  filename: string;
  caption: string;
  mime_type: string;
  sha256: string;
  id: string;
}

export interface Document {
  filename: string;
  caption: string;
  mime_type: string;
  sha256: string;
  id: string;
}

export interface Message {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: Text;
  image?: Image;
  document?: Document;
}

export interface Value {
  messaging_product: string;
  metadata: Metadata;
  contacts: Contact[];
  messages: Message[];
}

export interface Change {
  field: string;
  value: Value;
}

export interface Entry {
  id: string;
  changes: Change[];
}

export interface WebhookReceivedBody {
  object: string;
  entry: Entry[];
}

export interface HostedFile {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  fileName: string;
  fileKey: string;
  /** @format date-time */
  timestamp: string;
}

export interface WhatsappChat {
  _id: string;
  message: string;
  hostedFile?: HostedFile;
  /** @format date-time */
  timestamp: string;
  isRead?: boolean;
  isReply: boolean;
  type?: EChatMessageType;
  agent?: User;
  isAiRecommendationOn: boolean;
  tenant: object;
}

export interface Passport {
  passportNumber?: string;
  /** @format date-time */
  issueDate?: string;
  /** @format date-time */
  expiryDate?: string;
  nationality?: string;
  /** @format date-time */
  dateOfBirth?: string;
  placeOfBirth?: string;
}

export interface FileHosted {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  /** Name of the uploaded file */
  fileName: string;
  /** Storage key or path for the file */
  fileKey: string;
  /**
   * When the file was uploaded
   * @default "Current date/time"
   */
  timestamp: string;
}

export interface Tenant {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  whatsappId: string;
  passport?: Passport;
  address?: Address;
  agent?: User;
  isProfileComplete: boolean;
  company: Company;
  files?: FileHosted[];
}

export interface ChatListItemDto {
  tenant: Tenant;
  lastMessage: string;
  /** @format date-time */
  lastMessageTimestamp: string;
  unreadMessagesCount: number;
  isReply: boolean;
}

export interface ReadChatDto {
  tenantId: string;
}

export interface UpdateConversationLeadDto {
  /** Tenant id */
  tenantId: string;
  /** Agent id */
  agentId?: string;
  lead: EChatMessageType;
}

export interface AddAvailabilityDto {
  from: string;
  to?: string;
  propertyId: string;
  rate: number;
}

export interface Note {
  _id: string;
  text: string;
  /** @format date-time */
  createdAt: string;
  user: User;
  title?: string;
  images: HostedFile[];
}

export interface PropertyTarget {
  _id: string;
  monthNumber: number;
  yearNumber: number;
  value: number;
  monthlyDiscount: number;
  weeklyDiscount: number;
  user: User;
  /** @format date-time */
  createdAt: string;
}

export interface Owner {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  whatsappId: string;
  passport?: Passport;
  address?: Address;
  agent?: User;
  isProfileComplete: boolean;
  company: Company;
  files?: FileHosted[];
}

export interface Compliance {
  type: EComplianceType;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  /**
   * Number of days before endDate when compliance enters warning phase
   * @example 15
   */
  warningDaysBeforeExpiry?: number;
  /** Status of compliance */
  status: EComplianceStatus;
  documents?: string[];
}

export interface Facility {
  id: string;
  name: string;
  createdBy?: User;
  /** @format date-time */
  createdAt: string;
}

export interface Property {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  images: HostedFile[];
  airbnbId?: string;
  bayutLink?: string;
  dubizzleLink?: string;
  propertyfinderLink?: string;
  title: string;
  buildingName: string;
  floor?: number;
  apartmentNumber?: number;
  address?: Address;
  propertyType: EPropertyType;
  bedrooms: number;
  propertySize?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  amenities?: EAmenityType[];
  yearBuilt?: number;
  minNights?: number;
  maxNights?: number;
  heatingType?: string;
  balconySize?: number;
  tenantType?: ETenantType;
  notes: Note[];
  targets: PropertyTarget[];
  deposit?: number;
  capacity?: number;
  priceForExtraPerson?: number;
  isProfileComplete: boolean;
  inputDescription?: string;
  checkInTimeWindow?: string;
  checkOutTime?: string;
  cleaningFee?: number;
  owner?: Owner;
  agent?: User;
  description?: string;
  /** Vector embedding for AI-powered search */
  embedding?: string[];
  compliances?: Compliance[];
  company: Company;
  files?: FileHosted[];
  facilities: Facility[];
  isYearly: boolean;
  yearlyPrice?: number;
  isFurnished?: boolean;
  isActive: boolean;
  priceYearly?: number;
  compliancesStatus?:
    | "passed"
    | "warning"
    | "expired"
    | "issues_found"
    | "not_assigned";
}

export interface Enquiry {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  enquiryDescription: string;
  status?: EEnquiryStatus;
  /** @format date-time */
  vacantFrom: string;
  /** @format date-time */
  vacantTo: string;
  user?: User;
  tenant: Tenant;
  payOption: EPayOption;
  rate: number;
  charge: number;
  hoursPerWeek: number;
  vat?: number;
}

export interface BookingStatus {
  value: EBookingStatus;
  /** @format date-time */
  createdDate: string;
  note?: string;
  agent?: User;
}

export interface Payment {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  bookingId: string;
  type: EPaymentType;
  method: EPaymentMethod;
  status: EPaymentStatus;
  /** @format date-time */
  maximumDate: string;
  /** @format date-time */
  paymentDate?: string;
  data?: object;
  amount: number;
  description: string;
  collector: User;
  company: Company;
}

export interface Booking {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  enquiry?: Enquiry;
  property: Property;
  tenant: Tenant;
  from: string;
  to: string;
  statusList: BookingStatus[];
  lastStatus?: BookingStatus;
  totalAmount: number;
  deposit: number;
  appliedDiscount: number;
  notes: Note[];
  payments?: Payment[];
  parentBooking?: Booking;
  agent?: User;
  company: Company;
  files?: FileHosted[];
  isArchived: boolean;
  /** @format date-time */
  archivedAt?: string;
  archivedBy?: User;
}

export interface Availability {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  /** @format date-time */
  date: string;
  status: EAvailabilityStatus;
  rate: number;
  airbnbRate: number;
  property: Property;
  booking?: Booking;
}

export interface DeleteAvailabilityDto {
  from: string;
  to?: string;
  propertyId: string;
}

export interface CreateBookingDto {
  from: string;
  to: string;
  enquiryId?: string;
  propertyId: string;
  tenantId: string;
  parentBookingId?: string;
}

export interface DashboardDataResponseDto {
  /** Total bookings information */
  totalBookings: {
    value?: number;
    percentage?: number;
  };
  /** Number of pre-bookings */
  preBooking: number;
  /** Number of current bookings */
  currentBooking: number;
  /** Number of completed bookings */
  doneBooking: number;
}

export interface BookingFilterDto {
  date?: string;
  cities?: string[];
  tenantIds?: string[];
  propertyIds?: string[];
  agentsIds?: string[];
}

export interface BookingSortDto {
  sortDirection?: EOrderDirection;
  sortBy?: EBookingSortFields;
}

export interface FetchBookingsDto {
  pagination?: PaginationDto;
  filter?: BookingFilterDto;
  sort?: BookingSortDto;
  select?: EBookingSelectFields[];
}

export interface RenameFileDto {
  newFileName: string;
}

export interface ExtendBookingDto {
  from: string;
  to: string;
}

export interface ViewPropertyDto {
  note: string;
}

export interface TenantRejectedBookingDto {
  note: string;
}

export interface AgentDeclinedBookingDto {
  note: string;
}

export interface AwaitPaymentBookingDto {
  note: string;
  paymentMethod?: EPaymentMethod;
}

export interface BookedPropertyDto {
  note: string;
}

export interface ArchiveDto {
  archive: boolean;
}

export interface ConfirmBookingPaymentDto {
  paymentIds: string[];
  method: EPaymentMethod;
}

export interface PassportDto {
  passportNumber?: string;
  /** @format date-time */
  issueDate?: string;
  /** @format date-time */
  expiryDate?: string;
  nationality?: string;
  /** @format date-time */
  dateOfBirth?: string;
  placeOfBirth?: string;
}

export interface BankDto {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  branchCode?: string;
}

export interface CreateTenantDto {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  address?: AddressDto;
  passport?: PassportDto;
  agentId?: string;
  bank?: BankDto;
}

export interface TenantFilterDto {
  cities?: string[];
  name?: string;
}

export interface TenantsSortDto {
  sortDirection?: EOrderDirection;
  sortBy?: ETenantSortFields;
}

export interface FetchTenantsDto {
  pagination?: PaginationDto;
  filter?: TenantFilterDto;
  sort?: TenantsSortDto;
  select?: ETenantSelectFields[];
}

export interface UpdateTenantDto {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: AddressDto;
  passport?: PassportDto;
  agentId?: string;
  bank?: BankDto;
}

export interface Notification {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  type: ENotificationType;
  module: ESocketRefreshModule;
  moduleId: string;
  /** @format date-time */
  createdDate: string;
  /** @format date-time */
  viewedDate?: string;
  /** @format date-time */
  deletedDate?: string;
  company: Company;
}

export interface HideNotificationDto {
  ids: string[];
}

export interface AddTargetDto {
  fromMonthNumber: number;
  fromYearNumber: number;
  toMonthNumber?: number;
  toYearNumber?: number;
  propertyId: string;
  value: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
}

export interface Target {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  monthNumber: number;
  yearNumber: number;
  value: number;
  monthlyDiscount?: number;
  weeklyDiscount?: number;
  priceNegotiationLeewayPercentage?: number;
  property: Property;
}

export interface UpdateTargetDto {
  fromMonthNumber?: number;
  fromYearNumber?: number;
  toMonthNumber?: number;
  toYearNumber?: number;
  value?: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
}

export interface FacilityDto {
  name: string;
}

export interface CreatePropertyDto {
  ownerId?: string;
  agentId: string;
  title: string;
  buildingName: string;
  floor?: number;
  apartmentNumber?: number;
  description?: string;
  propertyType: EPropertyType;
  /** Number of bedrooms */
  bedrooms: number;
  propertySize?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  capacity?: number;
  minNights?: number;
  maxNights?: number;
  priceForExtraPerson?: number;
  inputDescription?: string;
  /** List of amenities */
  amenities?: string[];
  yearBuilt?: number;
  heatingType?: string;
  /** Size of the balcony in square meters */
  balconySize?: number;
  tenantType?: ETenantType;
  deposit?: number;
  maxTenants?: number;
  address?: AddressDto;
  facility?: FacilityDto;
  checkInTimeWindow?: string;
  checkOutTime?: string;
  cleaningFee?: number;
  isYearly: boolean;
  priceYearly?: number;
  isFurnished?: boolean;
  isActive: boolean;
  airbnbId?: string;
  bayutLink?: string;
  dubizzleLink?: string;
  propertyfinderLink?: string;
}

export interface PropertyFilterDto {
  cities?: string[];
  streets?: string[];
  title?: string;
  floor?: number;
  minFloor?: number;
  maxFloor?: number;
  propertyType?: (
    | "APARTMENT"
    | "HOUSE"
    | "STUDIO"
    | "VILLA"
    | "PENTHOUSE"
    | "TOWNHOUSE"
  )[];
  propertySize?: number;
  minPropertySize?: number;
  maxPropertySize?: number;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: (
    | "Air Conditioning"
    | "Pets Allowed"
    | "Balcony"
    | "Cable TV"
    | "Internet"
    | "Parking"
    | "Swimming Pool"
    | "Gym"
    | "Garden"
    | "Security"
    | "Maid Service"
    | "Laundry"
  )[];
  heatingType?: string[];
  ownerIds?: string[];
  tenantType?: (
    | "FAMILY"
    | "BACHELORS"
    | "MIXED"
    | "PROFESSIONALS"
    | "STUDENTS"
  )[];
  compliancesStatus?: (
    | "passed"
    | "warning"
    | "expired"
    | "issues_found"
    | "not_assigned"
  )[];
}

export interface PropertySortDto {
  sortDirection?: EOrderDirection;
  sortBy?: EPropertySortFields;
}

export interface FetchPropertiesDto {
  pagination?: PaginationDto;
  filter?: PropertyFilterDto;
  sort?: PropertySortDto;
  select?: EPropertySelectFields[];
}

export interface UpdatePropertyDto {
  ownerId?: string;
  agentId?: string;
  title?: string;
  buildingName?: string;
  floor?: number;
  apartmentNumber?: number;
  description?: string;
  propertyType?: EPropertyType;
  /** Number of bedrooms */
  bedrooms?: number;
  propertySize?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  capacity?: number;
  minNights?: number;
  maxNights?: number;
  priceForExtraPerson?: number;
  inputDescription?: string;
  /** List of amenities */
  amenities?: string[];
  yearBuilt?: number;
  heatingType?: string;
  /** Size of the balcony in square meters */
  balconySize?: number;
  tenantType?: ETenantType;
  deposit?: number;
  maxTenants?: number;
  address?: AddressDto;
  facility?: FacilityDto;
  checkInTimeWindow?: string;
  checkOutTime?: string;
  cleaningFee?: number;
  isYearly?: boolean;
  priceYearly?: number;
  isFurnished?: boolean;
  isActive?: boolean;
  airbnbId?: string;
  bayutLink?: string;
  dubizzleLink?: string;
  propertyfinderLink?: string;
}

export interface CreateNotePropertyDto {
  text: string;
  title: string;
}

export interface DeleteImageDto {
  imageFileKey: string;
}

export interface UpdateImagesOrderDto {
  images: HostedFile[];
}

export interface ComplianceDto {
  type: EComplianceType;
  /** Status of compliance */
  status: EComplianceStatus;
  /** Start date of the compliance validity */
  startDate: string;
  /**
   * Number of days before endDate when compliance enters warning phase
   * @example 15
   */
  warningDaysBeforeExpiry: number;
  /** End date of the compliance validity */
  endDate: string;
}

export interface CreateOwnerDto {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  address?: AddressDto;
  passport?: PassportDto;
  agentId?: string;
  bank?: BankDto;
}

export interface OwnerFilterDto {
  cities?: string[];
  name?: string;
}

export interface OwnersSortDto {
  sortDirection?: EOrderDirection;
  sortBy?: EOwnerSortFields;
}

export interface FetchOwnersDto {
  pagination?: PaginationDto;
  filter?: OwnerFilterDto;
  sort?: OwnersSortDto;
  select?: EOwnerSelectFields[];
}

export interface UpdateOwnerDto {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: AddressDto;
  passport?: PassportDto;
  agentId?: string;
  bank?: BankDto;
}

export interface CreateEnquiryDto {
  enquiryDescription: string;
  status: EEnquiryStatus;
  /** @format date-time */
  vacantFrom: string;
  /** @format date-time */
  vacantTo: string;
  userId?: string;
  tenantId: string;
  payOption: EPayOption;
  rate: number;
  charge: number;
  hoursPerWeek: number;
  vat: number;
}

export interface UpdateEnquiryDto {
  enquiryDescription?: string;
  status?: EEnquiryStatus;
  /** @format date-time */
  vacantFrom?: string;
  /** @format date-time */
  vacantTo?: string;
  userId?: string;
  tenantId?: string;
  payOption?: EPayOption;
  rate?: number;
  charge?: number;
  hoursPerWeek?: number;
  vat?: number;
}

export interface SocketMessageEvent {
  tenant: Tenant;
  agent?: User;
  isReply: boolean;
  type: EChatMessageType;
  isRecommended: boolean;
  message?: string;
  file?: HostedFile;
  files?: HostedFile[];
}

export interface SocketEmailEvent {
  userId: string;
  from: string;
  subject: string;
  messageId: string;
}

export interface SampleDto {
  websocketType: EWebsocketType;
  socketMessageEvent: SocketMessageEvent;
  socketEmailEvent: SocketEmailEvent;
  socketRefreshModule: ESocketRefreshModule;
}

export interface HistoryLog {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  /** @format date-time */
  actionDate: string;
  doneBy: User;
  entityName: string;
  entityId: string;
  actionType: string;
  data: object;
  highlights: string[];
}

export interface CreateCampaignDto {
  name: string;
  channel: EChannel;
  frequency?: EFrequency;
  /** @format date-time */
  startDate: string;
  runningTime: string;
  campaignTemplateId: string;
}

export interface CampaignTemplate {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  name: string;
  message: string;
}

export interface Campaign {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  name: string;
  channel: EChannel;
  frequency?: EFrequency;
  /** @format date-time */
  startDate: string;
  runningTime: string;
  isActive: boolean;
  user: User;
  template: CampaignTemplate;
}

export interface UpdateCampaignDto {
  name?: string;
  channel?: EChannel;
  frequency?: EFrequency;
  /** @format date-time */
  startDate?: string;
  runningTime?: string;
  campaignTemplateId?: string;
  isActive?: boolean;
}

export interface CreateCampaignTemplateDto {
  name: string;
  message: string;
}

export interface UpdateCampaignTemplateDto {
  name?: string;
  message?: string;
}

export interface HistoricalDataDto {
  /** Week identifier */
  title: string;
  /** Count value for this week */
  value: number;
}

export interface WeeklyStatDto {
  /** Current week count */
  value: number;
  /** Percentage change from last week (positive or negative) */
  percentage: number;
  /** Historical data for the last 4 weeks */
  data: HistoricalDataDto[];
}

export interface StatsResponseDto {
  bookings: WeeklyStatDto;
  tenants: WeeklyStatDto;
  owners: WeeklyStatDto;
  properties: WeeklyStatDto;
}

export interface AiSearchPropertiesDto {
  query?: string;
  bayutLink?: string;
  dubizzleLink?: string;
  propertyfinderLink?: string;
  checkIn: string;
  checkOut: string;
}

export interface MetadataIntents {
  /** The intent type */
  intent: "SEND_PROPERTY_IMAGES" | "SEND_PROPERTY_PAYMENT_LINK" | "EMPTY";
  /** The ID of the property */
  propertyId?: string;
  /** Flag to show more details */
  showMore?: boolean;
  /** The ID of the payment */
  paymentId?: string;
}

export interface AiResponseDto {
  /** The ID of the tenant */
  tenantId: string;
  /** The ID of the company */
  companyId: string;
  /** The text message content */
  text: string;
  /** Metadata containing intents and additional data */
  metadata: MetadataIntents;
}

export interface UpdateTenantDataDto {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: AddressDto;
  passport?: PassportDto;
  agentId?: string;
  bank?: BankDto;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: ETaskStatus;
  priority?: ETaskPriority;
  /** @format date-time */
  dueDate?: string;
  company: string;
  agent: string;
  assignedTo?: string;
  owner?: string;
  tenant?: string;
  booking?: string;
  notes?: string[];
  tags?: string[];
}

export interface TaskHistory {
  field: string;
  oldValue?: string;
  newValue?: string;
  changedBy: User;
  /** @format date-time */
  changedAt: string;
}

export interface Task {
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  actionByUserId?: string;
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  /** @format date-time */
  dueDate?: string;
  /** @format date-time */
  completedAt?: string;
  isArchived?: boolean;
  tags?: string[];
  owner?: Owner;
  tenant?: Tenant;
  booking?: Booking;
  company: Company;
  agent: User;
  assignedTo?: User;
  notes?: Note[];
  history?: TaskHistory[];
}

export interface TaskFilterDto {
  title?: string;
  status?: "todo" | "in_progress" | "done" | "blocked";
  priority?: "low" | "medium" | "high" | "urgent";
  agentId?: string;
  assignedToId?: string;
  ownerId?: string;
  tenantId?: string;
  bookingId?: string;
  tags?: string[];
  isArchived?: boolean;
}

export interface TaskSortDto {
  sortDirection?: EOrderDirection;
  sortBy?: ETaskSortFields;
}

export interface FetchTasksDto {
  pagination?: PaginationDto;
  filter?: TaskFilterDto;
  sort?: TaskSortDto;
  select?: ETaskSelectFields[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: ETaskStatus;
  priority?: ETaskPriority;
  /** @format date-time */
  dueDate?: string;
  company?: string;
  agent?: string;
  assignedTo?: string;
  owner?: string;
  tenant?: string;
  booking?: string;
  notes?: string[];
  tags?: string[];
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Casaikos API
 * @version 1.0
 * @contact
 *
 * API description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  scrapingSync = {
    /**
     * No description
     *
     * @tags ScrapingSync
     * @name ScrapingSyncControllerImportCompanyProperties
     * @request GET:/ScrapingSync/sync-company-properties/{companyId}
     * @secure
     */
    scrapingSyncControllerImportCompanyProperties: (
      companyId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ScrapingSync/sync-company-properties/${companyId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScrapingSync
     * @name ScrapingSyncControllerSyncPropertyByPropertyId
     * @request GET:/ScrapingSync/sync-property/{propertyId}
     * @secure
     */
    scrapingSyncControllerSyncPropertyByPropertyId: (
      propertyId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ScrapingSync/sync-property/${propertyId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ScrapingSync
     * @name ScrapingSyncControllerSyncAvailabilitiesByPropertyId
     * @request GET:/ScrapingSync/sync-availabilities/{propertyId}
     * @secure
     */
    scrapingSyncControllerSyncAvailabilitiesByPropertyId: (
      propertyId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ScrapingSync/sync-availabilities/${propertyId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  company = {
    /**
     * No description
     *
     * @tags Company
     * @name CompanyControllerCreate
     * @request POST:/company
     * @secure
     */
    companyControllerCreate: (
      data: CreateCompanyDto,
      params: RequestParams = {},
    ) =>
      this.request<any, Company>({
        path: `/company`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company
     * @name CompanyControllerFindAll
     * @request POST:/company/find-all
     * @secure
     */
    companyControllerFindAll: (
      data: FetchCompaniesDto,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Company[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/company/find-all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company
     * @name CompanyControllerFindById
     * @request GET:/company/{id}
     * @secure
     */
    companyControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<any, Company>({
        path: `/company/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company
     * @name CompanyControllerUpdate
     * @request PUT:/company/{id}
     * @secure
     */
    companyControllerUpdate: (
      id: string,
      data: CreateCompanyDto,
      params: RequestParams = {},
    ) =>
      this.request<any, Company>({
        path: `/company/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company
     * @name CompanyControllerDelete
     * @request DELETE:/company/{id}
     * @secure
     */
    companyControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/company/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  companyConfiguration = {
    /**
     * No description
     *
     * @tags Company Configuration
     * @name CompanyConfigurationControllerRefreshWhatsappTokenValidity
     * @request POST:/company-configuration/whatsapp-configurations/refresh-token-validity
     * @secure
     */
    companyConfigurationControllerRefreshWhatsappTokenValidity: (
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/company-configuration/whatsapp-configurations/refresh-token-validity`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company Configuration
     * @name CompanyConfigurationControllerUpdateWhatsappConfigurations
     * @request PUT:/company-configuration/whatsapp-configurations/update
     * @secure
     */
    companyConfigurationControllerUpdateWhatsappConfigurations: (
      data: UpdateWhatsappConfigDto,
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/company-configuration/whatsapp-configurations/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company Configuration
     * @name CompanyConfigurationControllerConnectToStripe
     * @request POST:/company-configuration/stripe-configuration/connect-stripe
     * @secure
     */
    companyConfigurationControllerConnectToStripe: (
      params: RequestParams = {},
    ) =>
      this.request<any, string>({
        path: `/company-configuration/stripe-configuration/connect-stripe`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company Configuration
     * @name CompanyConfigurationControllerDisconnectFromStripe
     * @request POST:/company-configuration/stripe-configuration/disconnect-stripe
     * @secure
     */
    companyConfigurationControllerDisconnectFromStripe: (
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/company-configuration/stripe-configuration/disconnect-stripe`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Company Configuration
     * @name CompanyConfigurationControllerRefreshStripeAccount
     * @request GET:/company-configuration/stripe-configuration/refresh-account
     * @secure
     */
    companyConfigurationControllerRefreshStripeAccount: (
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/company-configuration/stripe-configuration/refresh-account`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreateUser
     * @request POST:/users
     * @secure
     */
    usersControllerCreateUser: (
      data: CreateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<User, any>({
        path: `/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindAll
     * @request POST:/users/find-all
     * @secure
     */
    usersControllerFindAll: (data: FetchUsersDto, params: RequestParams = {}) =>
      this.request<
        {
          items: User[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/users/find-all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUser
     * @request GET:/users/{id}
     * @secure
     */
    usersControllerGetUser: (id: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @request PUT:/users/{id}
     * @secure
     */
    usersControllerUpdate: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<User, any>({
        path: `/users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerDeleteUser
     * @request DELETE:/users/{id}
     * @secure
     */
    usersControllerDeleteUser: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetAdminForCompany
     * @request GET:/users/admin/{companyId}
     * @secure
     */
    usersControllerGetAdminForCompany: (
      companyId: string,
      params: RequestParams = {},
    ) =>
      this.request<User, any>({
        path: `/users/admin/${companyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignIn
     * @request POST:/auth/signin
     */
    authControllerSignIn: (data: SignInDto, params: RequestParams = {}) =>
      this.request<SignInResponse, any>({
        path: `/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRequestOtp
     * @request POST:/auth/request-otp
     */
    authControllerRequestOtp: (
      data: {
        email?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/request-otp`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerVerifyOtp
     * @request POST:/auth/verify-otp
     */
    authControllerVerifyOtp: (data: VerifyOtpDto, params: RequestParams = {}) =>
      this.request<RefreshTokenResponse, any>({
        path: `/auth/verify-otp`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefreshToken
     * @request POST:/auth/refresh
     */
    authControllerRefreshToken: (params: RequestParams = {}) =>
      this.request<RefreshTokenResponse, any>({
        path: `/auth/refresh`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerVerifyToken
     * @request GET:/auth/verify-token
     * @secure
     */
    authControllerVerifyToken: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/auth/verify-token`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @request POST:/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerForgetPassword
     * @request POST:/auth/forget-password
     */
    authControllerForgetPassword: (
      data: ForgetPasswordDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/forget-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerResetPassword
     * @request POST:/auth/reset-password
     */
    authControllerResetPassword: (
      query: {
        token: string;
      },
      data: ResetPasswordDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/reset-password`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  whatsapp = {
    /**
     * No description
     *
     * @tags Whatsapp
     * @name WhatsappControllerSendMessage
     * @request POST:/whatsapp/send-message
     * @secure
     */
    whatsappControllerSendMessage: (
      data: SendMessageDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/whatsapp/send-message`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Whatsapp
     * @name WhatsappControllerWebhookVerifyToken
     * @request GET:/whatsapp/webhook
     * @secure
     */
    whatsappControllerWebhookVerifyToken: (
      query: {
        "hub.mode": string;
        "hub.challenge": string;
        "hub.verify_token": string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/whatsapp/webhook`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Whatsapp
     * @name WhatsappControllerReceiveMessage
     * @request POST:/whatsapp/webhook
     * @secure
     */
    whatsappControllerReceiveMessage: (
      data: WebhookReceivedBody,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/whatsapp/webhook`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Whatsapp
     * @name WhatsappControllerFetchTenantChats
     * @request GET:/whatsapp/chats/{tenantId}
     * @secure
     */
    whatsappControllerFetchTenantChats: (
      tenantId: string,
      params: RequestParams = {},
    ) =>
      this.request<WhatsappChat[], any>({
        path: `/whatsapp/chats/${tenantId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Whatsapp
     * @name WhatsappControllerFetchChatList
     * @request GET:/whatsapp/chat-list
     * @secure
     */
    whatsappControllerFetchChatList: (params: RequestParams = {}) =>
      this.request<ChatListItemDto[], any>({
        path: `/whatsapp/chat-list`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Whatsapp
     * @name WhatsappControllerMarkChatAsRead
     * @request POST:/whatsapp/read-chat
     * @secure
     */
    whatsappControllerMarkChatAsRead: (
      data: ReadChatDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/whatsapp/read-chat`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Whatsapp
     * @name WhatsappControllerUpdateConversationLead
     * @request POST:/whatsapp/update-conversation-lead
     * @secure
     */
    whatsappControllerUpdateConversationLead: (
      data: UpdateConversationLeadDto,
      params: RequestParams = {},
    ) =>
      this.request<WhatsappChat, any>({
        path: `/whatsapp/update-conversation-lead`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @tags Files
     * @name FilesControllerDownloadFile
     * @request GET:/files/{fileKey}
     */
    filesControllerDownloadFile: (
      fileKey: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/files/${fileKey}`,
        method: "GET",
        ...params,
      }),
  };
  availability = {
    /**
     * No description
     *
     * @tags Availability
     * @name AvailabilityControllerAddAvailability
     * @request POST:/availability
     * @secure
     */
    availabilityControllerAddAvailability: (
      data: AddAvailabilityDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/availability`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Availability
     * @name AvailabilityControllerFindAllByPropertyId
     * @request GET:/availability/properties/{propertyId}
     * @secure
     */
    availabilityControllerFindAllByPropertyId: (
      propertyId: string,
      params: RequestParams = {},
    ) =>
      this.request<Availability[], any>({
        path: `/availability/properties/${propertyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Availability
     * @name AvailabilityControllerSearch
     * @request GET:/availability/search
     * @secure
     */
    availabilityControllerSearch: (
      query?: {
        propertyId?: string;
        fromDate?: string;
        toDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Availability[], any>({
        path: `/availability/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Availability
     * @name AvailabilityControllerGetAvailability
     * @request GET:/availability/{id}
     * @secure
     */
    availabilityControllerGetAvailability: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<Availability, any>({
        path: `/availability/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Availability
     * @name AvailabilityControllerDeleteById
     * @request DELETE:/availability/{id}
     * @secure
     */
    availabilityControllerDeleteById: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<Availability, any>({
        path: `/availability/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Availability
     * @name AvailabilityControllerDeleteAvailabilityByRangeDate
     * @request DELETE:/availability/by-range/date
     * @secure
     */
    availabilityControllerDeleteAvailabilityByRangeDate: (
      data: DeleteAvailabilityDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/availability/by-range/date`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  bookings = {
    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerCreate
     * @request POST:/bookings
     * @secure
     */
    bookingsControllerCreate: (
      data: CreateBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/bookings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerGetLastActiveBookingOfTenant
     * @request GET:/bookings/tenant/{tenantId}/last-active-booking
     * @secure
     */
    bookingsControllerGetLastActiveBookingOfTenant: (
      tenantId: string,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/bookings/tenant/${tenantId}/last-active-booking`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerGetDashboardData
     * @request GET:/bookings/dashboard-data
     * @secure
     */
    bookingsControllerGetDashboardData: (params: RequestParams = {}) =>
      this.request<DashboardDataResponseDto, any>({
        path: `/bookings/dashboard-data`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerFindAll
     * @request POST:/bookings/find-all
     * @secure
     */
    bookingsControllerFindAll: (
      data: FetchBookingsDto,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Booking[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/bookings/find-all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerGetBookingById
     * @request GET:/bookings/{id}
     * @secure
     */
    bookingsControllerGetBookingById: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/bookings/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerDeleteBooking
     * @request DELETE:/bookings/{id}
     * @secure
     */
    bookingsControllerDeleteBooking: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bookings/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerUploadBookingFiles
     * @request POST:/bookings/upload-multiple/{bookingId}
     * @secure
     */
    bookingsControllerUploadBookingFiles: (
      bookingId: string,
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/bookings/upload-multiple/${bookingId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerRenameBookingFile
     * @request PATCH:/bookings/file-rename/{fileKey}/{bookingId}
     * @secure
     */
    bookingsControllerRenameBookingFile: (
      fileKey: string,
      bookingId: string,
      data: RenameFileDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/bookings/file-rename/${fileKey}/${bookingId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerDeleteBookingFile
     * @request DELETE:/bookings/file-delete/{fileKey}/{bookingId}
     * @secure
     */
    bookingsControllerDeleteBookingFile: (
      fileKey: string,
      bookingId: string,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/bookings/file-delete/${fileKey}/${bookingId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerExtendBooking
     * @request POST:/bookings/extend/{parentBookingId}
     * @secure
     */
    bookingsControllerExtendBooking: (
      parentBookingId: string,
      data: ExtendBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/bookings/extend/${parentBookingId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerGenerateInvoicePdf
     * @request GET:/bookings/invoice/{bookingId}
     * @secure
     */
    bookingsControllerGenerateInvoicePdf: (
      bookingId: string,
      params: RequestParams = {},
    ) =>
      this.request<File, any>({
        path: `/bookings/invoice/${bookingId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  bookingStatus = {
    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerViewProperty
     * @request PATCH:/booking-status/{id}/view-property
     * @secure
     */
    bookingStatusControllerViewProperty: (
      id: string,
      data: ViewPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/view-property`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerTenantRejectBooking
     * @request PATCH:/booking-status/{id}/tenant-reject
     * @secure
     */
    bookingStatusControllerTenantRejectBooking: (
      id: string,
      data: TenantRejectedBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/tenant-reject`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerAgentDeclinedBooking
     * @request PATCH:/booking-status/{id}/agent-decline
     * @secure
     */
    bookingStatusControllerAgentDeclinedBooking: (
      id: string,
      data: AgentDeclinedBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/agent-decline`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerAwaitPayment
     * @request PATCH:/booking-status/{id}/pending-booking
     * @secure
     */
    bookingStatusControllerAwaitPayment: (
      id: string,
      data: AwaitPaymentBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/pending-booking`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerBookProperty
     * @request PATCH:/booking-status/{id}/book
     * @secure
     */
    bookingStatusControllerBookProperty: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/book`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerTenantCancelBooking
     * @request PATCH:/booking-status/{id}/tenant-cancel
     * @secure
     */
    bookingStatusControllerTenantCancelBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/tenant-cancel`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerAgentCancelBooking
     * @request PATCH:/booking-status/{id}/agent-cancel
     * @secure
     */
    bookingStatusControllerAgentCancelBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/agent-cancel`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerCheckInBooking
     * @request PATCH:/booking-status/{id}/check-in
     * @secure
     */
    bookingStatusControllerCheckInBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/check-in`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerAgentStopBooking
     * @request PATCH:/booking-status/{id}/agent-stop
     * @secure
     */
    bookingStatusControllerAgentStopBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/agent-stop`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerTenantStopBooking
     * @request PATCH:/booking-status/{id}/tenant-stop
     * @secure
     */
    bookingStatusControllerTenantStopBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/tenant-stop`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerCheckOutBooking
     * @request PATCH:/booking-status/{id}/check-out
     * @secure
     */
    bookingStatusControllerCheckOutBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/check-out`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerRefundBooking
     * @request PATCH:/booking-status/{id}/refund
     * @secure
     */
    bookingStatusControllerRefundBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/refund`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerCompleteBooking
     * @request PATCH:/booking-status/{id}/complete
     * @secure
     */
    bookingStatusControllerCompleteBooking: (
      id: string,
      data: BookedPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/complete`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Status
     * @name BookingStatusControllerArchiveBooking
     * @request PATCH:/booking-status/{id}/archive-booking
     * @secure
     */
    bookingStatusControllerArchiveBooking: (
      id: string,
      data: ArchiveDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-status/${id}/archive-booking`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  bookingPayment = {
    /**
     * No description
     *
     * @tags Booking Payment
     * @name BookingPaymentsControllerPaymentSuccess
     * @request GET:/booking-payment/success
     * @secure
     */
    bookingPaymentsControllerPaymentSuccess: (
      query: {
        session_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/booking-payment/success`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Payment
     * @name BookingPaymentsControllerGenerateStripePaymentLinkForBookingPayments
     * @request GET:/booking-payment/{id}/generate-link
     * @secure
     */
    bookingPaymentsControllerGenerateStripePaymentLinkForBookingPayments: (
      id: string,
      query: {
        paymentIds: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/booking-payment/${id}/generate-link`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Booking Payment
     * @name BookingPaymentsControllerConfirmBookingPayments
     * @request POST:/booking-payment/{id}/confirm-payment
     * @secure
     */
    bookingPaymentsControllerConfirmBookingPayments: (
      id: string,
      data: ConfirmBookingPaymentDto,
      params: RequestParams = {},
    ) =>
      this.request<Booking, any>({
        path: `/booking-payment/${id}/confirm-payment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  tenants = {
    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerCreate
     * @request POST:/tenants
     * @secure
     */
    tenantsControllerCreate: (
      data: CreateTenantDto,
      params: RequestParams = {},
    ) =>
      this.request<Tenant, any>({
        path: `/tenants`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerFindAll
     * @request GET:/tenants
     * @secure
     */
    tenantsControllerFindAll: (
      data: FetchTenantsDto,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Tenant[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/tenants`,
        method: "GET",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerGetTenantPayments
     * @request GET:/tenants/payments/{id}
     * @secure
     */
    tenantsControllerGetTenantPayments: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<Payment[], any>({
        path: `/tenants/payments/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerFindById
     * @request GET:/tenants/{id}
     * @secure
     */
    tenantsControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<Tenant, any>({
        path: `/tenants/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerUpdate
     * @request PUT:/tenants/{id}
     * @secure
     */
    tenantsControllerUpdate: (
      id: string,
      data: UpdateTenantDto,
      params: RequestParams = {},
    ) =>
      this.request<Tenant, any>({
        path: `/tenants/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerDelete
     * @request DELETE:/tenants/{id}
     * @secure
     */
    tenantsControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Tenant, any>({
        path: `/tenants/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerUploadTenantFiles
     * @request POST:/tenants/upload-multiple/{tenantId}
     * @secure
     */
    tenantsControllerUploadTenantFiles: (
      tenantId: string,
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Tenant, any>({
        path: `/tenants/upload-multiple/${tenantId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerRenameTenantFile
     * @request PATCH:/tenants/file-rename/{fileKey}/{tenantId}
     * @secure
     */
    tenantsControllerRenameTenantFile: (
      fileKey: string,
      tenantId: string,
      data: RenameFileDto,
      params: RequestParams = {},
    ) =>
      this.request<Tenant, any>({
        path: `/tenants/file-rename/${fileKey}/${tenantId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tenants
     * @name TenantsControllerDeleteTenantFile
     * @request DELETE:/tenants/file-delete/{fileKey}/{tenantId}
     * @secure
     */
    tenantsControllerDeleteTenantFile: (
      fileKey: string,
      tenantId: string,
      params: RequestParams = {},
    ) =>
      this.request<Tenant, any>({
        path: `/tenants/file-delete/${fileKey}/${tenantId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  notifications = {
    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerFindOne
     * @request GET:/notifications/{id}
     * @secure
     */
    notificationsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<any, Notification>({
        path: `/notifications/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerDelete
     * @request DELETE:/notifications/{id}
     * @secure
     */
    notificationsControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notifications/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerFindAll
     * @request GET:/notifications
     * @secure
     */
    notificationsControllerFindAll: (
      query?: {
        page?: number;
        pageSize?: number;
        bypassPagination?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Notification[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/notifications`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerHideNotifications
     * @request PUT:/notifications/hide-notification
     * @secure
     */
    notificationsControllerHideNotifications: (
      data: HideNotificationDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/notifications/hide-notification`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsControllerViewNotification
     * @request PUT:/notifications/{id}/view
     * @secure
     */
    notificationsControllerViewNotification: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/notifications/${id}/view`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  target = {
    /**
     * No description
     *
     * @tags Target
     * @name TargetControllerAddTarget
     * @request POST:/target
     * @secure
     */
    targetControllerAddTarget: (
      data: AddTargetDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/target`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Target
     * @name TargetControllerFindAllByPropertyId
     * @request GET:/target/properties/{propertyId}
     * @secure
     */
    targetControllerFindAllByPropertyId: (
      propertyId: string,
      params: RequestParams = {},
    ) =>
      this.request<Target[], any>({
        path: `/target/properties/${propertyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Target
     * @name TargetControllerGetTarget
     * @request GET:/target/{id}
     * @secure
     */
    targetControllerGetTarget: (id: string, params: RequestParams = {}) =>
      this.request<Target, any>({
        path: `/target/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Target
     * @name TargetControllerUpdateById
     * @request PUT:/target/{id}
     * @secure
     */
    targetControllerUpdateById: (
      id: string,
      data: UpdateTargetDto,
      params: RequestParams = {},
    ) =>
      this.request<Target, any>({
        path: `/target/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Target
     * @name TargetControllerDeleteById
     * @request DELETE:/target/{id}
     * @secure
     */
    targetControllerDeleteById: (id: string, params: RequestParams = {}) =>
      this.request<Target, any>({
        path: `/target/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  properties = {
    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerCreateProperty
     * @request POST:/properties
     * @secure
     */
    propertiesControllerCreateProperty: (
      data: CreatePropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerFindAll
     * @request POST:/properties/find-all
     * @secure
     */
    propertiesControllerFindAll: (
      data: FetchPropertiesDto,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Property[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/properties/find-all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerUpdate
     * @request PUT:/properties/{id}
     * @secure
     */
    propertiesControllerUpdate: (
      id: string,
      data: UpdatePropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerGetProperty
     * @request GET:/properties/{id}
     * @secure
     */
    propertiesControllerGetProperty: (id: string, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/properties/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerDeleteProperty
     * @request DELETE:/properties/{id}
     * @secure
     */
    propertiesControllerDeleteProperty: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/properties/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerCreateNoteProperty
     * @request POST:/properties/{id}/note
     * @secure
     */
    propertiesControllerCreateNoteProperty: (
      id: string,
      data: CreateNotePropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties/${id}/note`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerDeleteNoteProperty
     * @request DELETE:/properties/{idProperty}/note/{idNote}
     * @secure
     */
    propertiesControllerDeleteNoteProperty: (
      idProperty: string,
      idNote: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/properties/${idProperty}/note/${idNote}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerAddImages
     * @request POST:/properties/{id}/images
     * @secure
     */
    propertiesControllerAddImages: (id: string, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/properties/${id}/images`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerDeletePropertyImage
     * @request DELETE:/properties/{id}/images/delete
     * @secure
     */
    propertiesControllerDeletePropertyImage: (
      id: string,
      data: DeleteImageDto,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties/${id}/images/delete`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerUploadPropertyFiles
     * @request POST:/properties/upload-multiple/{propertyId}
     * @secure
     */
    propertiesControllerUploadPropertyFiles: (
      propertyId: string,
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties/upload-multiple/${propertyId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerRenamePropertyFile
     * @request PATCH:/properties/file-rename/{fileKey}/{propertyId}
     * @secure
     */
    propertiesControllerRenamePropertyFile: (
      fileKey: string,
      propertyId: string,
      data: RenameFileDto,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties/file-rename/${fileKey}/${propertyId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerDeletePropertyFile
     * @request DELETE:/properties/file-delete/{fileKey}/{propertyId}
     * @secure
     */
    propertiesControllerDeletePropertyFile: (
      fileKey: string,
      propertyId: string,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties/file-delete/${fileKey}/${propertyId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerUpdateImagesOrder
     * @request PUT:/properties/update-main-image/{propertyId}
     * @secure
     */
    propertiesControllerUpdateImagesOrder: (
      propertyId: string,
      data: UpdateImagesOrderDto,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/properties/update-main-image/${propertyId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Properties
     * @name PropertiesControllerDeleteFacility
     * @request DELETE:/properties/{propertyId}/facility/{facilityId}
     * @secure
     */
    propertiesControllerDeleteFacility: (
      propertyId: string,
      facilityId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/properties/${propertyId}/facility/${facilityId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  propertyCompliances = {
    /**
     * No description
     *
     * @tags Property Compliance
     * @name ComplianceControllerAddOrUpdate
     * @request POST:/property-compliances/{propertyId}
     * @secure
     */
    complianceControllerAddOrUpdate: (
      propertyId: string,
      data: ComplianceDto,
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/property-compliances/${propertyId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  owners = {
    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerCreate
     * @request POST:/owners
     * @secure
     */
    ownersControllerCreate: (
      data: CreateOwnerDto,
      params: RequestParams = {},
    ) =>
      this.request<Owner, any>({
        path: `/owners`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerFindAll
     * @request POST:/owners/find-all
     * @secure
     */
    ownersControllerFindAll: (
      data: FetchOwnersDto,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Owner[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/owners/find-all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerFindById
     * @request GET:/owners/{id}
     * @secure
     */
    ownersControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<Owner, any>({
        path: `/owners/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerUpdate
     * @request PUT:/owners/{id}
     * @secure
     */
    ownersControllerUpdate: (
      id: string,
      data: UpdateOwnerDto,
      params: RequestParams = {},
    ) =>
      this.request<Owner, any>({
        path: `/owners/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerDelete
     * @request DELETE:/owners/{id}
     * @secure
     */
    ownersControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Owner, any>({
        path: `/owners/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerUploadOwnerFiles
     * @request POST:/owners/upload-multiple/{ownerId}
     * @secure
     */
    ownersControllerUploadOwnerFiles: (
      ownerId: string,
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Owner, any>({
        path: `/owners/upload-multiple/${ownerId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerRenameOwnerFile
     * @request PATCH:/owners/file-rename/{fileKey}/{ownerId}
     * @secure
     */
    ownersControllerRenameOwnerFile: (
      fileKey: string,
      ownerId: string,
      data: RenameFileDto,
      params: RequestParams = {},
    ) =>
      this.request<Owner, any>({
        path: `/owners/file-rename/${fileKey}/${ownerId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Owners
     * @name OwnersControllerDeleteOwnerFile
     * @request DELETE:/owners/file-delete/{fileKey}/{ownerId}
     * @secure
     */
    ownersControllerDeleteOwnerFile: (
      fileKey: string,
      ownerId: string,
      params: RequestParams = {},
    ) =>
      this.request<Owner, any>({
        path: `/owners/file-delete/${fileKey}/${ownerId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  enquiries = {
    /**
     * No description
     *
     * @tags Enquiries
     * @name EnquiriesControllerCreateEnquiry
     * @request POST:/enquiries
     * @secure
     */
    enquiriesControllerCreateEnquiry: (
      data: CreateEnquiryDto,
      params: RequestParams = {},
    ) =>
      this.request<any, Enquiry>({
        path: `/enquiries`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enquiries
     * @name EnquiriesControllerFindAll
     * @request GET:/enquiries
     * @secure
     */
    enquiriesControllerFindAll: (
      query?: {
        page?: number;
        pageSize?: number;
        bypassPagination?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Enquiry[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/enquiries`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enquiries
     * @name EnquiriesControllerGetEnquiry
     * @request GET:/enquiries/{id}
     * @secure
     */
    enquiriesControllerGetEnquiry: (id: string, params: RequestParams = {}) =>
      this.request<any, Enquiry>({
        path: `/enquiries/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enquiries
     * @name EnquiriesControllerUpdateEnquiryStatus
     * @request PUT:/enquiries/{id}
     * @secure
     */
    enquiriesControllerUpdateEnquiryStatus: (
      id: string,
      data: UpdateEnquiryDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enquiries/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enquiries
     * @name EnquiriesControllerDeleteEnquiry
     * @request DELETE:/enquiries/{id}
     * @secure
     */
    enquiriesControllerDeleteEnquiry: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enquiries/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Enquiries
     * @name EnquiriesControllerUpdate
     * @request PUT:/enquiries/{id}/update
     * @secure
     */
    enquiriesControllerUpdate: (
      id: string,
      data: UpdateEnquiryDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enquiries/${id}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  payments = {
    /**
     * No description
     *
     * @tags Payments
     * @name PaymentsControllerGetPendingPayments
     * @request GET:/payments/pending
     * @secure
     */
    paymentsControllerGetPendingPayments: (
      query?: {
        page?: number;
        pageSize?: number;
        bypassPagination?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Payment[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/payments/pending`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  sample = {
    /**
     * No description
     *
     * @tags sample
     * @name SamplesControllerSample1
     * @request POST:/sample/sample1
     * @secure
     */
    samplesControllerSample1: (data: SampleDto, params: RequestParams = {}) =>
      this.request<any, SampleDto>({
        path: `/sample/sample1`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  historyLogs = {
    /**
     * No description
     *
     * @tags HistoryLogs
     * @name HistoryLogsControllerGetHistoryLog
     * @request GET:/historyLogs/{id}
     */
    historyLogsControllerGetHistoryLog: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<any, HistoryLog>({
        path: `/historyLogs/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HistoryLogs
     * @name HistoryLogsControllerDeleteHistoryLog
     * @request DELETE:/historyLogs/{id}
     */
    historyLogsControllerDeleteHistoryLog: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/historyLogs/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HistoryLogs
     * @name HistoryLogsControllerGetAllHistoryLogs
     * @request GET:/historyLogs
     */
    historyLogsControllerGetAllHistoryLogs: (
      query: {
        page?: number;
        pageSize?: number;
        bypassPagination?: boolean;
        doneBy?: string;
        entityName: EModuleNames;
        entityId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: HistoryLog[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/historyLogs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  campaigns = {
    /**
     * No description
     *
     * @tags Campaigns
     * @name CampaignsControllerCreate
     * @request POST:/campaigns
     * @secure
     */
    campaignsControllerCreate: (
      data: CreateCampaignDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/campaigns`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Campaigns
     * @name CampaignsControllerFindAll
     * @request GET:/campaigns
     * @secure
     */
    campaignsControllerFindAll: (
      query?: {
        page?: number;
        pageSize?: number;
        bypassPagination?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: Campaign[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/campaigns`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Campaigns
     * @name CampaignsControllerFindOne
     * @request GET:/campaigns/{id}
     * @secure
     */
    campaignsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<any, Campaign>({
        path: `/campaigns/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Campaigns
     * @name CampaignsControllerUpdate
     * @request PUT:/campaigns/{id}
     * @secure
     */
    campaignsControllerUpdate: (
      id: string,
      data: UpdateCampaignDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/campaigns/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Campaigns
     * @name CampaignsControllerDelete
     * @request DELETE:/campaigns/{id}
     * @secure
     */
    campaignsControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/campaigns/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  campaignTemplates = {
    /**
     * No description
     *
     * @tags CampaignTemplates
     * @name CampaignTemplatesControllerCreate
     * @request POST:/campaign-templates
     * @secure
     */
    campaignTemplatesControllerCreate: (
      data: CreateCampaignTemplateDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/campaign-templates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CampaignTemplates
     * @name CampaignTemplatesControllerFindAll
     * @request GET:/campaign-templates
     * @secure
     */
    campaignTemplatesControllerFindAll: (
      query?: {
        page?: number;
        pageSize?: number;
        bypassPagination?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items: CampaignTemplate[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/campaign-templates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CampaignTemplates
     * @name CampaignTemplatesControllerUpdate
     * @request PUT:/campaign-templates/{id}
     * @secure
     */
    campaignTemplatesControllerUpdate: (
      id: string,
      data: UpdateCampaignTemplateDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/campaign-templates/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CampaignTemplates
     * @name CampaignTemplatesControllerDelete
     * @request DELETE:/campaign-templates/{id}
     * @secure
     */
    campaignTemplatesControllerDelete: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/campaign-templates/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  stats = {
    /**
     * No description
     *
     * @tags Stats
     * @name StatsControllerGetCurrentWeekStats
     * @request GET:/stats/weekly
     * @secure
     */
    statsControllerGetCurrentWeekStats: (params: RequestParams = {}) =>
      this.request<StatsResponseDto, any>({
        path: `/stats/weekly`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  ai = {
    /**
     * No description
     *
     * @tags ai
     * @name AiControllerCreate
     * @request POST:/ai/{companyId}/booking/create
     */
    aiControllerCreate: (
      companyId: string,
      data: CreateBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ai/${companyId}/booking/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerView
     * @request POST:/ai/{companyId}/booking/{bookingId}/view
     */
    aiControllerView: (
      companyId: string,
      bookingId: string,
      data: ViewPropertyDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ai/${companyId}/booking/${bookingId}/view`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTenantReject
     * @request POST:/ai/{companyId}/booking/{bookingId}/tenant-reject
     */
    aiControllerTenantReject: (
      companyId: string,
      bookingId: string,
      data: TenantRejectedBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ai/${companyId}/booking/${bookingId}/tenant-reject`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTenantConfirm
     * @request POST:/ai/{companyId}/booking/{bookingId}/confirm
     */
    aiControllerTenantConfirm: (
      companyId: string,
      bookingId: string,
      data: AwaitPaymentBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ai/${companyId}/booking/${bookingId}/confirm`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerSearchProperties
     * @request POST:/ai/{companyId}/search/search-properties
     */
    aiControllerSearchProperties: (
      companyId: string,
      data: AiSearchPropertiesDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ai/${companyId}/search/search-properties`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerWhatsappResponseWebhook
     * @request POST:/ai/whatsapp-response-webhook
     */
    aiControllerWhatsappResponseWebhook: (
      data: AiResponseDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ai/whatsapp-response-webhook`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerUpdateTenantData
     * @request POST:/ai/update-tenant-data
     */
    aiControllerUpdateTenantData: (
      data: UpdateTenantDataDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ai/update-tenant-data`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerUpdateSummaryConversation
     * @request POST:/ai/update-summary-conversation
     */
    aiControllerUpdateSummaryConversation: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/ai/update-summary-conversation`,
        method: "POST",
        ...params,
      }),
  };
  tasks = {
    /**
     * No description
     *
     * @tags Tasks
     * @name TaskControllerCreate
     * @request POST:/tasks
     * @secure
     */
    taskControllerCreate: (data: CreateTaskDto, params: RequestParams = {}) =>
      this.request<Task, any>({
        path: `/tasks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TaskControllerFindAll
     * @request POST:/tasks/find-all
     * @secure
     */
    taskControllerFindAll: (data: FetchTasksDto, params: RequestParams = {}) =>
      this.request<
        {
          items: Task[];
          /** @example 1 */
          page: number;
          /** @example 10 */
          pagesCount: number;
          /** @example 100 */
          documentsCount: number;
        },
        any
      >({
        path: `/tasks/find-all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TaskControllerGetById
     * @request GET:/tasks/{id}
     * @secure
     */
    taskControllerGetById: (id: string, params: RequestParams = {}) =>
      this.request<Task, any>({
        path: `/tasks/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TaskControllerUpdate
     * @request PUT:/tasks/{id}
     * @secure
     */
    taskControllerUpdate: (
      id: string,
      data: UpdateTaskDto,
      params: RequestParams = {},
    ) =>
      this.request<Task, any>({
        path: `/tasks/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TaskControllerDelete
     * @request DELETE:/tasks/{id}
     * @secure
     */
    taskControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/tasks/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TaskControllerArchiveTask
     * @request PATCH:/tasks/{id}/archive-task
     * @secure
     */
    taskControllerArchiveTask: (
      id: string,
      data: ArchiveDto,
      params: RequestParams = {},
    ) =>
      this.request<Task, any>({
        path: `/tasks/${id}/archive-task`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
