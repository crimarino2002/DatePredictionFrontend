import { ApiResponse } from './ApiResponse';
import { Metadata } from './Metadata';

export interface PagedResponse<T> extends ApiResponse<T[]> {
    metadata: Metadata;
}