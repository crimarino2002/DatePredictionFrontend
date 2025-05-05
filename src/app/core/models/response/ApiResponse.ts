import { Metadata } from './Metadata';

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  metadata?: Metadata;
}
