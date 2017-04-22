export interface RestEpicOptions {
  /**
   * Headers to include in each request.
   */
  headers?: { [key: string]: any };

  /**
   * Determines the credentials behavior.
   */
  credentials?: 'include' | 'same-origin' | 'omit';
}
